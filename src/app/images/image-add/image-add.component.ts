import { Component, OnInit } from '@angular/core';
import { Image, ImagesService } from '../images.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'app-image-add',
    templateUrl: './image-add.component.html',
    styleUrls: ['./image-add.component.scss']
})
export class ImageAddComponent implements OnInit {
    images: Observable<Image[]>;
    private searchTerms = new Subject<string>();

    constructor(private imagesService: ImagesService) {
    }

    ngOnInit(): void {
        this.images = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.imagesService.search(term)
                // or the observable of empty heroes if there was no search term
                : Observable.of<Image[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Image[]>([]);
            });
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }
}

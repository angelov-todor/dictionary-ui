import { Component, OnDestroy, OnInit } from '@angular/core';
import { FoundImage, ImagesService } from '../images.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
// Observable class extensions
import 'rxjs/add/observable/from';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss']
})
export class ImageSearchComponent implements OnInit, OnDestroy {

  images: FoundImage[];
  private searchTerms = new Subject<string>();
  private imagesSubscription: Subscription;
  private selectedImage: FoundImage;

  constructor(private imagesService: ImagesService) {
  }

  select(image: FoundImage) {
    this.selectedImage = image;
  }

  ngOnInit(): void {
    this.imagesSubscription = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.imagesService.search(term)
        : Observable.of<FoundImage[]>([]))
      .catch((error, caught) => {
        console.log(error);
        return caught;
      })
      .subscribe(images => {
        this.images = images;
      });
  }

  ngOnDestroy(): void {
    this.imagesSubscription.unsubscribe();
    this.imagesSubscription = undefined;
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  save(): void {
    console.log(this.selectedImage);
    this.selectedImage = null;
  }
}

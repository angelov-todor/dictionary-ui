import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Image, ImageListResponse, ImagesService } from '../images.service';
import { PartialCollectionView } from '../../words/words.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit, OnDestroy {

  @Output() onImageClicked = new EventEmitter<Image>();
  images: Image[];

  collectionView: PartialCollectionView;
  private termFilter = new BehaviorSubject<string>('');
  private imagesSubscription: Subscription;

  constructor(private imageService: ImagesService) {
  }

  ngOnInit() {
    this.getImages();
    this.imagesSubscription = this.termFilter
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.imageService.filterByTerm(term)
        : this.imageService.getImagesList()
      ).subscribe(
        (imagesResponse: ImageListResponse) => {
          this.images = imagesResponse.images;
          this.collectionView = imagesResponse.view;
        }
      );
  }

  ngOnDestroy() {
    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
      this.imagesSubscription = undefined;
    }
  }

  onClick(image: Image) {
    this.onImageClicked.emit(image);
  }

  getImages(page?: number): void {
    this.imageService.getImagesList(page).subscribe(
      (imagesListResponse) => {
        this.images = imagesListResponse.images;
        this.collectionView = imagesListResponse.view;
      }
    );
  }

  setPage(page: number) {
    this.getImages(page);
  }

  filterByName(term: string): void {
    this.termFilter.next(term);
  }
}

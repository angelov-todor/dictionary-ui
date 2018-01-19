import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Image, ImagesService } from '../images.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {

  @Output() onImageClicked = new EventEmitter<Image>();
  images: Image[];

  constructor(private imageService: ImagesService, private router: Router) {
  }

  ngOnInit() {
    this.imageService.getImages().subscribe(
      (imagesResponse) => {
        this.images = imagesResponse.map(imageData => new Image(imageData));
      }
    );
  }

  onClick(image: Image) {
    this.onImageClicked.emit(image);
  }
}

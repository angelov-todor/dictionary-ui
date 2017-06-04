import { Component, OnInit } from '@angular/core';
import { Image, ImagesService } from '../images.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {

  images: Image[];

  constructor(private imageService: ImagesService) {
  }

  ngOnInit() {

    this.imageService.getImages().subscribe(
      (imagesResponse) => {
        this.images = imagesResponse;
      }
    );
  }
}

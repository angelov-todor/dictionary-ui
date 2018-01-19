import { Component, OnInit } from '@angular/core';
import { Image } from '../images.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-list-page',
  templateUrl: './image-list-page.component.html',
  styleUrls: ['./image-list-page.component.scss']
})
export class ImageListPageComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onImageClicked(image: Image) {
    this.router.navigate(['/images/view', image.id]);
  }

}

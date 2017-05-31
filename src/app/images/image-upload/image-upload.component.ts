import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../images.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  public selected: string;
  public isSelected = false;

  constructor(private imagesService: ImagesService, private router: Router) {
  }

  ngOnInit() {
  }

  upload(file?: File): void {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    const fileObservable = Observable.create((observer: any) => {
      reader.onload = function (e: any) {
        observer.next(e.target.result);
        observer.complete();
      };
    }).subscribe(
      (m) => {
        this.imagesService.upload({'filename': file.name, 'data': m})
          .subscribe(() => {
            console.log('sent');
          });
      },
      (e) => {
        console.log('error: ', e);
      }
    );

    reader.readAsDataURL(file);
  }

  changeSelected(file?: File): void {
    this.isSelected = true;
    if (!file) {
      this.isSelected = false;
      return;
    }
    this.selected = file.name;
  }
}

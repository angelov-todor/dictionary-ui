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
  public selectedFiles: string;
  public isSelectedSingle = false;
  public isSelectedMultiple = false;
  public targetResult = '';
  public serverError: any;

  constructor(private imagesService: ImagesService,
              private router: Router) {
  }

  ngOnInit() {
  }

  uploadBulk(files: FileList): void {
    if (!files) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      const reader = new FileReader();
      Observable.create((observer: any) => {
        reader.onload = function (e: any) {
          observer.next(e.target.result);
          observer.complete();
        };
      }).subscribe(
        (m) => {
          this.imagesService.upload({'filename': file.name, 'data': m})
            .subscribe(() => console.log(file.name));
        },
        (e) => {
          console.log('error: ', e);
          this.serverError = e;
        }
      );

      reader.readAsDataURL(file);
    }
  }

  upload(file?: File): void {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    Observable.create((observer: any) => {
      reader.onload = function (e: any) {
        observer.next(e.target.result);
        observer.complete();
      };
    }).subscribe(
      (m) => {
        this.imagesService.upload({'filename': file.name, 'data': m})
          .subscribe((image) => {
            this.router.navigate(['/images/view', image.id]);
          });
      },
      (e) => {
        console.log('error: ', e);
        this.serverError = e;
      }
    );

    reader.readAsDataURL(file);
  }

  changeSelected(file?: File): void {
    this.isSelectedSingle = true;
    if (!file) {
      this.isSelectedSingle = false;
      return;
    }
    this.isSelectedMultiple = false;
    this.selected = file.name;
    const reader = new FileReader();
    Observable.create((observer: any) => {
      reader.onload = function (e: any) {
        observer.next(e.target.result);
        observer.complete();
      };
    }).subscribe(
      (m) => {
        this.targetResult = m;
      },
      (e) => {
        console.log('error: ', e);
      }
    );

    reader.readAsDataURL(file);
  }

  changeSelectedFiles(files?: FileList): void {
    this.isSelectedMultiple = true;
    if (!files) {
      this.isSelectedMultiple = false;
      return;
    }
    this.isSelectedSingle = false;
    this.selected = '';
    this.targetResult = '';
    const length = files.length;
    this.selectedFiles = length + ' selected';
  }
}

import { Component } from '@angular/core';
import { Image, ImagesService, ImageTypes } from '../images.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/combineAll';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/zip';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  public selected = 0;
  public selectedName: string;
  public targetResult = '';
  public serverError: any;
  public uploaded = 0;
  public processing = false;

  constructor(private imagesService: ImagesService,
              private router: Router) {
  }

  upload(files: FileList): void {
    this.processing = true;
    const filesCount = files.length;
    if (filesCount <= 0) {
      this.processing = false;
      return;
    }
    if (!this.isValid(files)) {
      this.serverError = {
        status: 400
      };
      this.processing = false;
      return;
    }

    const filesUploads = Array.prototype.map
      .call(files, (f) => {
          return Observable.create((observer: any) => {
            const reader = new FileReader();
            reader.onload = function (e: any) {
              observer.next({ file: f, data: e.target.result });
              observer.complete();
            };
            reader.readAsDataURL(f);
          }).switchMap(({ file, data }) => {
            return this.imagesService.upload({ 'filename': file.name, 'data': data });
          }).do(() => {
            this.uploaded++;
          });
        }
      );

    Observable.forkJoin(filesUploads)
      .subscribe(
        (images: Image[]) => {
          this.processing = false;
          if (images.length === 1) {
            this.router.navigate(['/images/view', images[0].id]);
            return;
          }
          this.router.navigate(['/images/list']);
        }
      );
  }

  private isValid(files: FileList): boolean {
    const length = files.length;

    for (let i = 0; i < length; i++) {
      const file = files.item(i);
      const sFileName = file.name;

      if (sFileName) {
        let blnValid = false;
        for (let j = 0; j < ImageTypes.types.length; j++) {
          const sCurExtension = ImageTypes.types[j];
          if (sFileName.substr(
              sFileName.length - sCurExtension.length,
              sCurExtension.length
            ).toLowerCase() === sCurExtension.toLowerCase()) {
            blnValid = true;
            break;
          }
        }

        if (!blnValid) {
          this.serverError = {
            status: 400
          };
          return false;
        }
      }

    }
    return true;
  }

  changeSelected(files?: FileList) {
    this.selected = 0;
    this.selectedName = '';
    this.targetResult = '';
    this.serverError = null;
    const length = files.length;

    if (!this.isValid(files)) {
      this.serverError = {
        status: 400
      };
      return false;
    }

    if (!length) {
      return;
    }
    this.selected = length;
    if (length > 1) {
      return;
    }
    const fileToShow = files[0];
    this.selectedName = fileToShow.name;

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

    reader.readAsDataURL(fileToShow);
  }
}

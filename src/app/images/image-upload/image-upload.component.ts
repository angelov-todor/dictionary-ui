import { Component } from '@angular/core';
import { ImagesService, ImageTypes } from '../images.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

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

  constructor(private imagesService: ImagesService,
              private router: Router) {
  }

  upload(files: FileList): void {
    const filesCount = files.length;
    if (filesCount <= 0) {
      return;
    }
    if (!this.isValid(files)) {
      this.serverError = {
        status: 400
      };
      return;
    }
    for (let i = 0; i < filesCount; i++) {
      const file = files.item(i);
      const reader = new FileReader();
      Observable.create((observer: any) => {
        reader.onload = function (e: any) {
          observer.next(e.target.result);
          observer.complete();
        };
      }).switchMap((m) => {
        return this.imagesService.upload({'filename': file.name, 'data': m})
      }).subscribe(
        (image) => {
          if (filesCount === 1) {
            this.router.navigate(['/images/view', image.id]);
            return;
          }
          this.uploaded++;
          if (this.uploaded === filesCount) {
            this.router.navigate(['/images/list']);
          }
        },
        (e) => {
          this.serverError = e;
        }
      );

      reader.readAsDataURL(file);
    }
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

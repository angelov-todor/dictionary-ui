import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../images.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  observableBatch: any = [];

  constructor(private imagesService: ImagesService, private router: Router) {
  }

  ngOnInit() {
  }

  getBase64(file) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  upload(e: any): void {
    const imageFile = this.getBase64(e);
    console.log('Image file: ', imageFile);
    this.imagesService.upload(this.getBase64(e)).subscribe(
      image => {
        this.router.navigate(['/images']);
      }
    );
  }

  onChange(event) {
    const files = event.srcElement.files;
    this.imagesService.makeFileRequest([], files).subscribe(() => {
      console.log('sent');
    });
  }
  // example that should be working already
  onChange2($event: any) {
    console.log('No of files selected: ' + $event.target.files.length);
    // Make sure to clear the observableBatch array before restarting the whole process.
    this.observableBatch = [];

    const rawFiles = $event.target.files;
    for (let i = rawFiles.length - 1; i >= 0; i--) {
      this.setUpFile(rawFiles[i]);
    }
    Observable.forkJoin(this.observableBatch)
      .subscribe(
        (m) => {
          console.log(m);
        },
        (e) => {
          console.log(e);
        },
        () => {
          console.log('All file(s) loading completed!!!');
        }
      );
  }

  setUpFile(file) {
    const reader = new FileReader();

    const myobservable = Observable.create((observer: any) => {
      reader.onload = function (e: any) {
        console.log('result: ', e);
        const data = e.target;
        const imageSrc = data.result;
        console.log('File loaded succesfully.');
        console.log(imageSrc);
        observer.next(imageSrc);
        observer.complete();
      };
    });

    this.observableBatch.push(myobservable);
    reader.readAsDataURL(file);
  }
}

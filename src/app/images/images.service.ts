import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Injectable()
export class ImagesService {
  private imagesUrl = 'http://85.187.92.66:8080/images';  // URL to web api
  private headers = new Headers({
    'Content-Type': 'application/hal+json',
    'Accept': 'application/json'
  });
  progress;
  progressObserver;

  constructor(private http: AuthHttp) {

    this.progress = Observable.create(observer => {
      this.progressObserver = observer;
    }).share();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  search(term: string): Observable<Image[]> {
    return this.http
      .get(`${this.imagesUrl}-search?term=${term}`)
      .map(response => response.json().items as Image[]);
  }

  upload(req): Observable<Image> {
    console.log(req);
    return this.http
      .post(`${this.imagesUrl}-upload`, JSON.stringify(req))
      .map(response => response.json() as Image);
  }

  makeFileRequest(params: string[], files: File[]): Observable<any> {
    const url = `${this.imagesUrl}-upload`;

    return Observable.create(observer => {
      const formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append('uploads[]', files[i], files[i].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.upload.onprogress = (event) => {
        this.progress = Math.round(event.loaded / event.total * 100);

        this.progressObserver.next(this.progress);
      };

      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }
}

export interface Image {
  image: {
    thumbnailLink: string;
  };
  thumbnailLink: string;
}

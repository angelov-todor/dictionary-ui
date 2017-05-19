import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { environment } from '../../environments/environment';

@Injectable()
export class ImagesService {
  private imagesUrl = environment.baseAPIEndpoint + '/images';  // URL to web api
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/hal+json'
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
    return this.http
      .post(`${this.imagesUrl}-upload`, JSON.stringify(req))
      .map(response => response.json() as Image);
  }

  /**
   * Not used
   * @param params
   * @param files
   * @returns {any}
   */
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

  getImages(): Observable<Image[]> {
    return this.http
      .get(this.imagesUrl, {headers: this.headers})
      .map((res) => res.json())
      .map(imagesResponse => {
        imagesResponse = imagesResponse._embedded.item.map(
          imageData => new Image(imageData)
        );
        return imagesResponse;
      });
      // //  TODO: make an object
      // .map(response => response.json()._embedded.item as Image[])
  }
}

export class Image {
  public src: string;
  public image: {
    thumbnailLink: string;
  };

  get absoluteUrl(): string {
    return 'http://85.187.92.66:8080/' + this.src;
  }

  constructor(data?: Partial<Image>) {
    Object.assign(this, data || {});
  }
}

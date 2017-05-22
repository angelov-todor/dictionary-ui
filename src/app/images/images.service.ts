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
    'Content-Type': 'application/json'
    // 'Accept': 'application/hal+json'
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

  getImages(): Observable<Image[]> {
    return this.http
      .get(this.imagesUrl, {headers: this.headers})
      .map((res) => res.json())
      .map(imagesResponse => {
        imagesResponse = imagesResponse['hydra:member'].map(
          imageData => new Image(imageData)
        );
        return imagesResponse;
      });
  }

  getImage(id: number): Observable<Image> {
    return this.http
      .get(this.imagesUrl + `/${id}`, {headers: this.headers})
      .map((res) => res.json())
      .map(imageData => {
        return new Image(imageData);
      });
  }
}

export class Image {
  public image: {
    thumbnailLink: string;
  };
  public id: number;
  public src: string;
  public '@id': string;

  get thumb(): string {
    return environment.baseAPIEndpoint + '/image/thumb/' + this.src;
  }

  get large(): string {
    return environment.baseAPIEndpoint + '/image/large/' + this.src;
  }

  constructor(data?: Partial<Image>) {
    Object.assign(this, data || {});
  }
}

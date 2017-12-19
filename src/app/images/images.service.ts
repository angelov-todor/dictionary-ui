import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { environment } from '../../environments/environment';
import { Metadata } from '../metadata/metadata.service';

@Injectable()
export class ImagesService {
  private imagesUrl = environment.baseAPIEndpoint + '/images';  // URL to web api
  private imagesEnrichUrl = environment.baseAPIEndpoint + '/images-enrich';
  private headers = new Headers({
    'Content-Type': 'application/json'
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

  search(term: string): Observable<FoundImage[]> {
    return this.http
      .get(`${this.imagesUrl}/search?term=${term}`)
      .map(response => response.json().items as FoundImage[]);
  }

  uploadFoundImage(req): Observable<Image> {
    return this.http
      .post(`${this.imagesUrl}-upload-external`, req)
      .map(response => response.json() as Image);
  }

  upload(req): Observable<Image> {
    return this.http
      .post(`${this.imagesUrl}-upload`, JSON.stringify(req))
      .map(response => response.json() as Image);
  }

  getImages(): Observable<any> {
    return this.http
      .get(this.imagesUrl, {headers: this.headers})
      .map((res) => res.json());
  }

  getImage(id: number): Observable<Image> {
    return this.http
      .get(this.imagesUrl + `/${id}`, {headers: this.headers})
      .map((res) => res.json())
      .map(imageData => {
        return new Image(imageData);
      });
  }

  getEnrichment() {
    return this.http
      .get(this.imagesEnrichUrl)
      .map((res) => res.json())
      .map(data => {
        return new EnrichmentResponse(data);
      });
  }

  remove(image: Image): Observable<Boolean> {
    return this.http.delete(this.imagesUrl + '/' + image.id, {headers: this.headers})
      .do({
        error: console.log
      })
      .map(() => true);
  }
}

export class EnrichmentResponse {
  public image: Image;
  public metadata: Metadata;
  public question: string;

  constructor(data?: Partial<EnrichmentResponse>) {
    this.image = new Image(data.image);
    this.metadata = new Metadata(data.metadata);
    this.question = data.question;
  }
}

export class FoundImage {
  public image: {
    thumbnailLink: string;
  };
}

export class Image {
  public id: number;
  public src: string;
  public image_metadata: ImageMetadata[];

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

export class ImageMetadata {
  public id: number;
  public metadata: Metadata;
  public value: string;

  constructor(data?: Partial<ImageMetadata>) {
    Object.assign(this, data || {});
  }
}

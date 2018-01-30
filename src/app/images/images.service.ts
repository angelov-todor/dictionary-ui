import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { environment } from '../../environments/environment';
import { Metadata } from '../metadata/metadata.service';
import { PartialCollectionView } from '../words/words.service';

@Injectable()
export class ImagesService {
  private imagesUrl = environment.baseAPIEndpoint + '/images';  // URL to web api
  private imagesEnrichUrl = environment.baseAPIEndpoint + '/images-enrich';
  progress;
  progressObserver;

  constructor(private http: AuthHttp) {

    this.progress = Observable.create(observer => {
      this.progressObserver = observer;
    }).share();
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

  getImage(id: number): Observable<Image> {
    return this.http
      .get(this.imagesUrl + `/${id}`)
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
    return this.http.delete(this.imagesUrl + '/' + image.id)
      .do({
        error: console.log
      })
      .map(() => true);
  }

  getImagesList(page?: string): Observable<ImageListResponse> {
    const url = page ? environment.baseAPIEndpoint + page : this.imagesUrl;

    return this.http.get(url)
      .map(res => res.json())
      .map(imageResponse => {
        imageResponse = new ImageListResponse(imageResponse);
        return imageResponse;
      });
  }

  filterByTerm(term: string): Observable<ImageListResponse> {
    const url = this.imagesUrl;
    return this.http.get(url,
      {
        params: {
          term
        }
      })
      .map(res => res.json())
      .map(imagesResponse => {
        imagesResponse = new ImageListResponse(imagesResponse);
        return imagesResponse;
      });
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

export class ImageListResponse {
  public images: Image[];
  public view: PartialCollectionView;
  public totalItems: number;

  constructor(data?: Partial<any>) {
    this.images = data._embedded.images.map(
      (image) => new Image(image)
    );

    this.view = new PartialCollectionView({
      count: data.count, limit: data.limit, page: data.page, pages: data.pages, total: data.total,
      first: data._links.first.href,
      last: data._links.last.href,
      next: data._links.next ? data._links.next.href : null,
      previous: data._links.previous ? data._links.previous.href : null,
      current: data._links.self.href
    });
    this.totalItems = data.total;
  }
}

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { environment } from '../../environments/environment';
import { ImageMetadata } from './images.service';

@Injectable()
export class ImagesMetadataService {

  constructor(private http: AuthHttp) {
  }

  create(data: any): Observable<any> {
    const url = environment.baseAPIEndpoint + `/images/${data.image}/metadata`;
    return this.http.post(url, data)
      .map(response => response.json())
      .map(imageMetadata => {
        return new ImageMetadata(imageMetadata);
      });
  }

  delete(id: number): Observable<any> {
    const url = environment.baseAPIEndpoint + `/images/${id}/metadata`;
    return this.http.delete(url)
      .do({
        error: console.log
      })
      .map(() => true);
  }
}

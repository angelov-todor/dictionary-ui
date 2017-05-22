import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { environment } from '../../environments/environment';

@Injectable()
export class ImagesMetadataService {
  private imageMetadataUrl = environment.baseAPIEndpoint + '/image_metadatas';  // URL to web api
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: AuthHttp) {

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.imageMetadataUrl, data)
      .map(response => response.json());
  }

}
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MetadataService {
  private metadataUrl = environment.baseAPIEndpoint + '/metadatas';
  private headers = new Headers({
    'Content-Type': 'application/json'
    // 'Accept': 'application/json'
  });

  constructor(private http: AuthHttp) {
  }

  getMetadataList(): Promise<Metadata[]> {
    return this.http.get(
      this.metadataUrl, {headers: this.headers}
    ).toPromise()
      .then(response => response.json()['hydra:member'] as Metadata[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(metadata: any): Observable<Metadata> {
    return this.http
      .post(this.metadataUrl, metadata, {headers: this.headers})
      .map(res => res.json() as Metadata);
  }

  delete(id: number): Promise<void> {
    const url = `${this.metadataUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}

export class Metadata {
  '@id': string;
  public id: number;
  public name: string;
  public type: string;
  public parent?: Metadata;

  constructor(data?: Partial<Metadata>) {
    Object.assign(this, data || {});
  }
}

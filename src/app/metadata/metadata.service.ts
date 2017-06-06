import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { PartialCollectionView } from '../words/words.service';

@Injectable()
export class MetadataService {
  private metadataUrl = environment.baseAPIEndpoint + '/metadatas';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: AuthHttp) {
  }

  getMetadataList(page?: string): Observable<MetadataListResponse> {
    const url = page ? environment.baseAPIEndpoint + page : this.metadataUrl;

    return this.http.get(url)
      .map(res => res.json())
      .map(metadataResponse => {
        metadataResponse = new MetadataListResponse(metadataResponse);
        return metadataResponse;
      });
  }

  filterByName(name: string): Observable<MetadataListResponse> {
    const url = this.metadataUrl;
    return this.http.get(url,
      {
        params: {
          name
        }
      })
      .map(res => res.json())
      .map(metadataResponse => {
        metadataResponse = new MetadataListResponse(metadataResponse);
        return metadataResponse;
      });
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
export class MetadataListResponse {
  public metadata: Metadata[];
  public view: PartialCollectionView;
  public totalItems: number;

  constructor(data?: Partial<MetadataListResponse>) {
    this.metadata = data['hydra:member'].map(
      (meta) => new Metadata(meta)
    );
    if (data['hydra:view']) {
      this.view = new PartialCollectionView(data['hydra:view']);
    }
    this.totalItems = data['hydra:totalItems'];
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

export class MetadataTypes {
  static types = [
    {
      type: 'text',
      label: 'Text'
    }, {
      type: 'bool',
      label: 'Boolean'
    }, {
      type: 'number',
      label: 'Number'
    }
  ];
}

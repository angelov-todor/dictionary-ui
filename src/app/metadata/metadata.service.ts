import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { PartialCollectionView } from '../words/words.service';

@Injectable()
export class MetadataService {
  private metadataUrl = environment.baseAPIEndpoint + '/metadata';
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

  create(metadata: any): Observable<Metadata> {
    return this.http
      .post(this.metadataUrl, metadata, {headers: this.headers})
      .map(res => res.json() as Metadata);
  }

  update(metadata: any): Observable<Metadata> {
    const url = `${this.metadataUrl}/${metadata.id}`;
    return this.http
      .put(url, metadata, {headers: this.headers})
      .map(res => res.json() as Metadata);
  }

  remove(id: number): Observable<boolean> {
    const url = `${this.metadataUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .do({
        error: console.log
      })
      .map(() => true);
  }
}

export class MetadataListResponse {
  public metadata: Metadata[];
  public view: PartialCollectionView;
  public totalItems: number;

  constructor(data?: Partial<any>) {
    this.metadata = data._embedded.metadata.map(
      (meta) => new Metadata(meta)
    );

    this.view = new PartialCollectionView({
      count: data.count,
      limit: data.limit,
      page: data.page,
      pages: data.pages,
      total: data.total,
      first: data._links.first.href,
      last: data._links.last.href,
      next: data._links.next ? data._links.next.href : null,
      previous: data._links.previous ? data._links.previous.href : null
    });
    this.totalItems = data.total;
  }
}

export class Metadata {
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

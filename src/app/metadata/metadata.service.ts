import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { PartialCollectionView } from '../words/words.service';
import { TreeNode, TreeNodeParams } from '../shared/tree-node';

@Injectable()
export class MetadataService {
  private serviceUrl = environment.baseAPIEndpoint + '/metadata';

  constructor(private http: AuthHttp) {
  }

  getMetadataList(page?: number): Observable<MetadataListResponse> {
    return this.http.get(this.serviceUrl, {params: {page}})
      .map(res => res.json())
      .map(metadataResponse => {
        metadataResponse = new MetadataListResponse(metadataResponse);
        return metadataResponse;
      });
  }

  get(id: string): Observable<Metadata> {
    const url = `${this.serviceUrl}/${id}`;
    return this.http
      .get(url)
      .map(res => res.json())
      .map(data => new Metadata(data));
  }

  filterByName(name: string): Observable<MetadataListResponse> {
    const url = this.serviceUrl;
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

  filterByParent(parent?: any): Observable<MetadataListResponse> {
    const url = this.serviceUrl;
    return this.http.get(url,
      {
        params: {
          parent,
          limit: 100
        }
      })
      .map(res => res.json())
      .map(metadataResponse => {
        return new MetadataListResponse(metadataResponse);
      });
  }

  create(metadata: any): Observable<Metadata> {
    return this.http
      .post(this.serviceUrl, metadata)
      .map(res => res.json() as Metadata);
  }

  update(metadata: any): Observable<Metadata> {
    const url = `${this.serviceUrl}/${metadata.id}`;
    return this.http
      .put(url, metadata)
      .map(res => res.json() as Metadata);
  }

  remove(id: string): Observable<boolean> {
    const url = `${this.serviceUrl}/${id}`;
    return this.http.delete(url)
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
      previous: data._links.previous ? data._links.previous.href : null,
      current: data._links.self.href
    });
    this.totalItems = data.total;
  }
}

export class Metadata implements TreeNodeParams {
  public id: string;
  public name: string;
  public type: string;
  public parent?: Metadata;
  public values?: string;
  public children?: Metadata[];

  get parent_id() {
    return this.parent && this.parent.id;
  }

  constructor(data?: Partial<Metadata>) {
    Object.assign(this, data || {});
  }
}

export class MetadataTypes {
  static types = [
    {
      type: 'text',
      label: 'Text'
    },
    {
      type: 'number',
      label: 'Number'
    }
  ];
}

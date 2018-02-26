import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { PartialCollectionView } from '../words/words.service';

@Injectable()
export class CognitiveTypeService {
  private serviceUrl = environment.baseAPIEndpoint + '/cognitive-type';

  constructor(private http: AuthHttp) {
  }

  getCognitiveTypesList(page?: number): Observable<CognitiveTypesListResponse> {
    return this.http.get(this.serviceUrl, {
      params: {page: page}
    })
      .map(res => res.json())
      .map(cognitiveTypesResponse => {
        cognitiveTypesResponse = new CognitiveTypesListResponse(cognitiveTypesResponse);
        return cognitiveTypesResponse;
      });
  }

  create(cognitiveType: any): Observable<CognitiveType> {
    return this.http
      .post(this.serviceUrl, cognitiveType)
      .map(res => res.json() as CognitiveType);
  }

  update(cognitiveType: any): Observable<CognitiveType> {
    const url = `${this.serviceUrl}/${cognitiveType.id}`;
    return this.http
      .put(url, cognitiveType)
      .map(res => res.json() as CognitiveType);
  }

  remove(id: number): Observable<boolean> {
    const url = `${this.serviceUrl}/${id}`;
    return this.http.delete(url)
      .do({
        error: console.log
      })
      .map(() => true);
  }
}

export class CognitiveTypesListResponse {
  public cognitive_types: CognitiveType[];
  public view: PartialCollectionView;
  public totalItems: number;

  constructor(data?: Partial<any>) {
    if (data._embedded.cognitive_types) {
      this.cognitive_types = data._embedded.cognitive_types.map(
        (cognitiveType) => new CognitiveType(cognitiveType)
      );
    } else {
      this.cognitive_types = [];
    }

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

export class CognitiveType {
  public id: number;
  public name: string;
  public parent?: CognitiveType;

  constructor(data?: Partial<CognitiveType>) {
    Object.assign(this, data || {});
  }
}

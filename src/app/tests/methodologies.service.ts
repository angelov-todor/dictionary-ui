import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { PartialCollectionView } from '../words/words.service';

@Injectable()
export class MethodologiesService {
  private serviceUrl = environment.baseAPIEndpoint + '/methodologies';

  constructor(private http: AuthHttp) {
  }

  getMethodologiesList(page?: string): Observable<MethodologiesListResponse> {
    const url = page ? environment.baseAPIEndpoint + page : this.serviceUrl;

    return this.http.get(url)
      .map(res => res.json())
      .map(methodologiesResponse => {
        methodologiesResponse = new MethodologiesListResponse(methodologiesResponse);
        return methodologiesResponse;
      });
  }

  create(methodology: any): Observable<Methodology> {
    return this.http
      .post(this.serviceUrl, methodology)
      .map(res => res.json() as Methodology);
  }
}

export class MethodologiesListResponse {
  public methodologies: Methodology[];
  public view: PartialCollectionView;
  public totalItems: number;

  constructor(data?: Partial<any>) {
    if (data._embedded.methodologies) {
      this.methodologies = data._embedded.methodologies.map(
        (methodology) => new Methodology(methodology)
      );
    } else {
      this.methodologies = [];
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

export class Methodology {
  public id: number;
  public name: string;

  constructor(data?: Partial<Methodology>) {
    Object.assign(this, data || {});
  }
}

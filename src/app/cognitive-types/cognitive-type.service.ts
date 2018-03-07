import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { CognitiveType, CognitiveTypesListResponse } from './cognitive-types.models';

@Injectable()
export class CognitiveTypeService {
  private serviceUrl = environment.baseAPIEndpoint + '/cognitive-type';

  constructor(private http: AuthHttp) {
  }

  getCognitiveTypesList(page?: number): Observable<CognitiveTypesListResponse> {
    return this.http.get(this.serviceUrl, { params: { page } })
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

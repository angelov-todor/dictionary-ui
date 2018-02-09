import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ToolsService {

  private serviceUrl = environment.baseAPIEndpoint + '/tools';

  constructor(private http: AuthHttp) {
  }

  getOutput(word: string, algorithm: string): Observable<any> {
    const url = this.serviceUrl + `/${algorithm}`;

    return this.http.get(url, {
      params: {word: word}
    }).map(res => res.json());
  }
}

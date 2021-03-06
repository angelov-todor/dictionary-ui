import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  public token: string;
  private baseUrl = environment.baseAPIEndpoint;

  constructor(private http: Http) {
    // set token if saved in local storage
    const token = localStorage.getItem('token');
    this.token = token && token;
  }

  authenticate(username: string, password: string): Observable<boolean> {
    return this.http.post(this.baseUrl + '/authenticate',
      {email: username, password: password})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const token = response.json() && response.json().jwt;
        if (token) {
          // set token property
          this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', token);

          // return true to indicate successful login
          return true;
        }
        // return false to indicate failed login
        return false;
      });
  }

  login(username: string, password: string): Observable<boolean> {
    return this.authenticate(username, password);
  }

  signup(username: string, password: string) {
    return this.http.post(this.baseUrl + '/users',
      {email: username, password: password})
      .map(() => true);
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  loggedIn() {
    return tokenNotExpired();
  }
}

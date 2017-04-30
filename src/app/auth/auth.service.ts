import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class Auth {
    public token: string;
    private baseUrl = 'http://192.168.1.100:8081';  // URL to web api
    constructor(private http: Http) {
        // set token if saved in local storage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    authenticate(username: string, password: string): Observable<boolean> {
        return this.http.post(this.baseUrl + '/authenticate',
            JSON.stringify({username: username, password: password}))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));

                    // return true to indicate successful login
                    return true;
                }
                // return false to indicate failed login
                return false;
            });
    }

    login(username: string, password: string) {
        return this.authenticate(username, password);
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    loggedIn() {
        return tokenNotExpired();
    }
}

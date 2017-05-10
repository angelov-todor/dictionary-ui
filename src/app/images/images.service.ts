import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ImagesService {
    private imagesUrl = 'http://85.187.92.66:8080/images';  // URL to web api
    private headers = new Headers({
        'Content-Type': 'application/hal+json',
        'Accept': 'application/json'
    });

    constructor(private http: AuthHttp) {
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    search(term: string): Observable<Image[]> {
        return this.http
            .get(`${this.imagesUrl}/search?term=${term}`)
            .map(response => response.json().data as Image[]);
    }
}

export interface Image {
    image: string;
}

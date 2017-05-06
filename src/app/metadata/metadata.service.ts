import { AuthHttp } from 'angular2-jwt';
import { Metadata } from './metadata';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class MetadataService {
    private metadataUrl = 'http://85.187.92.66:8080/metadatas';  // URL to web api
    private headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });

    constructor(private http: AuthHttp) {
    }

    getMetadataList(): Promise<Metadata[]> {
        return this.http.get(
            this.metadataUrl
            , {headers: new Headers({'Accept': 'application/hal+json'})}
        ).toPromise()
            .then(response => response.json()._embedded.item as Metadata[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    create(name: string, type: string): Promise<Metadata> {
        return this.http
            .post(this.metadataUrl, JSON.stringify({name: name, type: type}), {headers: this.headers})
            .toPromise()
            .then(res => res.json() as Metadata)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.metadataUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
}

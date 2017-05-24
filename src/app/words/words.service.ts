import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WordsService {
  private wordsUrl = environment.baseAPIEndpoint + '/words';  // URL to web api
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: AuthHttp) {
  }

  getWords(): Observable<Word[]> {
    return this.http.get(this.wordsUrl)
      .map(res => res.json())
      .map(wordsResponse => {
        wordsResponse = wordsResponse['hydra:member'].map(
          wordData => new Word(wordData)
        );
        return wordsResponse;
      });
  }
}

export class Word {
  public id: number;
  public name: string;
  public '@id': string;
  public meaning: string;
  public classification: string;
  public synonyms: string;
  public nameStressed: string;
  public nameBroken: string;

  constructor(data?: Partial<Word>) {
    Object.assign(this, data || {});
  }


}

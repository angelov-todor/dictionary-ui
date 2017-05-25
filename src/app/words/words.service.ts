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

  getWords(page?: string): Observable<WordListResponse> {
    const url = page ? environment.baseAPIEndpoint + page : this.wordsUrl;
    return this.http.get(url)
      .map(res => res.json())
      .map(wordsResponse => {
        wordsResponse = new WordListResponse(wordsResponse);
        // wordsResponse = wordsResponse.map(
        //   wordData => new Word(wordData['hydra:member'])
        // );
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
export class WordListResponse {
  public words: Word[];
  public view: PartialCollectionView;
  public totalItems: number;

  constructor(data?: Partial<Word>) {
    this.words = data['hydra:member'].map(
      (wordData) => new Word(wordData)
    );
    this.view = new PartialCollectionView(data['hydra:view']);
    this.totalItems = data['hydra:totalItems'];
  }
}

export class PartialCollectionView {
  public first: string;
  public last: string;
  public next: string;
  public previous: string;
  public '@id': string;

  constructor(data?: Partial<Word>) {
    this.first = data['hydra:first'];
    this.last = data['hydra:last'];
    this.next = data['hydra:next'];
    this.previous = data['hydra:previous'];
    this['@id'] = data['@id'];
  }
}

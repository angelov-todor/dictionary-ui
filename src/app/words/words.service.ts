import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WordsService {
  private wordsUrl = environment.baseAPIEndpoint + '/words';  // URL to web api

  constructor(private http: AuthHttp) {
  }

  getWords(page?: string): Observable<WordListResponse> {
    const url = page ? environment.baseAPIEndpoint + page : this.wordsUrl;
    return this.http.get(url)
      .map(res => res.json())
      .map(wordsResponse => {
        wordsResponse = new WordListResponse(wordsResponse);
        return wordsResponse;
      });
  }

  filterByName(name: string): Observable<WordListResponse> {
    const url = this.wordsUrl;
    return this.http.get(url,
      {
        params: {
          name
        }
      })
      .map(res => res.json())
      .map(wordsResponse => {
        wordsResponse = new WordListResponse(wordsResponse);
        return wordsResponse;
      });
  }

  getWord(id: number): Observable<Word> {
    const url = this.wordsUrl + `/${id}`;
    return this.http.get(url).map(res => res.json()).map(wordResponse => {
      wordResponse = new Word(wordResponse);
      return wordResponse;
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
  public etymology: string;
  public nameCondensed: string;

  public incorrectForms: IncorrectForm[];
  public derivativeForms: DerivativeForm[];
  public type;

  get incorrectFormsNames() {
    return this.incorrectForms.map((f) => {
      return f.name;
    }).join(', ');
  }

  get derivativeFormsNames() {
    return this.derivativeForms.map((f) => {
      return f.name;
    }).join(', ');
  }

  constructor(data?: Partial<Word>) {
    Object.assign(this, data || {});
  }
}
export class WordListResponse {
  public words: Word[];
  public view: PartialCollectionView;
  public totalItems: number;

  constructor(data?: Partial<WordListResponse>) {
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

  constructor(data?: Partial<PartialCollectionView>) {
    this.first = data['hydra:first'];
    this.last = data['hydra:last'];
    this.next = data['hydra:next'];
    this.previous = data['hydra:previous'];
    this['@id'] = data['@id'];
  }
}
export class DerivativeForm {
  public id: string;
  public name: string;

  constructor(data?: Partial<DerivativeForm>) {
    Object.assign(this, data || {});
  }
}
export class IncorrectForm {
  public id: string;
  public name: string;

  constructor(data?: Partial<DerivativeForm>) {
    Object.assign(this, data || {});
  }

  toString() {
    return this.name;
  }
}


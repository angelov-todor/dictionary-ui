import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WordsService {
  private serviceUrl = environment.baseAPIEndpoint + '/words';  // URL to web api

  constructor(private http: AuthHttp) {
  }

  getWords(page?: number): Observable<WordListResponse> {
    return this.http.get(this.serviceUrl, {params: {page}})
      .map(res => res.json())
      .map(wordsResponse => {
        wordsResponse = new WordListResponse(wordsResponse);
        return wordsResponse;
      });
  }

  filterByName(name: string): Observable<WordListResponse> {
    const url = this.serviceUrl;
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
    const url = this.serviceUrl + `/${id}`;
    return this.http.get(url)
      .map(res => res.json())
      .map(wordResponse => {
        wordResponse = new Word(wordResponse);
        return wordResponse;
      });
  }
}

export class Word {
  public id: number;
  public name: string;
  public meaning: string;
  public classification: string;
  public synonyms: string;
  public name_stressed: string;
  public name_broken: string;
  public etymology: string;
  public name_condensed: string;

  public incorrect_forms: IncorrectForm[];
  public derivative_forms: DerivativeForm[];
  public type;

  get incorrectFormsNames() {
    return this.incorrect_forms.map((f) => {
      return f.name;
    }).join(', ');
  }

  get derivativeFormsNames() {
    return this.derivative_forms.map((f) => {
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

  constructor(data?: Partial<any>) {
    this.words = data._embedded.words.map(
      (wordData) => new Word(wordData)
    );
    this.view = new PartialCollectionView({
      count: data.count, limit: data.limit, page: data.page, pages: data.pages, total: data.total,
      first: data._links.first.href,
      last: data._links.last.href,
      next: data._links.next ? data._links.next.href : null,
      previous: data._links.previous ? data._links.previous.href : null,
      current: data._links.self ? data._links.self.href : null
    });
    this.totalItems = data.total;
  }
}

export class PartialCollectionView {
  public count: string;
  public limit: string;
  public page: number;
  public pages: number;
  public total: string;
  public first: string;
  public last: string;
  public next: string;
  public previous: string;
  public current: string;

  constructor(data?: Partial<PartialCollectionView>) {
    Object.assign(this, data || {});
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


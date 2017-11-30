import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { PartialCollectionView } from './words.service';

@Injectable()
export class DictionaryService {

  private dictionaryURL = environment.baseAPIEndpoint + '/dictionary';

  constructor(private http: AuthHttp) {
  }

  getDictionary(page?: string): Observable<DictionaryResponse> {
    const url = page ? environment.baseAPIEndpoint + page : this.dictionaryURL;

    return this.http.get(url)
      .map(res => res.json())
      .map(dictionaryResponse => {
        dictionaryResponse = new DictionaryResponse(dictionaryResponse);
        return dictionaryResponse;
      });
  }

  filterByName(name: string): Observable<DictionaryResponse> {
    return this.http.get(this.dictionaryURL, {params: {name}})
      .map(res => res.json())
      .map(wordsResponse => {
        wordsResponse = new DictionaryResponse(wordsResponse);
        return wordsResponse;
      });
  }
}

export class DictionaryResponse {
  public words: DictionaryWord[];
  public view: PartialCollectionView;
  public totalItems: number;

  constructor(data?: Partial<any>) {
    this.words = data._embedded.dictionary.map(
      (wordData) => new DictionaryWord(wordData)
    );
    this.view = new PartialCollectionView({
      count: data.count, limit: data.limit, page: data.page, pages: data.pages, total: data.total,
      first: data._links.first.href,
      last: data._links.last.href,
      next: data._links.next ? data._links.next.href : null,
      previous: data._links.previous ? data._links.previous.href : null
    });
    this.totalItems = data.total;
  }
}

export class DictionaryWord {
  public id: number;
  public word: string;
  public normalized: string;
  public characteristic: string;
  public rhymeform: string;

  constructor(data?: Partial<DictionaryWord>) {
    Object.assign(this, data || {});
  }
}

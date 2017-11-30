import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { DictionaryResponse, DictionaryWord } from '../words/dictionary.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ToolsService {

  private toolsURL = environment.baseAPIEndpoint + '/tools';

  constructor(private http: AuthHttp) {
  }

  getSyllables(word?: string) {
    const url = this.toolsURL + '/syllables';
    return this.http.get(url, {
      params: word
    }).map(res => res.json());
  }

  getRhymeform(word?: string) {
    const url = this.toolsURL + '/rhymeform';
    return this.http.get(url, {
      params: word
    }).map(res => res.json());
  }

  getTranscription(word?: string) {
    const url = this.toolsURL + '/transcription';
    return this.http.get(url, {
      params: word
    }).map(res => res.json());
  }

  getReduction(word?: string) {
    const url = this.toolsURL + '/reduction';
    return this.http.get(url, {
      params: word
    }).map(res => res.json());
  }

  getPhonemes(word?: string) {
    const url = this.toolsURL + '/phonemes';
    return this.http.get(url, {
      params: word
    }).map(res => res.json());
  }

  getRhymes(word?: string): Observable<DictionaryWord[]> {
    const url = this.toolsURL + '/rhymes';
    return this.http.get(url, {
      params: word
    }).map(res => res.json())
      .map((res) => {
        const words = res.map((wordData) => new DictionaryWord(wordData))
        return words;
      });
  }
}

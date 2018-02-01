import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { PartialCollectionView } from '../words/words.service';

@Injectable()
export class CognitiveSkillService {
  private serviceUrl = environment.baseAPIEndpoint + '/cognitive-skill';

  constructor(private http: AuthHttp) {
  }

  getCognitiveSkillsList(page?: string): Observable<CognitiveSkillsListResponse> {
    const url = page ? environment.baseAPIEndpoint + page : this.serviceUrl;

    return this.http.get(url)
      .map(res => res.json())
      .map(cognitiveSkillsResponse => {
        cognitiveSkillsResponse = new CognitiveSkillsListResponse(cognitiveSkillsResponse);
        return cognitiveSkillsResponse;
      });
  }

  create(cognitiveSkill: any): Observable<CognitiveSkill> {
    return this.http
      .post(this.serviceUrl, cognitiveSkill)
      .map(res => res.json() as CognitiveSkill);
  }

  update(cognitiveSkill: any): Observable<CognitiveSkill> {
    const url = `${this.serviceUrl}/${cognitiveSkill.id}`;
    return this.http
      .put(url, cognitiveSkill)
      .map(res => res.json() as CognitiveSkill);
  }

  remove(id: number): Observable<boolean> {
    const url = `${this.serviceUrl}/${id}`;
    return this.http.delete(url)
      .do({
        error: console.log
      })
      .map(() => true);
  }
}

export class CognitiveSkillsListResponse {
  public cognitive_skills: CognitiveSkill[];
  public view: PartialCollectionView;
  public totalItems: number;

  constructor(data?: Partial<any>) {
    if (data._embedded.cognitive_skills) {
      this.cognitive_skills = data._embedded.cognitive_skills.map(
        (cognitiveSkill) => new CognitiveSkill(cognitiveSkill)
      );
    } else {
      this.cognitive_skills = [];
    }

    this.view = new PartialCollectionView({
      count: data.count,
      limit: data.limit,
      page: data.page,
      pages: data.pages,
      total: data.total,
      first: data._links.first.href,
      last: data._links.last.href,
      next: data._links.next ? data._links.next.href : null,
      previous: data._links.previous ? data._links.previous.href : null,
      current: data._links.self.href
    });
    this.totalItems = data.total;
  }
}

export class CognitiveSkill {
  public id: number;
  public name: string;

  constructor(data?: Partial<CognitiveSkill>) {
    Object.assign(this, data || {});
  }
}

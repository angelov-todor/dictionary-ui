import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { CognitiveSkill, CognitiveSkillsListResponse } from './cognitive-skill.models';
import { CognitiveType } from '../cognitive-types/cognitive-types.models';

@Injectable()
export class CognitiveSkillService {
  private serviceUrl = environment.baseAPIEndpoint + '/cognitive-skill';

  constructor(private http: AuthHttp) {
  }

  getCognitiveSkill(id: string): Observable<CognitiveSkill> {
    return this.http.get(this.serviceUrl + `/${id}`)
      .map(res => res.json())
      .map(cognitiveSkillResponse => {
        return new CognitiveSkill(cognitiveSkillResponse);
      });
  }

  getCognitiveSkillsList(page?: number): Observable<CognitiveSkillsListResponse> {
    return this.http.get(this.serviceUrl, { params: { page } })
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

  update(cognitiveSkill: CognitiveSkill): Observable<CognitiveSkill> {
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

  assignCognitiveType(cognitiveSkill: CognitiveSkill, cognitiveType: CognitiveType): Observable<CognitiveSkill> {
    const url = `${this.serviceUrl}/${cognitiveSkill.id}/cognitive-types`;
    return this.http
      .post(url, { cognitive_type_id: cognitiveType.id })
      .map(res => res.json())
      .map(data => {
        return new CognitiveSkill(data);
      });
  }

  removeCognitiveType(cognitiveSkill: CognitiveSkill, cognitiveType: CognitiveType): Observable<boolean> {
    const url = `${this.serviceUrl}/${cognitiveSkill.id}/cognitive-types/${cognitiveType.id}`;
    return this.http
      .delete(url)
      .map(res => res.json())
      .map(() => true);
  }
}



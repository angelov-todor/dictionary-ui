import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { PartialCollectionView } from '../words/words.service';
import { Methodology } from './methodologies.service';
import { CognitiveSkill } from '../cognitive-skills/cognitive-skill.service';
import { Unit } from '../units/units.service';

@Injectable()
export class TestsService {

  private serviceUrl = environment.baseAPIEndpoint + '/tests';

  constructor(private http: AuthHttp) {
  }

  create(cognitiveType: any): Observable<Test> {
    return this.http
      .post(this.serviceUrl, cognitiveType)
      .map(res => res.json() as Test);
  }


  getTestsList(page?: string): Observable<TestsListResponse> {
    const url = page ? environment.baseAPIEndpoint + page : this.serviceUrl;

    return this.http.get(url)
      .map(res => res.json())
      .map(testsResponse => {
        testsResponse = new TestsListResponse(testsResponse);
        return testsResponse;
      });
  }

  remove(id: number): Observable<boolean> {
    const url = `${this.serviceUrl}/${id}`;
    return this.http.delete(url)
      .do({
        error: console.log
      })
      .map(() => true);
  }

  update(test: Test, data: any): Observable<boolean> {
    return this.http
      .put(this.serviceUrl + `/${test.id}`, data)
      .map(res => true);
  }

  getTest(id: string): Observable<Test> {
    return this.http
      .get(this.serviceUrl + `/${id}`)
      .map((res) => res.json())
      .map(testData => {
        return new Test(testData);
      });
  }

  assignUnit(test: Test, unit: Unit): Observable<Test> {
    const url = `${this.serviceUrl}/${test.id}/units`;
    return this.http
      .post(url, {unit_id: unit.id})
      .map(res => res.json() as Test);
  }
}

export class TestsListResponse {
  public tests: Test[];
  public view: PartialCollectionView;
  public totalItems: number;

  constructor(data?: Partial<any>) {
    if (data._embedded.tests) {
      this.tests = data._embedded.tests.map(
        (test) => new Test(test)
      );
    } else {
      this.tests = [];
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

export class Test {
  public id: number;
  public name: string;
  public methodology: Methodology;
  public cognitive_skill: CognitiveSkill;

  get methodology_id() {
    return this.methodology.id;
  }

  get cognitive_skill_id() {
    return this.cognitive_skill.id;
  }

  constructor(data?: Partial<Test>) {
    Object.assign(this, data || {});
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Image } from '../images/images.service';
import { PartialCollectionView } from '../words/words.service';
import { CognitiveType } from '../cognitive-types/cognitive-types.models';

@Injectable()
export class UnitsService {
  private serviceUrl = environment.baseAPIEndpoint + '/units';  // URL to web api

  constructor(private http: AuthHttp) {
  }

  getUnits(page?: number, test_id?: string): Observable<UnitListResponse> {
    return this.http.get(this.serviceUrl, { params: { page, test_id } })
      .map(res => res.json())
      .map(unitsResponse => {
        unitsResponse = new UnitListResponse(unitsResponse);
        return unitsResponse;
      });
  }

  generate(data: any): Observable<Unit> {
    return this.http.post(this.serviceUrl, data)
      .map(res => res.json())
      .map(unitsResponse => {
        unitsResponse = new Unit(unitsResponse);
        return unitsResponse;
      });
  }

  getUnit(id: string): Observable<Unit> {
    return this.http
      .get(this.serviceUrl + `/${id}`)
      .map((res) => res.json())
      .map(unitData => {
        return new Unit(unitData);
      });
  }

  update(unit: Unit, data: any): Observable<boolean> {
    return this.http
      .put(this.serviceUrl + `/${unit.id}`, data)
      .map(() => true);
  }

  deleteUnit(unit: Unit): Observable<boolean> {
    return this.http
      .delete(this.serviceUrl + `/${unit.id}`)
      .map(() => true);
  }

  updateUnitImage(unitImage: UnitImage, image: Image): Observable<boolean> {
    const url = environment.baseAPIEndpoint + `/unit_images/${unitImage.id}`;

    return this.http
      .put(url, { image: image })
      .map(() => true);
  }

  changeCorrect(unitImage: UnitImage, correct: boolean): Observable<boolean> {
    const url = environment.baseAPIEndpoint + `/unit_images/${unitImage.id}/correct`;

    return this.http
      .put(url, { correct: correct })
      .map(() => true);
  }
}

export type UnitType = 'select' | 'multi_select' | 'essay' | 'short_answer' | 'boolean' ;

export class Unit {
  static TYPE_SELECT = 'select';
  public id: string;
  public text: string;
  public name: string;
  public rows: number;
  public cols: number;
  public type: UnitType;
  public unit_images: UnitImage[];
  public cognitive_type: CognitiveType;
  public cognitive_subtype: CognitiveType;
  public time_to_conduct: number;

  get cognitive_type_id() {
    return this.cognitive_type && this.cognitive_type.id;
  }

  get cognitive_subtype_id() {
    return this.cognitive_subtype && this.cognitive_subtype.id;
  }

  constructor(data?: Partial<Unit>) {
    Object.assign(this, data || {});
    if (this.unit_images) {
      this.unit_images = this.unit_images.map((unitImageData) => new UnitImage(unitImageData));
    }
    if (this.cognitive_type) {
      this.cognitive_type = new CognitiveType(this.cognitive_type);
    }
    if (this.cognitive_subtype) {
      this.cognitive_subtype = new CognitiveType(this.cognitive_subtype);
    }
  }
}

export class UnitImage {
  public id: string;
  public position: Position;
  public image: Image;
  public is_correct: boolean;

  constructor(data?: Partial<UnitImage>) {
    Object.assign(this, data || {});

    this.position = new Position(this.position);
    this.image = new Image(this.image);
  }
}

export class Position {
  public column: number;
  public row: number;

  constructor(data?: Partial<Position>) {
    Object.assign(this, data || {});
  }
}

export class UnitListResponse {
  public units: Unit[];
  public view: PartialCollectionView;
  public totalItems: number;

  constructor(data?: Partial<any>) {
    this.units = data._embedded.units.map(
      (unitData) => new Unit(unitData)
    );
    this.view = new PartialCollectionView({
      count: data.count, limit: data.limit, page: data.page, pages: data.pages, total: data.total,
      first: data._links.first.href,
      last: data._links.last.href,
      next: data._links.next ? data._links.next.href : null,
      previous: data._links.previous ? data._links.previous.href : null,
      current: data._links.self.href
    });
    this.totalItems = data.total;
  }
}

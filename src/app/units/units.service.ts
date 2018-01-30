import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Image } from '../images/images.service';
import { PartialCollectionView } from '../words/words.service';

@Injectable()
export class UnitsService {
  private unitsUrl = environment.baseAPIEndpoint + '/units';  // URL to web api

  constructor(private http: AuthHttp) {
  }

  getUnits(page?: string): Observable<UnitListResponse> {
    const url = page ? environment.baseAPIEndpoint + page : this.unitsUrl;
    return this.http.get(url)
      .map(res => res.json())
      .map(unitsResponse => {
        unitsResponse = new UnitListResponse(unitsResponse);
        return unitsResponse;
      });
  }

  generate(data: any): Observable<Unit> {
    return this.http.post(this.unitsUrl, data)
      .map(res => res.json())
      .map(unitsResponse => {
        unitsResponse = new Unit(unitsResponse);
        return unitsResponse;
      });
  }

  getUnit(id: string): Observable<Unit> {
    return this.http
      .get(this.unitsUrl + `/${id}`)
      .map((res) => res.json())
      .map(unitData => {
        return new Unit(unitData);
      });
  }

  deleteUnit(unit: Unit): Observable<boolean> {
    return this.http
      .delete(this.unitsUrl + `/${unit.id}`)
      .map(() => true);
  }

  updateUnitImage(unitImage: UnitImage, image: Image): Observable<boolean> {
    const url = environment.baseAPIEndpoint + `/unit_images/${unitImage.id}`;

    return this.http
      .put(url, {image: image})
      .map(() => true);
  }
}

export class Unit {
  public id: string;
  public text: string;
  public rows: number;
  public cols: number;
  public unit_images: UnitImage[];

  constructor(data?: Partial<Unit>) {
    Object.assign(this, data || {});
    if (this.unit_images) {
      this.unit_images = this.unit_images.map((unitImageData) => new UnitImage(unitImageData));
    }
  }
}

export class UnitImage {
  public id: string;
  public position: Position;
  public image: Image;

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

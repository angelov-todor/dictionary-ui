import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { PartialCollectionView } from '../words/words.service';

@Injectable()
export class UsersService {
  private usersUrl = environment.baseAPIEndpoint + '/users';

  constructor(private http: AuthHttp) {
  }

  getUsersList(page?: string): Observable<UsersListResponse> {
    const url = page ? environment.baseAPIEndpoint + page : this.usersUrl;

    return this.http.get(url)
      .map(res => res.json())
      .map(usersResponse => {
        usersResponse = new UsersListResponse(usersResponse);
        return usersResponse;
      });
  }
}

export class UsersListResponse {
  public users: User[];
  public view: PartialCollectionView;
  public totalItems: number;

  constructor(data?: Partial<any>) {
    this.users = data._embedded.users.map(
      (user) => new User(user)
    );

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

export class User {
  public id: number;
  public email: string;
  public roles: string;

  constructor(data?: Partial<User>) {
    Object.assign(this, data || {});
  }
}


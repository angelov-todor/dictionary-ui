import { JwtHelper } from 'angular2-jwt';
import { Injectable } from '@angular/core';

@Injectable()
export class Acl {
  private jwtHelper = new JwtHelper();

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    const tokenData = this.jwtHelper.decodeToken(token);
    return tokenData.roles.indexOf('ROLE_ADMIN') >= 0;
  }

  isCreator(): boolean {
    const token = localStorage.getItem('token');
    const tokenData = this.jwtHelper.decodeToken(token);
    return tokenData.roles.indexOf('ROLE_CREATOR') >= 0;
  }

  isUser(): boolean {
    const token = localStorage.getItem('token');
    const tokenData = this.jwtHelper.decodeToken(token);
    return tokenData.roles.indexOf('ROLE_USER') >= 0;
  }
}

export function aclFactory(): Acl {
  return new Acl();
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  loginRouteRegExp = /^\/(|login|signup)([\/#?].*)?$/;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    const url: string = state.url;
    const isLoginPage = this.loginRouteRegExp.test(url);
    const isLoggedIn = this.auth.loggedIn();

    //  login page and not logged in
    if (isLoginPage && false === isLoggedIn) {
      return true;
    }
    if (isLoggedIn && !isLoginPage) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {CanActivate} from '@angular/router';
import {Auth} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  loginRouteRegExp = /^\/(|login)([\/#?].*)?$/;

  constructor(private auth: Auth, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    const url: string = state.url;
    const isLoginPage = this.loginRouteRegExp.test(url);
    if (isLoginPage && !this.auth.loggedIn()) {
      return true;
    }
    if (this.auth.loggedIn()) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}

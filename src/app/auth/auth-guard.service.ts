import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {CanActivate} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    loginRouteRegExp = /^\/(|login)([\/#?].*)?$/;

    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {
        const url: string = state.url;
        const isLoginPage = this.loginRouteRegExp.test(url);
        const loggedIn = this.auth.loggedIn();

        //  login page and not logged in
        if (isLoginPage && false === loggedIn) {
            return true;
        }
        if (loggedIn && !isLoginPage) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}

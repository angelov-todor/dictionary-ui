import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent {

  isActive: boolean;
  jwtHelper: JwtHelper = new JwtHelper();


  constructor(private userAuth: AuthService) {
  }

  onLogout() {
    this.userAuth.logout();
  }

  isValid() {
    return tokenNotExpired();
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    const tokenData = this.jwtHelper.decodeToken(token);
    return tokenData.roles.indexOf('ROLE_ADMIN') >= 0;
  }
}

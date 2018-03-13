import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { Acl } from '../../shared/utils/acl';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent {

  isActive = true;

  constructor(private userAuth: AuthService, private router: Router, public acl: Acl) {
  }

  onLogout() {
    this.userAuth.logout();
    this.router.navigate(['/login']);
  }

  isValid() {
    return tokenNotExpired();
  }
}

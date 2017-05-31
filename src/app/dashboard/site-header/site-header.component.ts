import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent {

  isCollapsed = true;

  constructor(private userAuth: AuthService) {
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  onLogout() {
    this.userAuth.logout();
  }

  isValid() {
    return tokenNotExpired();
  }
}

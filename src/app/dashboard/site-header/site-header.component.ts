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

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(private userAuth: AuthService) {
  }

  onLogout() {
    this.userAuth.logout();
    // NOTE: redirect to /login is handled by AuthGuardService!
    // this.router.navigate(['/login']);
  }


  isValid() {
    return tokenNotExpired();
  }

}

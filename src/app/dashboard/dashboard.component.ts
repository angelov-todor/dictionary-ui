import { Component } from '@angular/core';
import { Acl } from '../shared/utils/acl';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public acl: Acl) {
  }

}

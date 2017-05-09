import { Component } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
    selector: 'app-site-footer',
    templateUrl: './site-footer.component.html',
    styleUrls: ['./site-footer.component.scss']
})
export class SiteFooterComponent {

    currentYear = new Date().getFullYear();

    constructor() {
    }

    isValid() {
        return tokenNotExpired();
    }
}

import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {Auth} from './auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {Http, RequestOptions} from '@angular/http';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {AuthGuard} from './auth-guard.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        tokenName: 'token',
        tokenGetter: (() => sessionStorage.getItem('token')),
        globalHeaders: [{'Content-Type': 'application/json'}],
    }), http, options);
}
@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [LoginPageComponent]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
                Auth,
                {
                    provide: AuthHttp,
                    useFactory: authHttpServiceFactory,
                    deps: [Http, RequestOptions]
                },
                AuthGuard
            ]
        };
    }
}

import {Component} from '@angular/core';

import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
    loginForm: FormGroup;

    constructor(private userAuth: AuthService,
                private router: Router,
                fb: FormBuilder) {
        this.loginForm = fb.group({
            username: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required]
        });
    }

    onSubmit() {
        this.loginForm.markAsTouched({onlySelf: true});
        if (!this.loginForm.valid) {
            return;
        }
        this.userAuth.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
            () => {
                this.router.navigate(['/dashboard']);
            }
        );
    }
}

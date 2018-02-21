import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormControlAsTouched } from '../../shared/utils/markFormControlAsTouched';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  serverError: any;

  constructor(private userAuth: AuthService,
              private router: Router,
              fb: FormBuilder) {
    this.loginForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
    this.loginForm.valueChanges.subscribe(() => {
      this.serverError = null;
    });
  }

  onSubmit() {
    markFormControlAsTouched(this.loginForm);
    if (!this.loginForm.valid) {
      return;
    }
    this.userAuth.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        () => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.serverError = error;
        }
      );
  }
}

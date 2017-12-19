import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {

  signupForm: FormGroup;
  serverError: any;

  constructor(private userAuth: AuthService,
              private router: Router,
              fb: FormBuilder) {
    this.signupForm = fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });

    this.signupForm.valueChanges.subscribe(() => {
      this.serverError = null;
    });
  }

  onSubmit() {
    this.signupForm.markAsTouched({onlySelf: true});
    if (!this.signupForm.valid) {
      return;
    }
    this.userAuth.signup(this.signupForm.value.username, this.signupForm.value.password)
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

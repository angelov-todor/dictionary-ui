import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormControlAsTouched } from '../../shared/utils/markFormControlAsTouched';
import { ToastrService } from 'ngx-toastr';
import { LocalizedMessages } from '../../shared/localized-messages/localized-messages';

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
              fb: FormBuilder,
              private toastr: ToastrService) {
    this.signupForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm.valueChanges.subscribe(() => {
      this.serverError = null;
    });
  }

  onSubmit() {
    markFormControlAsTouched(this.signupForm);

    if (!this.signupForm.valid) {
      return;
    }
    this.userAuth.signup(this.signupForm.value.email, this.signupForm.value.password)
      .switchMap(() => {
        return this.userAuth.login(this.signupForm.value.email, this.signupForm.value.password);
      })
      .subscribe(
        () => {
          this.router.navigate(['/dashboard']).then(() => this.toastr.success(LocalizedMessages.signup));

        },
        (error) => {
          this.serverError = error;
        }
      );
  }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuardService } from './auth-guard.service';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [
  {
    path: 'login', component: LoginPageComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'logout', component: LoginPageComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'signup', component: SignupPageComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}

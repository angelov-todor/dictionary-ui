import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import {AuthGuardService} from './auth-guard.service';

const routes: Routes = [
  {
    path: 'login', component: LoginPageComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'logout', component: LoginPageComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

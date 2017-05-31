import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]
  },
  {
    path: '**', component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}

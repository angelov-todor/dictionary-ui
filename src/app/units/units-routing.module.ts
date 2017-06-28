import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { UnitRootComponent } from './unit-root/unit-root.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitGenerateComponent } from './unit-generate/unit-generate.component';

const routes: Routes = [
  {
    path: 'units', component: UnitRootComponent, canActivate: [AuthGuardService],
    children: [
      {
        path: '', redirectTo: 'list', pathMatch: 'full'
      },
      {
        path: 'list', component: UnitListComponent
      },
      {
        path: 'generate', component: UnitGenerateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule {

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { TestListComponent } from './test-list/test-list.component';
import { UnitRootComponent } from '../units/unit-root/unit-root.component';
import { TestGenerateComponent } from './test-generate/test-generate.component';

const routes: Routes = [
  {
    path: 'tests', component: UnitRootComponent, canActivate: [AuthGuardService],
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: TestListComponent},
      {path: 'generate', component: TestGenerateComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule {

}

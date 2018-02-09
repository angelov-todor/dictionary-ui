import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { TestListComponent } from './test-list/test-list.component';
import { UnitRootComponent } from '../units/unit-root/unit-root.component';
import { TestGenerateComponent } from './test-generate/test-generate.component';
import { TestViewComponent } from './test-view/test-view.component';
import { TestStartComponent } from './test-start/test-start.component';
import { TestResultsComponent } from './test-results/test-results.component';

const routes: Routes = [
  {
    path: 'tests', component: UnitRootComponent, canActivate: [AuthGuardService],
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: TestListComponent},
      {path: 'generate', component: TestGenerateComponent},
      {path: 'view/:id', component: TestViewComponent},
      {path: 'start/:id', component: TestStartComponent},
      {path: 'results/:id', component: TestResultsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule {

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { CognitiveTypeListComponent } from './cognitive-type-list/cognitive-type-list.component';

const routes: Routes = [
  {
    path: 'cognitive-types', component: CognitiveTypeListComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CognitiveTypeRoutingModule {

}

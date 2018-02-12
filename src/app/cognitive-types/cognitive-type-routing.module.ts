import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { CognitiveTypesListPageComponent } from './cognitive-types-list-page/cognitive-types-list-page.component';

const routes: Routes = [
  {
    path: 'cognitive-types', component: CognitiveTypesListPageComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CognitiveTypeRoutingModule {

}

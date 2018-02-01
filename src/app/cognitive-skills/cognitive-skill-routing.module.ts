import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { CognitiveSkillListComponent } from './cognitive-skill-list/cognitive-skill-list.component';

const routes: Routes = [
  {
    path: 'cognitive-skills', component: CognitiveSkillListComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CognitiveSkillRoutingModule {

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { CognitiveSkillListComponent } from './cognitive-skill-list/cognitive-skill-list.component';
import { CognitiveSkillsRootComponent } from './cognitive-skills-root/cognitive-skills-root.component';
import { CognitiveSkillViewComponent } from './cognitive-skill-view/cognitive-skill-view.component';

const routes: Routes = [
  {
    path: 'cognitive-skills', component: CognitiveSkillsRootComponent, canActivate: [AuthGuardService],
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: CognitiveSkillListComponent},
      {path: ':id', component: CognitiveSkillViewComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CognitiveSkillRoutingModule {

}

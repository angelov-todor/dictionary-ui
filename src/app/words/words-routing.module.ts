import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { WordsRootComponent } from './words-root/words-root.component';
import { WordsListComponent } from './words-list/words-list.component';

const routes: Routes = [
  {
    path: 'dictionary', component: WordsRootComponent, canActivate: [AuthGuardService],
    children: [
      {
        path: '', redirectTo: 'list', pathMatch: 'full'
      },
      {
        path: 'list', component: WordsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordsRoutingModule {

}

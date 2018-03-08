import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ToolsRootComponent } from './tools-root/tools-root.component';
import { GeneralComponent } from './general/general.component';
import { SokobanGameComponent } from './sokoban-game/sokoban-game.component';

const routes: Routes = [
  {
    path: 'tools', component: ToolsRootComponent, canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: GeneralComponent }
    ],
  },
  {
    path: 'games/sokoban', component: SokobanGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule {

}

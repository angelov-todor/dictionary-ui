import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { MetadataListPageComponent } from './metadata-list-page/metadata-list-page.component';

const routes: Routes = [
  {
    path: 'metadata', component: MetadataListPageComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetadataRoutingModule {

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetadataListComponent } from './metadata-list/metadata-list.component';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
    // {
    //     path: 'metadata', component: MetadataListComponent, canActivate: [AuthGuardService]
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MetadataRoutingModule {

}

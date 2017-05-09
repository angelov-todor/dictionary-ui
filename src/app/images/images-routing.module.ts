import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageAddComponent } from './image-add/image-add.component';

const routes: Routes = [
    {
        path: 'images', component: ImagesListComponent, canActivate: [AuthGuardService],
        children: [
            {
                path: 'list', component: ImagesListComponent
            },
            {
                path: 'add', component: ImageAddComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ImagesRoutingModule {

}

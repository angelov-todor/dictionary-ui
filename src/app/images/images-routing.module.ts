import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageAddComponent } from './image-add/image-add.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageRootComponent } from './image-root/image-root.component';

const routes: Routes = [
  {
    path: 'images', component: ImageRootComponent, canActivate: [AuthGuardService],
    children: [
      {
        path: '', redirectTo: 'list', pathMatch: 'full'
      },
      {
        path: 'list', component: ImagesListComponent
      },
      {
        path: 'add', component: ImageAddComponent
      },
      {
        path: 'upload', component: ImageUploadComponent
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

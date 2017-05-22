import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageRootComponent } from './image-root/image-root.component';
import { ImageSearchComponent } from './image-search/image-search.component';
import { ImageViewComponent } from './image-view/image-view.component';

const routes: Routes = [
  {
    path: 'images', component: ImageRootComponent, canActivate: [AuthGuardService],
    children: [
      {
        path: '', redirectTo: 'list', pathMatch: 'full'
      },
      {
        path: 'list', component: ImageListComponent
      },
      {
        path: 'search', component: ImageSearchComponent
      },
      {
        path: 'upload', component: ImageUploadComponent
      },
      {
        path: 'view/:id', component: ImageViewComponent
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

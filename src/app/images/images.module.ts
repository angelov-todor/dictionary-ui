import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesService } from './images.service';
import { ImagesRoutingModule } from './images-routing.module';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageAddComponent } from './image-add/image-add.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageRootComponent } from './image-root/image-root.component';

@NgModule({
  imports: [
    CommonModule,
    ImagesRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ImagesListComponent,
    ImageAddComponent,
    ImageUploadComponent,
    ImageRootComponent
  ],
  providers: [ImagesService]
})
export class ImagesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ImagesModule
    };
  }
}

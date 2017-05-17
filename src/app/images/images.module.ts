import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesService } from './images.service';
import { ImagesRoutingModule } from './images-routing.module';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageRootComponent } from './image-root/image-root.component';
import { ImageSearchComponent } from './image-search/image-search.component';

@NgModule({
  imports: [
    CommonModule,
    ImagesRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ImagesListComponent,
    ImageUploadComponent,
    ImageRootComponent,
    ImageSearchComponent
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

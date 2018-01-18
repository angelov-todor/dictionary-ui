import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesService } from './images.service';
import { ImagesRoutingModule } from './images-routing.module';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageRootComponent } from './image-root/image-root.component';
import { ImageSearchComponent } from './image-search/image-search.component';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { ImagesMetadataService } from './images-metadata.service';
import { ImageEnrichComponent } from './image-enrich/image-enrich.component';

@NgModule({
  imports: [
    CommonModule,
    ImagesRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ImageUploadComponent,
    ImageRootComponent,
    ImageSearchComponent,
    ImageListComponent,
    ImageViewComponent,
    ImageEnrichComponent
  ],
  providers: [
    ImagesService,
    ImagesMetadataService
  ],
  exports: [
    ImageEnrichComponent, ImageListComponent
  ]
})
export class ImagesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ImagesModule,
      providers: []
    };
  }
}

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataRoutingModule } from './metadata-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MetadataListComponent } from './metadata-list/metadata-list.component';
import { MetadataService } from './metadata.service';
import { MetadataEditComponent } from './metadata-edit/metadata-edit.component';
import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MetadataRoutingModule,
    ReactiveFormsModule,
    ModalModule,
    SharedModule
  ],
  declarations: [
    MetadataListComponent,
    MetadataEditComponent
  ],
  providers: [MetadataService]
})
export class MetadataModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MetadataModule
    };
  }
}

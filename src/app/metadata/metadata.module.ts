import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataRoutingModule } from './metadata-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MetadataListComponent } from './metadata-list/metadata-list.component';
import { MetadataService } from './metadata.service';
import { MetadataEditComponent } from './metadata-edit/metadata-edit.component';
import { ModalModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { MetadataListPageComponent } from './metadata-list-page/metadata-list-page.component';
import { MetadataTreeViewComponent } from './metadata-tree-view/metadata-tree-view.component';
import { MetadataAddComponent } from './metadata-add/metadata-add.component';

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
    MetadataEditComponent,
    MetadataListPageComponent,
    MetadataTreeViewComponent,
    MetadataAddComponent
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

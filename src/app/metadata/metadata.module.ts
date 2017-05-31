import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataRoutingModule } from './metadata-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MetadataListComponent } from './metadata-list/metadata-list.component';
import { MetadataService } from './metadata.service';
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    MetadataRoutingModule,
    ReactiveFormsModule,
    BsDropdownModule
  ],
  declarations: [
    MetadataListComponent
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

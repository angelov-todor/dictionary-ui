import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CognitiveTypeService } from './cognitive-type.service';
import { CognitiveTypeRoutingModule } from './cognitive-type-routing.module';
import { CognitiveTypeListComponent } from './cognitive-type-list/cognitive-type-list.component';

@NgModule({
  imports: [
    CommonModule,
    CognitiveTypeRoutingModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [
    CognitiveTypeListComponent
  ],
  providers: [CognitiveTypeService]
})
export class CognitiveTypesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CognitiveTypesModule
    };
  }
}

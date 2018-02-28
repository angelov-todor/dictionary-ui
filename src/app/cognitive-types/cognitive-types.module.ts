import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CognitiveTypeService } from './cognitive-type.service';
import { CognitiveTypeRoutingModule } from './cognitive-type-routing.module';
import { CognitiveTypeListComponent } from './cognitive-type-list/cognitive-type-list.component';
import { CognitiveTypesListPageComponent } from './cognitive-types-list-page/cognitive-types-list-page.component';
import { CognitiveTypeAddComponent } from './cognitive-type-add/cognitive-type-add.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CognitiveTypeRoutingModule,
    ReactiveFormsModule,
    ModalModule,
    SharedModule
  ],
  declarations: [
    CognitiveTypeListComponent,
    CognitiveTypesListPageComponent,
    CognitiveTypeAddComponent
  ],
  providers: [CognitiveTypeService],
  exports: [
    CognitiveTypeListComponent
  ]
})
export class CognitiveTypesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CognitiveTypesModule
    };
  }
}

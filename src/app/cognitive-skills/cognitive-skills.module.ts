import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CognitiveSkillService } from './cognitive-skill.service';
import { CognitiveSkillRoutingModule } from './cognitive-skill-routing.module';
import { CognitiveSkillListComponent } from './cognitive-skill-list/cognitive-skill-list.component';

@NgModule({
  imports: [
    CommonModule,
    CognitiveSkillRoutingModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [
    CognitiveSkillListComponent
  ],
  providers: [CognitiveSkillService]
})
export class CognitiveSkillsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CognitiveSkillsModule
    };
  }
}

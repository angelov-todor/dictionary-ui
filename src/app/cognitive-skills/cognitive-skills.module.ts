import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CognitiveSkillService } from './cognitive-skill.service';
import { CognitiveSkillRoutingModule } from './cognitive-skill-routing.module';
import { CognitiveSkillListComponent } from './cognitive-skill-list/cognitive-skill-list.component';
import { CognitiveSkillViewComponent } from './cognitive-skill-view/cognitive-skill-view.component';
import { CognitiveSkillsRootComponent } from './cognitive-skills-root/cognitive-skills-root.component';
import { CognitiveTypesModule } from '../cognitive-types/cognitive-types.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CognitiveSkillRoutingModule,
    ReactiveFormsModule,
    ModalModule,
    CognitiveTypesModule,
    SharedModule
  ],
  declarations: [
    CognitiveSkillListComponent,
    CognitiveSkillViewComponent,
    CognitiveSkillsRootComponent
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

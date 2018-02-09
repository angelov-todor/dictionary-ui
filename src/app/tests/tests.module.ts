import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TestsService } from './tests.service';
import { TestListComponent } from './test-list/test-list.component';
import { TestsRoutingModule } from './tests-routing.module';
import { TestRootComponent } from './test-root/test-root.component';
import { TestGenerateComponent } from './test-generate/test-generate.component';
import { MethodologiesService } from './methodologies.service';
import { MethodologyAddComponent } from './methodology-add/methodology-add.component';
import { TestViewComponent } from './test-view/test-view.component';
import { UnitsModule } from '../units/units.module';
import { TestStartComponent } from './test-start/test-start.component';
import { TestResultsComponent } from './test-results/test-results.component';

@NgModule({
  imports: [
    CommonModule,
    TestsRoutingModule,
    ReactiveFormsModule,
    ModalModule,
    UnitsModule
  ],
  declarations: [
    TestRootComponent,
    TestListComponent,
    MethodologyAddComponent,
    TestGenerateComponent,
    TestViewComponent,
    TestStartComponent,
    TestResultsComponent
  ],
  providers: [TestsService, MethodologiesService]
})
export class TestsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TestsModule
    };
  }
}

import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TestsService } from './tests.service';
import { TestListComponent } from './test-list/test-list.component';
import { TestsRoutingModule } from './tests-routing.module';
import { TestRootComponent } from './test-root/test-root.component';
import { TestGenerateComponent } from './test-generate/test-generate.component';

@NgModule({
  imports: [
    CommonModule,
    TestsRoutingModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [
    TestRootComponent,
    TestListComponent,
    TestGenerateComponent
  ],
  providers: [TestsService]
})
export class TestsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TestsModule
    };
  }
}

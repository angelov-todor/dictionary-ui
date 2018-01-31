import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TestsService } from './tests.service';
import { TestListComponent } from './test-list/test-list.component';
import { TestsRoutingModule } from './tests-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TestsRoutingModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [
    TestListComponent
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

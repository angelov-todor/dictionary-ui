import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitsRoutingModule } from './units-routing.module';
import { UnitRootComponent } from './unit-root/unit-root.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitGenerateComponent } from './unit-generate/unit-generate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UnitsService } from './units.service';
import { UnitViewComponent } from './unit-view/unit-view.component';
import { ImagesModule } from '../images/images.module';
import { UnitListPageComponent } from './unit-list-page/unit-list-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UnitsRoutingModule,
    ImagesModule,
    SharedModule
  ],
  declarations: [
    UnitRootComponent,
    UnitListComponent,
    UnitGenerateComponent,
    UnitViewComponent,
    UnitListPageComponent
  ],
  exports: [
    UnitListComponent
  ]
})
export class UnitsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UnitsModule,
      providers: [UnitsService]
    };
  }
}

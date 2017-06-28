import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitsRoutingModule } from './units-routing.module';
import { UnitRootComponent } from './unit-root/unit-root.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitGenerateComponent } from './unit-generate/unit-generate.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UnitsRoutingModule
  ],
  declarations: [
    UnitRootComponent,
    UnitListComponent,
    UnitGenerateComponent
  ]
})
export class UnitsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UnitsModule,
      providers: []
    };
  }
}

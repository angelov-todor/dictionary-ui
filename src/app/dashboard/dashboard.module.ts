import { ModuleWithProviders, NgModule } from '@angular/core';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ImagesModule } from '../images/images.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    BsDropdownModule,
    CollapseModule,
    ImagesModule
  ],
  declarations: [
    SiteFooterComponent,
    SiteHeaderComponent,
    DashboardComponent,
    NotFoundPageComponent
  ],
  exports: [
    SiteHeaderComponent,
    SiteFooterComponent
  ]
})
export class DashboardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DashboardModule,
      providers: []
    };
  }
}

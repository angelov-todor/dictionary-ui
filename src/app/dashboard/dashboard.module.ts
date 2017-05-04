import {ModuleWithProviders, NgModule} from '@angular/core';
import {SiteFooterComponent} from './site-footer/site-footer.component';
import {SiteHeaderComponent} from './site-header/site-header.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        SiteFooterComponent,
        SiteHeaderComponent,
        DashboardComponent
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

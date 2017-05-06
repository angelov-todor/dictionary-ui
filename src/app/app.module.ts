import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero/hero-detail.component';
import { HeroesComponent } from './hero/heroes.component';
import { HeroService } from './hero/hero.service';
import { HeroSearchComponent } from './hero/hero-search.component';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MetadataModule } from './metadata/metadata.module';

@NgModule({
    declarations: [
        AppComponent,
        HeroDetailComponent,
        HeroesComponent,
        HeroSearchComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        AuthModule.forRoot(),
        DashboardModule.forRoot(),
        MetadataModule.forRoot()
    ],
    providers: [HeroService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

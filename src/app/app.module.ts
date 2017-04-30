import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';

import {AppRoutingModule}     from './app-routing.module';
import {HttpModule} from '@angular/http';
// import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
// import {InMemoryDataService}  from './in-memory-data.service';

import {AppComponent}         from './app.component';
import {DashboardComponent}   from './dashboard/dashboard.component';
import {HeroDetailComponent}  from './hero/hero-detail.component';
import {HeroesComponent}      from './hero/heroes.component';
import {HeroService}          from './hero/hero.service';
import {HeroSearchComponent} from './hero/hero-search.component';
import {AuthModule} from './auth/auth.module';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        // InMemoryWebApiModule.forRoot(InMemoryDataService),
        AppRoutingModule,
        AuthModule.forRoot()
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroDetailComponent,
        HeroesComponent,
        HeroSearchComponent
    ],
    providers: [HeroService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero/hero-detail.component';
import { HeroesComponent } from './hero/heroes.component';
import { HeroService } from './hero/hero.service';
import { HeroSearchComponent } from './hero/hero-search.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AuthModule.forRoot()
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }

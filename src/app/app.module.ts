import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MetadataModule } from './metadata/metadata.module';
import { ImagesModule } from './images/images.module';
import { WordsModule } from './words/words.module';
import { BsDropdownModule } from 'ngx-bootstrap';
import { UnitsModule } from './units/units.module';
import { ToolsModule } from './tools/tools.module';
import { CognitiveTypesModule } from './cognitive-types/cognitive-types.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    AuthModule.forRoot(),
    MetadataModule.forRoot(),
    ImagesModule.forRoot(),
    WordsModule.forRoot(),
    UnitsModule.forRoot(),
    ToolsModule.forRoot(),
    CognitiveTypesModule.forRoot(),
    //  should be last in order to catch not found
    DashboardModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

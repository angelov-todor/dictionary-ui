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
import { TestsModule } from './tests/tests.module';
import { CognitiveSkillsModule } from './cognitive-skills/cognitive-skills.module';
import { UsersModule } from './users/users.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalizedMessagesComponent } from './shared/localized-messages/localized-messages.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LocalizedMessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    AuthModule.forRoot(),
    SharedModule.forRoot(),
    MetadataModule.forRoot(),
    ImagesModule.forRoot(),
    WordsModule.forRoot(),
    UnitsModule.forRoot(),
    ToolsModule.forRoot(),
    CognitiveTypesModule.forRoot(),
    CognitiveSkillsModule.forRoot(),
    TestsModule.forRoot(),
    UsersModule.forRoot(),
    ToastrModule.forRoot(),
    //  should be last in order to catch not found
    DashboardModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

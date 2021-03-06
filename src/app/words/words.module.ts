import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsRootComponent } from './words-root/words-root.component';
import { WordsListComponent } from './words-list/words-list.component';
import { WordsRoutingModule } from './words-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WordsService } from './words.service';
import { WordViewComponent } from './word-view/word-view.component';
import { ModalModule } from 'ngx-bootstrap';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { DictionaryService } from './dictionary.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    WordsRoutingModule,
    ReactiveFormsModule,
    ModalModule,
    SharedModule
  ],
  declarations: [
    WordsRootComponent,
    WordsListComponent,
    WordViewComponent,
    DictionaryComponent
  ],
  providers: [WordsService, DictionaryService]
})
export class WordsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WordsModule
    };
  }
}

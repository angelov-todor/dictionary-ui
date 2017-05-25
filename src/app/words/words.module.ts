import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsRootComponent } from './words-root/words-root.component';
import { WordsListComponent } from './words-list/words-list.component';
import { WordsRoutingModule } from './words-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WordsService } from './words.service';
import { WordViewComponent } from './word-view/word-view.component';
import { ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    WordsRoutingModule,
    ReactiveFormsModule,
    ModalModule
  ],
  declarations: [
    WordsRootComponent,
    WordsListComponent,
    WordViewComponent,
  ],
  providers: [WordsService]
})
export class WordsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WordsModule
    };
  }
}

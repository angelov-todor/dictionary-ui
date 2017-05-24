import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordsRootComponent } from './words-root/words-root.component';
import { WordsListComponent } from './words-list/words-list.component';
import { WordsRoutingModule } from './words-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WordsService } from './words.service';

@NgModule({
  imports: [
    CommonModule,
    WordsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    WordsRootComponent,
    WordsListComponent
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

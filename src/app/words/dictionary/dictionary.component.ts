import { Component, OnDestroy, OnInit } from '@angular/core';
import { DictionaryService, DictionaryWord } from '../dictionary.service';
import { PartialCollectionView } from '../words.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit, OnDestroy {

  words: DictionaryWord[];
  collectionView: PartialCollectionView;

  private nameFilter = new Subject<string>();
  private subscription: Subscription;

  constructor(private dictionaryService: DictionaryService) {
  }

  ngOnInit() {
    this.dictionaryService.getDictionary().subscribe(
      (dictionaryResponse) => {
        this.words = dictionaryResponse.words;
        this.collectionView = dictionaryResponse.view;
      }
    );
    this.subscription = this.nameFilter
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.dictionaryService.filterByName(term)
        : this.dictionaryService.getDictionary()
      )
      .catch((error, caught) => {
        return caught;
      })
      .subscribe(
        (dictionaryResponse) => {
          this.words = dictionaryResponse.words;
          this.collectionView = dictionaryResponse.view;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription = null;
  }

  setPage(page: number) {
    this.dictionaryService.getDictionary(page).subscribe(
      (dictionaryResponse) => {
        this.words = dictionaryResponse.words;
        this.collectionView = dictionaryResponse.view;
      }
    );
  }

  filterByName(term: string): void {
    this.nameFilter.next(term);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { PartialCollectionView, Word, WordsService } from '../words.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss']
})
export class WordsListComponent implements OnInit, OnDestroy {

  private nameFilter = new Subject<string>();
  private wordsSubscription: Subscription;
  words: Word[];
  collectionView: PartialCollectionView;
  selectedWord: Word = null;

  constructor(private wordsService: WordsService) {
  }

  ngOnInit() {
    this.wordsService.getWords().subscribe(
      (wordsResponse) => {
        this.words = wordsResponse.words;
        this.collectionView = wordsResponse.view;
      }
    );
    this.wordsSubscription = this.nameFilter
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.wordsService.filterByName(term)
        : this.wordsService.getWords()
      )
      .catch((error, caught) => {
        return caught;
      })
      .subscribe(
        (wordsResponse) => {
          this.words = wordsResponse.words;
          this.collectionView = wordsResponse.view;
        }
      );
  }

  ngOnDestroy(): void {
    this.wordsSubscription.unsubscribe();
    this.wordsSubscription = null;
  }

  showWord(word: Word): void {
    this.selectedWord = word;
  }

  setPage(page: number) {
    this.wordsService.getWords(page).subscribe(
      (wordsResponse) => {
        this.words = wordsResponse.words;
        this.collectionView = wordsResponse.view;
      }
    );
  }

  filterByName(term: string): void {
    this.nameFilter.next(term);
  }

}

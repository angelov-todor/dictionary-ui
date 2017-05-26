import { Component, OnInit } from '@angular/core';
import { PartialCollectionView, Word, WordsService } from '../words.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss']
})
export class WordsListComponent implements OnInit {

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
  }

  showWord(word: Word): void {
    this.selectedWord = word;
  }

  setPage(page: string) {
    this.wordsService.getWords(page).subscribe(
      (wordsResponse) => {
        this.words = wordsResponse.words;
        this.collectionView = wordsResponse.view;
      }
    );
  }

  filterByName(term: string): void {

  }

}

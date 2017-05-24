import { Component, OnInit } from '@angular/core';
import { Word, WordsService } from '../words.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss']
})
export class WordsListComponent implements OnInit {

  words: Word[];

  constructor(private wordsService: WordsService) {
  }

  ngOnInit() {
    this.wordsService.getWords().subscribe(
      (wordsResponse) => {
        this.words = wordsResponse;
      }
    );
  }

  showWord(word: Word): void {
    console.log(word);
  }

}

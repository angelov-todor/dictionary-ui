import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Word, WordsService } from '../words.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-word-view',
  templateUrl: './word-view.component.html',
  styleUrls: ['./word-view.component.scss']
})
export class WordViewComponent implements OnInit {

  @ViewChild('wordViewModal') public wordViewModal: ModalDirective;

  @Output()
  onCompleted = new EventEmitter<false>();

  @Input()
  get word() {
    return this._word;
  }

  set word(value: Word | null) {
    this._word = value;
    if (value) {
      this.onViewWordModalOpen();
    } else {
      this.wordViewModal.hide();
    }
  }

  private currentWord: Word;

  protected _word: Word;

  constructor(private wordsService: WordsService) {
  }

  ngOnInit() {
  }

  onViewWordModalOpen(): void {
    this.wordsService.getWord(this.word.id)
      .subscribe((word) => {
        this.currentWord = word;
        this.wordViewModal.show();
      });
  }

  onClose(): void {
    this.wordViewModal.hide();
  }

  onHide(): void {
    this.currentWord = null;
    this.onCompleted.emit(false);
  }
}

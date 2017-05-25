import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Word } from '../words.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-word-view',
  templateUrl: './word-view.component.html',
  styleUrls: ['./word-view.component.scss']
})
export class WordViewComponent implements OnInit {

  @Input()
  get word() {
    return this._word;
  }

  set word(value: Word | null) {
    this._word = value;
    if (value) {
      this.onNewPriceModalOpen();
    } else {
      this.wordViewModal.hide();
    }
  }

  protected _word: Word;

  @ViewChild('wordViewModal') wordViewModal: ModalDirective;

  @Output()
  onCompleted = new EventEmitter<false>();

  constructor() {
  }

  ngOnInit() {
  }

  onNewPriceModalOpen() {
    this.wordViewModal.show();
  }

  handleClose() {
    this.wordViewModal.hide();
    this.onCompleted.emit(false);
  }
}

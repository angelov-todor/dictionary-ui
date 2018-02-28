import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PartialCollectionView } from '../../words/words.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {

  @Output()
  onPageChanged = new EventEmitter();

  @Input()
  collectionView: PartialCollectionView;

  setPage(page) {
    this.onPageChanged.emit(page);
  }
}

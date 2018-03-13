import { Component, OnInit } from '@angular/core';
import { Test, TestsService } from '../tests.service';
import { PartialCollectionView } from '../../words/words.service';
import { Acl } from '../../shared/utils/acl';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {

  tests: Test[];
  collectionView: PartialCollectionView;

  constructor(private testsService: TestsService, public acl: Acl) {
  }

  ngOnInit() {
    this.getTests();
  }

  getTests(page?: number): void {
    this.testsService.getTestsList(page)
      .subscribe(
        (testsResponse) => {
          this.tests = testsResponse.tests;
          this.collectionView = testsResponse.view;
        }
      );
  }

  remove(test: Test): void {
    this.testsService
      .remove(test.id)
      .subscribe(
        () => {
          this.tests = this.tests.filter(h => h !== test);
        },
        (error) => console.log(error)
      );
  }

  setPage(page: number) {
    this.getTests(page);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Result, Test, TestsService } from '../tests.service';
import { PartialCollectionView } from '../../words/words.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit {

  id;
  test: Test;
  results: Result[];
  collectionView: PartialCollectionView;
  filterForm: FormGroup;

  constructor(private testsService: TestsService,
              private route: ActivatedRoute,
              fb: FormBuilder) {
    this.filterForm = fb.group({
      user: [''],
      unit: ['']
    });
  }

  ngOnInit() {
    this.route.params
      .map(({id}) => ({id}))
      .do(({id}) => this.id = id)
      .subscribe();

    this.testsService.getTest(this.id)
      .subscribe((test: Test) => {
          this.test = test;
        }
      );
    this.getResults();

    this.filterForm.valueChanges
      .debounceTime(600)
      .subscribe((p) => {
        this.getResults(null, p);
      });
  }

  getResults(page?: string, params?: { user, unit }) {
    console.log(params);
    this.testsService.getTestResults(this.id, page, params)
      .subscribe((results) => {
        this.results = results.results;
        this.collectionView = results.view;
      });
  }

  setPage(page: string) {
    this.getResults(page);
  }

  onSubmit() {

  }

}

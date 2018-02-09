import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer, Test, TestsService } from '../tests.service';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit {

  test: Test;
  results: Answer[];
  constructor(private testsService: TestsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .map(({id}) => ({id}))
      .switchMap(({id}) => this.testsService.getTest(id))
      .subscribe((test: Test) => {
          this.test = test;
        }
      );

    this.route.params
      .map(({id}) => ({id}))
      .switchMap(({id}) => this.testsService.getTestResults(id))
      .subscribe((results) => {
          this.results = results;
          console.log(this.results);
        }
      );
  }

}

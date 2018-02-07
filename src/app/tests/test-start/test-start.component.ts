import { Component, OnInit } from '@angular/core';
import { Test, TestsService } from '../tests.service';
import { ActivatedRoute } from '@angular/router';
import { Unit, UnitImage } from '../../units/units.service';

@Component({
  selector: 'app-test-start',
  templateUrl: './test-start.component.html',
  styleUrls: ['./test-start.component.scss']
})
export class TestStartComponent implements OnInit {

  images;
  test: Test;
  currentUnit: Unit = null;
  currentIndex = -1;
  maxIndex: number;
  selected: UnitImage;
  answers = [];
  correct = -1;

  constructor(private testsService: TestsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .map(({id}) => ({id}))
      .switchMap(({id}) => this.testsService.getTest(id))
      .subscribe((test: Test) => {
          this.test = test;
          this.maxIndex = test.units.length - 1;
        }
      );
  }

  nextUnit() {
    this.currentIndex++;
    this.saveAnswer();
    this.changeUnit();

  }

  saveAnswer() {
    if (!this.selected) {
      // no answer selected
      return;
    }
    this.answers[this.currentUnit.id] = {
      is_correct: this.selected.is_correct,
      id: this.selected.id
    };
  }

  prevUnit() {
    this.currentIndex--;
    this.saveAnswer();
    this.changeUnit();
  }

  private changeUnit() {
    const unit = this.test.units[this.currentIndex];
    const images = [];
    let selected = null;
    for (let i = 0; i < unit.rows; i++) {
      if (!images[i]) {
        images[i] = [];
      }
      unit.unit_images.map((unitImage) => {
        if (unitImage.position.row === i) {
          images[i][unitImage.position.column] = unitImage;
        }
        if (this.answers[unit.id]) {
          if (this.answers[unit.id].id === unitImage.id) {
            selected = unitImage;
          }
        }
      });
    }

    this.images = images;
    this.currentUnit = unit;
    this.selected = selected;
  }

  changeSelected(unitImage: UnitImage): void {
    this.selected = unitImage;
  }

  finishTest() {
    this.saveAnswer();
    this.currentIndex++;
    this.currentUnit = null;
    this.selected = null;
    this.images = null;

    let correct = 0;
    for (const answer in this.answers) {
      if (this.answers.hasOwnProperty(answer)) {
        if (this.answers[answer].is_correct) {
          correct++;
        }
      }
    }
    this.correct = correct;
  }
}

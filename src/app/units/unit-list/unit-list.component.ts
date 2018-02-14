import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Unit, UnitsService } from '../units.service';
import { PartialCollectionView } from '../../words/words.service';
import { Test } from '../../tests/tests.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit, OnDestroy {
  units: Unit[];
  collectionView: PartialCollectionView;

  public hasTest$: BehaviorSubject<Test | undefined> = new BehaviorSubject(undefined);
  testSubscription: Subscription;

  @Input() set test(test) {
    this.hasTest$.next(test)
  };

  get test() {
    return this.hasTest$.value
  }

  @Output() onAssignUnit = new EventEmitter<Unit>();

  constructor(private unitsService: UnitsService) {
  }

  ngOnInit() {
    this.testSubscription = this.hasTest$.subscribe((test) => {
      if (test) {
        this.getUnits(undefined, test.id);
      } else {
        this.getUnits();
      }
    });
  }

  ngOnDestroy() {
    if (this.testSubscription) {
      this.testSubscription.unsubscribe();
      this.testSubscription = undefined;
    }
  }

  getUnits(page?: number, test_id?: string) {
    this.unitsService.getUnits(page, test_id).subscribe(
      (unitsResponse) => {
        this.units = unitsResponse.units;
        this.collectionView = unitsResponse.view;
      }
    );
  }

  removeUnit(unit: Unit) {
    this.unitsService.deleteUnit(unit).subscribe(() => this.getUnits());
  }

  assignToTest(unit: Unit) {
    this.onAssignUnit.emit(unit);
  }

  setPage(page: number) {
    this.getUnits(page);
  }
}

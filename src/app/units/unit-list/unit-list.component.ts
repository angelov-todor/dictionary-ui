import { Component, OnInit } from '@angular/core';
import { Unit, UnitsService } from '../units.service';
import { PartialCollectionView } from '../../words/words.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {
  units: Unit[];
  collectionView: PartialCollectionView;

  constructor(private unitsService: UnitsService) {
  }

  ngOnInit() {
    this.getUnits();
  }

  getUnits() {
    this.unitsService.getUnits().subscribe(
      (unitsResponse) => {
        this.units = unitsResponse.units;
        this.collectionView = unitsResponse.view;
      }
    );
  }

  removeUnit(unit: Unit) {
    this.unitsService.deleteUnit(unit).subscribe(() => this.getUnits());
  }
}

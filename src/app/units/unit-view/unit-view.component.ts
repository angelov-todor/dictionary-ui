import { Component, OnInit } from '@angular/core';
import { Unit, UnitImage, UnitsService } from '../units.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-unit-view',
  templateUrl: './unit-view.component.html',
  styleUrls: ['./unit-view.component.scss']
})
export class UnitViewComponent implements OnInit {

  unit: Unit;
  images;

  constructor(private unitsService: UnitsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.unitsService.getUnit(params.id))
      .subscribe(unit => {
          this.unit = unit;
          const images = [];
          for (let i = 0; i < unit.rows; i++) {
            if (!images[i]) {
              images[i] = [];
            }
            this.unit.unit_images.map((unitImage) => {
              if (unitImage.position.row === i) {
                images[i][unitImage.position.column] = unitImage;
              }
            });
          }
          this.images = images;
        }
      );

  }
  log(val) { console.log(val); }
}

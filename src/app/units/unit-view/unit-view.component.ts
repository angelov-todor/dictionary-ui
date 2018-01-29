import { Component, OnInit } from '@angular/core';
import { Unit, UnitImage, UnitsService } from '../units.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Image } from '../../images/images.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unit-view',
  templateUrl: './unit-view.component.html',
  styleUrls: ['./unit-view.component.scss']
})
export class UnitViewComponent implements OnInit {

  unit: Unit;
  images;
  updateForm: FormGroup;
  selected: UnitImage;

  constructor(private unitsService: UnitsService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
    this.updateForm = fb.group({
      text: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.unitsService.getUnit(params.id))
      .subscribe((unit: Unit) => {
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
          this.updateForm.reset(unit);
        }
      );
  }

  onImageSelect(image: Image) {
    if (this.selected) {
      this.selected.image = image;
      this.unitsService.updateUnitImage(this.selected, image)
        .subscribe(() => console.log('success'));
    }
  }

  changeSelected(unitImage: UnitImage): void {
    this.selected = unitImage;
  }

  onSubmit() {
    console.log(this.updateForm.value);
    console.log(this.unit);
  }
}

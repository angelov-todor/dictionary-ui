import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unit, UnitImage, UnitsService } from '../units.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '../../images/images.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CognitiveType, CognitiveTypeService } from '../../cognitive-types/cognitive-type.service';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-unit-view',
  templateUrl: './unit-view.component.html',
  styleUrls: ['./unit-view.component.scss']
})
export class UnitViewComponent implements OnInit, OnDestroy {

  unit: Unit;
  images;
  updateForm: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    text: [null, [Validators.required]],
    cognitive_type_id: [null, [Validators.required]],
    cognitive_subtype_id: [null],
    time_to_conduct: [0, [Validators.required]],
    type: [null]
  });
  selected: UnitImage;
  allCognitiveTypes: CognitiveType[];
  cognitiveTypes: CognitiveType[];
  ctSubscription: Subscription;

  get cognitiveSubTypesOfSelectedCognitiveType() {
    const selectedCognitiveType = this.updateForm.get('cognitive_type_id').value;
    return selectedCognitiveType && this.allCognitiveTypes && this.allCognitiveTypes.filter((cognitiveType) => {
      return cognitiveType.parent && cognitiveType.parent.id === selectedCognitiveType;
    });
  }

  constructor(private unitsService: UnitsService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private cognitiveTypeService: CognitiveTypeService) {
  }

  ngOnInit() {
    this.route.params
      .map(({id}) => ({id}))
      .switchMap(({id}) => this.unitsService.getUnit(id))
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
          this.updateForm.reset(this.unit);
        }
      );
    this.ctSubscription = this.cognitiveTypeService.getCognitiveTypesList()
      .switchMap(cognitiveTypesListResponse => {
        return concat(
          of(cognitiveTypesListResponse),
          ...(
            (Array.from(Array(cognitiveTypesListResponse.view.pages &&
              (cognitiveTypesListResponse.view.pages - 1)).keys()).map((i) => i + 2))
              .map((page) => this.cognitiveTypeService.getCognitiveTypesList(page))
          )
        );
      })
      .subscribe(cognitiveTypesListResponse => {
        this.allCognitiveTypes = (this.allCognitiveTypes || []).concat(
          cognitiveTypesListResponse.cognitive_types
        );
        this.cognitiveTypes = (this.cognitiveTypes || []).concat(
          cognitiveTypesListResponse.cognitive_types.filter((ct) => !ct.parent)
        );
      });
  }

  ngOnDestroy() {
    if (this.ctSubscription) {
      this.ctSubscription.unsubscribe();
      this.ctSubscription = undefined;
    }
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
    if (!this.updateForm.valid) {
      console.log(this.updateForm.value);
      return;
    }
    this.unitsService.update(this.unit, this.updateForm.value)
      .subscribe(() => true);
  }

  changeCorrect(unitImage: UnitImage, is_correct: boolean) {
    if (this.unit.type === Unit.TYPE_SELECT) {
      if (is_correct === false) {
        let hasCorrect = false;
        this.unit.unit_images.forEach((unitUnitImage) => {
          if (unitUnitImage.is_correct && unitImage.id !== unitUnitImage.id) {
            hasCorrect = true;
          }
        });
        if (!hasCorrect) {
          return;
        }
      }

      // change all others to incorrect
      this.unit.unit_images.forEach((unitUnitImage) => {
        if (unitUnitImage.is_correct) {
          this.unitsService.changeCorrect(unitUnitImage, false)
            .subscribe(() => unitUnitImage.is_correct = false);
        }
      });
      this.unitsService.changeCorrect(unitImage, is_correct)
        .subscribe(() => this.selected.is_correct = is_correct);
    }
  }
}

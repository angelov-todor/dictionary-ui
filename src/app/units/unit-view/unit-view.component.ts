import { Component, OnInit } from '@angular/core';
import { Unit, UnitImage, UnitsService } from '../units.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Image } from '../../images/images.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CognitiveType, CognitiveTypeService } from '../../cognitive-types/cognitive-type.service';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';

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
  allCognitiveTypes: CognitiveType[];
  cognitiveTypes: CognitiveType[];
  cognitiveSubTypes: CognitiveType[];

  constructor(private unitsService: UnitsService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private cognitiveTypeService: CognitiveTypeService) {
    this.updateForm = fb.group({
      text: [null, [Validators.required]],
      cognitive_type_id: [null, [Validators.required]],
      cognitive_subtype_id: [null],
      type: [null]
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
          this.updateForm.reset({
            cognitive_type_id: this.unit.cognitive_type.id, text: this.unit.text
          });
        }
      );
    this.cognitiveTypeService.getCognitiveTypesList()
      .switchMap(cognitiveTypesListResponse => {
        return concat(
          of(cognitiveTypesListResponse),
          ...(
            // given `page=1` is loaded, for the rest of `pagesToLoad=[2,3,4,...]`
            (Array.from(Array(cognitiveTypesListResponse.view.pages &&
              (cognitiveTypesListResponse.view.pages - 1)).keys()).map((i) => i + 2))
            // do a sequential request for each page of Properties
              .map(() => this.cognitiveTypeService.getCognitiveTypesList(cognitiveTypesListResponse.view.next))
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

    this.updateForm.get('cognitive_type_id').valueChanges.subscribe(p => {
      this.cognitiveSubTypes = (this.allCognitiveTypes || []).filter(ct => ct.parent && ct.parent.id === p);
    });
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
  }
}

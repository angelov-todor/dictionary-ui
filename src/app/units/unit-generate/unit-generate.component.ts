import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitsService } from '../units.service';
import { Router } from '@angular/router';
import { CognitiveTypeService } from '../../cognitive-types/cognitive-type.service';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { markFormControlAsTouched } from '../../shared/utils/markFormControlAsTouched';
import { CognitiveType } from '../../cognitive-types/cognitive-types.models';

@Component({
  selector: 'app-unit-generate',
  templateUrl: './unit-generate.component.html',
  styleUrls: ['./unit-generate.component.scss']
})
export class UnitGenerateComponent implements OnInit {

  generateForm: FormGroup;
  cognitiveTypes: CognitiveType[];

  constructor(fb: FormBuilder,
              private unitsService: UnitsService,
              private router: Router,
              private cognitiveTypeService: CognitiveTypeService) {
    this.generateForm = fb.group({
      name: [null, [Validators.required]],
      text: [null, [Validators.required]],
      rows: [0],
      cols: [0],
      type: ['select', [Validators.required]],
      criteria: [null],
      time_to_conduct: [0, Validators.required],
      cognitive_type_id: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.cognitiveTypeService.getCognitiveTypesList()
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
        this.cognitiveTypes = (this.cognitiveTypes || []).concat(
          cognitiveTypesListResponse.cognitive_types.filter((ct) => !ct.parent)
        );
      });
  }

  onSubmit() {
    markFormControlAsTouched(this.generateForm);
    if (!this.generateForm.valid) {
      console.log(this.generateForm);
      return;
    }

    this.unitsService.generate(this.generateForm.value)
      .subscribe(
        (unit) => this.router.navigate(['/units/view', unit.id])
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitsService } from '../units.service';
import { Router } from '@angular/router';
import { CognitiveType, CognitiveTypeService } from '../../cognitive-types/cognitive-type.service';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';

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
      text: [null, [Validators.required]],
      rows: [null, [Validators.required]],
      cols: [null, [Validators.required]],
      incorrect: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      criteria: [null, [Validators.required]],
      cognitive_type: [null, Validators.required]
    });
  }

  ngOnInit() {
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
        this.cognitiveTypes = (this.cognitiveTypes || []).concat(
          cognitiveTypesListResponse.cognitive_types.filter((ct) => !ct.parent)
        );
      });
  }

  onSubmit() {
    this.generateForm.markAsTouched();
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

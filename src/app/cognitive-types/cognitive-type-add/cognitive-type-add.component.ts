import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CognitiveTypeService } from '../cognitive-type.service';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { CognitiveType } from '../cognitive-types.models';

@Component({
  selector: 'app-cognitive-type-add',
  templateUrl: './cognitive-type-add.component.html',
  styleUrls: ['./cognitive-type-add.component.scss']
})
export class CognitiveTypeAddComponent implements OnInit, OnDestroy {

  createForm: FormGroup;
  allCognitiveTypes: CognitiveType[];
  ctSubscription: Subscription;

  constructor(private cognitiveTypeService: CognitiveTypeService,
              fb: FormBuilder) {
    this.createForm = fb.group({
      name: [null, [Validators.required]],
      parent: [null]
    });
  }

  ngOnInit() {
    this.getAllCognitiveTypes();
  }

  ngOnDestroy() {
    if (this.ctSubscription) {
      this.ctSubscription.unsubscribe();
      this.ctSubscription = undefined;
    }
  }

  getAllCognitiveTypes() {
    this.ctSubscription = this.cognitiveTypeService.getCognitiveTypesList()
      .switchMap(cognitiveTypesListResponse => {
        return concat(
          of(cognitiveTypesListResponse),
          ...(
            (Array.from(
                Array(cognitiveTypesListResponse.view.pages &&
                  (cognitiveTypesListResponse.view.pages - 1)
                ).keys()
              ).map((i) => i + 2)
            ).map((page) => this.cognitiveTypeService.getCognitiveTypesList(page))
          )
        );
      })
      .subscribe(cognitiveTypesListResponse => {
        this.allCognitiveTypes = (this.allCognitiveTypes || []).concat(
          cognitiveTypesListResponse.cognitive_types.filter((ct) => !ct.parent)
        );
      });
  }

  onSubmit() {
    this.createForm.markAsTouched();
    if (!this.createForm.valid) {
      return;
    }
    this.cognitiveTypeService.create(this.createForm.value)
      .subscribe(() => {
        this.createForm.reset();
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CognitiveType, CognitiveTypeService } from '../cognitive-type.service';
import { PartialCollectionView } from '../../words/words.service';

@Component({
  selector: 'app-cognitive-type-list',
  templateUrl: './cognitive-type-list.component.html',
  styleUrls: ['./cognitive-type-list.component.scss']
})
export class CognitiveTypeListComponent implements OnInit {

  selectedCognitiveType: CognitiveType = null;
  cognitiveTypes: CognitiveType[];
  allCognitiveTypes: CognitiveType[];
  createForm: FormGroup;
  collectionView: PartialCollectionView;

  constructor(private cognitiveTypeService: CognitiveTypeService,
              private fb: FormBuilder) {
    this.createForm = fb.group({
      name: [null, [Validators.required]],
      parent: [null]
    });
  }

  ngOnInit(): void {
    this.getCognitiveTypes();
    this.getAllCognitiveTypes();
  }

  getCognitiveTypes(page?: string): void {
    this.cognitiveTypeService.getCognitiveTypesList(page)
      .subscribe(
        (cognitiveTypesListResponse) => {
          this.cognitiveTypes = cognitiveTypesListResponse.cognitive_types;
          this.collectionView = cognitiveTypesListResponse.view;
        }
      );
  }

  getAllCognitiveTypes() {
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

  remove(cognitiveType: CognitiveType): void {
    this.cognitiveTypeService
      .remove(cognitiveType.id)
      .subscribe(
        () => {
          this.cognitiveTypes = this.cognitiveTypes.filter(h => h !== cognitiveType);
        },
        (error) => console.log(error)
      );
  }


  edit(cognitiveType: CognitiveType): void {
    this.selectedCognitiveType = cognitiveType;
  }

  setPage(page: string) {
    this.getCognitiveTypes(page);
  }
}

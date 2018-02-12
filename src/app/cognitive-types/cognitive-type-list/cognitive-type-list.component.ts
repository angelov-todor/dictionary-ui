import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CognitiveType, CognitiveTypeService } from '../cognitive-type.service';
import { PartialCollectionView } from '../../words/words.service';
import { CognitiveSkill } from '../../cognitive-skills/cognitive-skill.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cognitive-type-list',
  templateUrl: './cognitive-type-list.component.html',
  styleUrls: ['./cognitive-type-list.component.scss']
})
export class CognitiveTypeListComponent implements OnInit, OnDestroy {

  cognitiveTypes: CognitiveType[];
  collectionView: PartialCollectionView;
  ctSubscription: Subscription;
  @Input() cognitiveSkill: CognitiveSkill;
  @Output() onAssignToCognitiveSkill = new EventEmitter<CognitiveType>();

  constructor(private cognitiveTypeService: CognitiveTypeService) {
  }

  ngOnInit(): void {
    this.getCognitiveTypes();
  }

  getCognitiveTypes(page?: number): void {
    this.ctSubscription = this.cognitiveTypeService.getCognitiveTypesList(page)
      .subscribe(
        (cognitiveTypesListResponse) => {
          this.cognitiveTypes = cognitiveTypesListResponse.cognitive_types;
          this.collectionView = cognitiveTypesListResponse.view;
        }
      );
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

  assignToTest(cognitiveType: CognitiveType) {
    this.onAssignToCognitiveSkill.emit(cognitiveType);
  }

  setPage(page: number) {
    this.getCognitiveTypes(page);
  }

  ngOnDestroy() {
    if (this.ctSubscription) {
      this.ctSubscription.unsubscribe();
      this.ctSubscription = undefined;
    }
  }
}

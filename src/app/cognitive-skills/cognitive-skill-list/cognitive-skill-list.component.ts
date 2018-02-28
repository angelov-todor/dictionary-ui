import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CognitiveSkill, CognitiveSkillService } from '../cognitive-skill.service';
import { PartialCollectionView } from '../../words/words.service';

@Component({
  selector: 'app-cognitive-skill-list',
  templateUrl: './cognitive-skill-list.component.html',
  styleUrls: ['./cognitive-skill-list.component.scss']
})
export class CognitiveSkillListComponent implements OnInit {

  cognitiveSkills: CognitiveSkill[];
  createForm: FormGroup;
  collectionView: PartialCollectionView;

  constructor(private cognitiveSkillService: CognitiveSkillService,
              private fb: FormBuilder) {
    this.createForm = fb.group({
      name: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getCognitiveSkills();
  }

  getCognitiveSkills(page?: number): void {
    this.cognitiveSkillService.getCognitiveSkillsList(page)
      .subscribe(
        (cognitiveSkillsListResponse) => {
          this.cognitiveSkills = cognitiveSkillsListResponse.cognitive_skills;
          this.collectionView = cognitiveSkillsListResponse.view;
        }
      );
  }

  onSubmit() {
    this.createForm.markAsTouched();
    if (!this.createForm.valid) {
      return;
    }
    this.cognitiveSkillService.create(this.createForm.value)
      .subscribe(() => {
        this.createForm.reset();
        this.getCognitiveSkills();
      });
  }

  remove(cognitiveSkill: CognitiveSkill): void {
    this.cognitiveSkillService
      .remove(cognitiveSkill.id)
      .subscribe(
        () => {
          this.cognitiveSkills = this.cognitiveSkills.filter(h => h !== cognitiveSkill);
        },
        (error) => console.log(error)
      );
  }

  setPage(page: number) {
    this.getCognitiveSkills(page);
  }
}

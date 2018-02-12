import { Component, OnInit } from '@angular/core';
import { CognitiveSkill, CognitiveSkillService } from '../cognitive-skill.service';
import { Test } from '../../tests/tests.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CognitiveType } from '../../cognitive-types/cognitive-type.service';

@Component({
  selector: 'app-cognitive-skill-view',
  templateUrl: './cognitive-skill-view.component.html',
  styleUrls: ['./cognitive-skill-view.component.scss']
})
export class CognitiveSkillViewComponent implements OnInit {

  cognitiveSkill: CognitiveSkill;
  editForm: FormGroup;

  constructor(private cognitiveSkillsService: CognitiveSkillService,
              private route: ActivatedRoute,
              fb: FormBuilder) {
    this.editForm = fb.group({
      id: [null, [Validators.required]],
      name: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.params
      .map(({id}) => ({id}))
      .switchMap(({id}) => this.cognitiveSkillsService.getCognitiveSkill(id))
      .subscribe((cognitiveSkill: CognitiveSkill) => {
          this.cognitiveSkill = cognitiveSkill;
          this.editForm.reset(this.cognitiveSkill);
        }
      );
  }

  assignCognitiveType(cognitiveType: CognitiveType) {
    this.cognitiveSkillsService.assignCognitiveType(this.cognitiveSkill, cognitiveType)
      .subscribe(cognitiveSkill => this.cognitiveSkill = cognitiveSkill);
  }

  removeFromCognitiveSkill(cognitiveType: CognitiveType) {
    this.cognitiveSkillsService.removeCognitiveType(this.cognitiveSkill, cognitiveType)
      .subscribe(() =>
        this.cognitiveSkill.cognitive_types.splice(this.cognitiveSkill.cognitive_types.indexOf(cognitiveType), 1)
      );
  }

  onSubmit() {
    this.editForm.markAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    this.cognitiveSkillsService.update(this.editForm.value)
      .subscribe(() => true);
  }
}

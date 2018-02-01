import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CognitiveSkill, CognitiveSkillService } from '../../cognitive-skills/cognitive-skill.service';
import { MethodologiesService, Methodology } from '../methodologies.service';

@Component({
  selector: 'app-test-generate',
  templateUrl: './test-generate.component.html',
  styleUrls: ['./test-generate.component.scss']
})
export class TestGenerateComponent implements OnInit {

  generateForm: FormGroup;
  cognitiveSkills: CognitiveSkill[];
  methodologies: Methodology[];
  newMethodology: Methodology;

  constructor(fb: FormBuilder,
              private cognitiveSkillService: CognitiveSkillService,
              private methodologiesService: MethodologiesService) {
    this.generateForm = fb.group({
      name: [null, [Validators.required]],
      cognitive_skill_id: [null, [Validators.required]],
      methodology_id: [null],
      min_age: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      max_age: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      points_required: [null, [Validators.required]],
      grading_scale: [null, Validators.required],
      time_to_conduct: [null, Validators.required],
      notes: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.cognitiveSkillService.getCognitiveSkillsList()
      .subscribe(
        (cognitiveSkillsListResponse) => {
          this.cognitiveSkills = cognitiveSkillsListResponse.cognitive_skills;
        }
      );

    this.methodologiesService.getMethodologiesList()
      .subscribe(
        (methodologiesListResponse) => {
          this.methodologies = methodologiesListResponse.methodologies;
        }
      );
  }

  onSubmit() {
    console.log('submit');
  }

  onMethodologyCreateCompleted(createdMethodology: Methodology | false) {
    if (createdMethodology) {
      this.methodologies.push(createdMethodology);
    }
    this.newMethodology = null;
  }

  onMethodologyCreate(e: Event) {
    e.preventDefault();
    this.newMethodology = new Methodology({name: 'no name'});
  }
}

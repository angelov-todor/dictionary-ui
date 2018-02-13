import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CognitiveSkill, CognitiveSkillService } from '../../cognitive-skills/cognitive-skill.service';
import { MethodologiesService, Methodology } from '../methodologies.service';
import { TestsService } from '../tests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-generate',
  templateUrl: './test-generate.component.html',
  styleUrls: ['./test-generate.component.scss']
})
export class TestGenerateComponent implements OnInit {

  generateForm: FormGroup;
  cognitiveSkills: CognitiveSkill[];

  get methodologies() {
    return this._methodologies;
  }

  _methodologies: Methodology[];
  newMethodology: Methodology = null;

  constructor(fb: FormBuilder,
              private cognitiveSkillService: CognitiveSkillService,
              private methodologiesService: MethodologiesService,
              private testsService: TestsService,
              private router: Router) {
    this.generateForm = fb.group({
      name: [null, [Validators.required]],
      cognitive_skill_id: [null, [Validators.required]],
      methodology_id: [null],
      min_age: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      max_age: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      points_required: [null, [Validators.required]],
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
          this._methodologies = methodologiesListResponse.methodologies;
        }
      );
  }

  onSubmit() {
    this.generateForm.markAsTouched({onlySelf: false});
    if (!this.generateForm.valid) {
      return;
    }
    this.testsService.create(this.generateForm.value).subscribe((test) => {
      this.router.navigate(['/tests/view', test.id]);
    });
  }

  onMethodologyCreateCompleted(createdMethodology: Methodology | false) {
    if (createdMethodology) {
      this.methodologies.push(createdMethodology);
    }
    this.newMethodology = null;
  }

  onMethodologyCreate(e: Event) {
    e.preventDefault();
    this.newMethodology = new Methodology();
  }
}

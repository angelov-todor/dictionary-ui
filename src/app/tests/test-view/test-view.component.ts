import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MethodologiesService, Methodology } from '../methodologies.service';
import { CognitiveSkill, CognitiveSkillService } from '../../cognitive-skills/cognitive-skill.service';
import { Test, TestsService } from '../tests.service';
import { Unit } from '../../units/units.service';

@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.scss']
})
export class TestViewComponent implements OnInit {
  testForm: FormGroup;
  cognitiveSkills: CognitiveSkill[];

  test: Test;

  get methodologies() {
    return this._methodologies;
  }

  _methodologies: Methodology[];
  newMethodology: Methodology = null;

  constructor(fb: FormBuilder,
              private cognitiveSkillService: CognitiveSkillService,
              private methodologiesService: MethodologiesService,
              private testsService: TestsService,
              private router: Router,
              private route: ActivatedRoute) {
    this.testForm = fb.group({
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
    this.route.params
      .map(({id}) => ({id}))
      .switchMap(({id}) => this.testsService.getTest(id))
      .subscribe((test: Test) => {
          this.test = test;
          this.testForm.reset(test);
        }
      );
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
    this.testsService.update(this.test, this.testForm.value)
      .subscribe(
        () => true
      );
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

  assignUnit(unit: Unit) {
    this.testsService.assignUnit(this.test, unit)
      .subscribe(test => this.test = test);
  }

  get units_time_to_conduct() {
    let sum = 0;
    if (this.test) {
      this.test.units.forEach((unit) => {
        if (unit.time_to_conduct) {
          sum += unit.time_to_conduct
        }
      });
    }
    return sum;
  }

  removeFromTest(unit: Unit) {
    this.testsService.removeUnit(this.test, unit)
      .subscribe(test => this.test = test);
  }

}

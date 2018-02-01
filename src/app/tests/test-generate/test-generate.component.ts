import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-generate',
  templateUrl: './test-generate.component.html',
  styleUrls: ['./test-generate.component.scss']
})
export class TestGenerateComponent implements OnInit {

  generateForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.generateForm = fb.group({
      name: [null, [Validators.required]],
      cognitive_skill_id: [null, [Validators.required]],
      methodology: [null, [Validators.required]],
      min_age: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      max_age: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      points_required: [null, [Validators.required]],
      grading_scale: [null, Validators.required],
      time_to_conduct: [null, Validators.required],
      notes: [null, Validators.required]
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    console.log('submit');
  }

}

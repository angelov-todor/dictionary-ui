import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unit-generate',
  templateUrl: './unit-generate.component.html',
  styleUrls: ['./unit-generate.component.scss']
})
export class UnitGenerateComponent implements OnInit {

  generateForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.generateForm = fb.group({
      imagesCount: [null, [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
  }

}

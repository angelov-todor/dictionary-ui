import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitsService } from '../units.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unit-generate',
  templateUrl: './unit-generate.component.html',
  styleUrls: ['./unit-generate.component.scss']
})
export class UnitGenerateComponent implements OnInit {

  generateForm: FormGroup;

  constructor(fb: FormBuilder, private unitsService: UnitsService, private router: Router) {
    this.generateForm = fb.group({
      text: [null, [Validators.required]],
      rows: [null, [Validators.required]],
      cols: [null, [Validators.required]],
      criteria: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.unitsService.generate(this.generateForm.value)
      .subscribe(
        (unit) => this.router.navigate(['/units/view', unit.id])
      );
  }
}

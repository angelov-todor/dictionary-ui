import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../tools.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  result: any;

  commonForm: FormGroup = this.fb.group({
    word: [null, [Validators.required]],
    algorithm: ['rhymes', [Validators.required]]
  });

  constructor(private toolsService: ToolsService,
              private fb: FormBuilder) {
  }

  ngOnInit() {

  }

  showOutput() {
    this.commonForm.markAsTouched();
    if (!this.commonForm.valid) {
      return;
    }
    this.toolsService.getOutput(this.commonForm.value.word, this.commonForm.value.algorithm)
      .subscribe((res) => {
        if (res instanceof Array) {
          let result = '';
          res.forEach((w) => result = result + w.normalized + ', ');
          this.result = result.trim();
        } else {
          this.result = res;
        }
      });
  }
}

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MethodologiesService, Methodology } from '../methodologies.service';

@Component({
  selector: 'app-methodology-add',
  templateUrl: './methodology-add.component.html',
  styleUrls: ['./methodology-add.component.scss']
})
export class MethodologyAddComponent implements OnInit {

  @ViewChild('mViewModal') public methodologyViewModal: ModalDirective;

  @Output()
  onCompleted = new EventEmitter<Methodology | false>();

  @Input()
  get methodology() {
    return this._methodology;
  }

  set methodology(value: Methodology | null) {
    this._methodology = value;
    if (value) {
      this.methodologyViewModal.show();
    } else {
      this.methodologyViewModal.hide();
    }
  }

  addForm: FormGroup;
  protected _methodology: Methodology;

  constructor(private fb: FormBuilder,
              private methodologiesService: MethodologiesService) {
    this.addForm = fb.group({
      name: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.addForm.markAsTouched();
    if (!this.addForm.valid) {
      console.log(this.addForm);
      return;
    }
    this.methodologiesService.create(this.addForm.value)
      .subscribe((methodology) => {
        this.onCompleted.emit(methodology);
        this.methodologyViewModal.hide();
      });
  }

  onClose(): void {
    this.methodologyViewModal.hide();
  }

  onHide(): void {
    this.onCompleted.emit(false);
  }
}

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Metadata, MetadataService, MetadataTypes } from '../metadata.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { markFormControlAsTouched } from '../../shared/utils/markFormControlAsTouched';

@Component({
  selector: 'app-metadata-add',
  templateUrl: './metadata-add.component.html',
  styleUrls: ['./metadata-add.component.scss']
})
export class MetadataAddComponent {

  @ViewChild('modal') public wordViewModal: ModalDirective;

  @Output()
  onCompleted = new EventEmitter<Metadata | false>();

  @Input()
  get metadata() {
    return this._metadata;
  }

  set metadata(value: Metadata | null) {
    this._metadata = value;
    if (value) {
      this.metadataForm.reset(this._metadata);
      this.onViewWordModalOpen();
    } else {
      this.wordViewModal.hide();
    }
  }

  public metadataForm: FormGroup;
  public types = MetadataTypes;
  protected _metadata: Metadata;

  constructor(fb: FormBuilder, private metadataService: MetadataService) {
    this.metadataForm = fb.group({
      name: [null, [Validators.required]],
      type: ['text', Validators.required],
      parent_id: [null],
      values: [null]
    });
  }

  onSubmit() {
    markFormControlAsTouched(this.metadataForm);
    if (!this.metadataForm.valid) {
      console.log(this.metadataForm);
      return;
    }
    this.metadataService.create(this.metadataForm.value)
      .subscribe((metadata) => this.onCompleted.emit(metadata));
  }

  onViewWordModalOpen(): void {
    this.wordViewModal.show();
  }

  onClose(): void {
    this.wordViewModal.hide();
  }

  onHide(): void {
    this.onCompleted.emit(false);
  }
}

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Metadata, MetadataTypes } from '../metadata.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-metadata-edit',
  templateUrl: './metadata-edit.component.html',
  styleUrls: ['./metadata-edit.component.scss']
})
export class MetadataEditComponent implements OnInit {

  @ViewChild('wordViewModal') public wordViewModal: ModalDirective;

  @Output()
  onCompleted = new EventEmitter<false>();

  @Input()
  get metadata() {
    return this._metadata;
  }

  set metadata(value: Metadata | null) {
    this._metadata = value;
    if (value) {
      this.onViewWordModalOpen();
    } else {
      this.wordViewModal.hide();
    }
  }

  editForm: FormGroup;
  public types = MetadataTypes;
  public currentMetadata: Metadata;
  metadataList: Metadata[];
  protected _metadata: Metadata;

  constructor(private fb: FormBuilder) {
    this.editForm = fb.group({
      name: [null, [Validators.required]],
      type: ['text', Validators.required],
      parent: [null]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.editForm.markAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    // this.metadataService.create(this.editForm.value)
    //   .subscribe((metadata) => this.metadata.push(metadata));
  }

  onViewWordModalOpen(): void {
    this.wordViewModal.show();
  }

  onClose(): void {
    this.wordViewModal.hide();
  }

  onHide(): void {
    this.currentMetadata = null;
    this.onCompleted.emit(false);
  }
}

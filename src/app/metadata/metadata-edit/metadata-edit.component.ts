import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Metadata, MetadataService, MetadataTypes } from '../metadata.service';
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
      const data = {
        id: this._metadata.id,
        name: this._metadata.name,
        type: this._metadata.type,
        values: this._metadata.values
      };

      if (this._metadata.parent) {
        data['parent'] = this._metadata.parent.id;
      }

      this.editForm.reset(data);
      this.onViewWordModalOpen();
    } else {
      this.wordViewModal.hide();
    }
  }

  @Input()
  get metadataList() {
    return this._metadataList;
  }

  set metadataList(value: Metadata[] | null) {
    this._metadataList = value;
  }

  editForm: FormGroup;
  public types = MetadataTypes;
  protected _metadataList: Metadata[];
  protected _metadata: Metadata;

  constructor(private fb: FormBuilder, private metadataService: MetadataService) {
    this.editForm = fb.group({
      id: [null, Validators.required],
      name: [null, [Validators.required]],
      type: ['text', Validators.required],
      parent: [null], // TODO: fix the parent, it is an object
      values: [null]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.editForm.markAsTouched();
    if (!this.editForm.valid) {
      console.log(this.editForm);
      return;
    }
    this.metadataService.update(this.editForm.value)
      .subscribe(() => this.onCompleted.emit(false));
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

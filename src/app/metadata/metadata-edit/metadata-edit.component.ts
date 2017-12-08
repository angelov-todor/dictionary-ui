import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Metadata, MetadataTypes } from '../metadata.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operator/switchMap';

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
  /*fetchMetadata() {
    // TODO: Integrate https://valor-software.com/ngx-bootstrap/#/typeahead or similar for Properties and PropetyUnits selects
    // For now due to lack of better component e.g. https://valor-software.com/ngx-bootstrap/#/typeahead
    // we load all the pages of Properties one after the other
    this.propertiesService.getProperties()
      .pipe(
        switchMap((propertiesResponse) => {
          const paginationDefaults = {
            limit: propertiesResponse.limit
          };
          return concat(
            of(propertiesResponse),
            ...(
              // given `page=1` is loaded, for the rest of `pagesToLoad=[2,3,4,...]`
              (Array.from(Array(propertiesResponse.pages && (propertiesResponse.pages - 1)).keys()).map((i) => i + 2))
              // do a sequential request for each page of Properties
                .map((page) => this.propertiesService.getProperties({...paginationDefaults, page}))
            )
          );
        })
      )
      .subscribe((propertiesResponse) => {
        this.properties = (this.properties || []).concat(
          propertiesResponse._embedded.properties
        );
      });
  }*/

  onSubmit() {
    this.editForm.markAsTouched();
    if (!this.editForm.valid) {
      console.log('not valid');
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

import { Router } from '@angular/router';
import { Metadata, MetadataService } from '../metadata.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-metadata-list',
  templateUrl: './metadata-list.component.html',
  styleUrls: ['./metadata-list.component.scss']
})
export class MetadataListComponent implements OnInit {
  metadata: Metadata[];
  createForm: FormGroup;

  constructor(private router: Router,
              private metadataService: MetadataService,
              private fb: FormBuilder) {
    this.createForm = fb.group({
      name: [null, [Validators.required]],
      type: ['text', Validators.required]
    });
  }

  getMetadata(): void {
    this.metadataService.getMetadataList()
      .then(metadata => this.metadata = metadata);
  }

  ngOnInit(): void {
    this.getMetadata();
  }

  onSubmit() {
    this.createForm.markAsTouched();
    if (!this.createForm.valid) {
      return;
    }
    this.metadataService.create(this.createForm.value)
      .subscribe((metadata) => this.metadata.push(metadata));
  }

  delete(meta: Metadata): void {
    this.metadataService
      .delete(meta.id)
      .then(() => {
        this.metadata = this.metadata.filter(h => h !== meta);
      });
  }
}

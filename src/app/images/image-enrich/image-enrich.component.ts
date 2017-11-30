import { Component, OnInit } from '@angular/core';
import { EnrichmentResponse, ImagesService } from '../images.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagesMetadataService } from '../images-metadata.service';

@Component({
  selector: 'app-image-enrich',
  templateUrl: './image-enrich.component.html',
  styleUrls: ['./image-enrich.component.scss']
})
export class ImageEnrichComponent implements OnInit {
  metadataForm: FormGroup;
  enrichment: EnrichmentResponse;

  constructor(private imagesService: ImagesService,
              private imageMetadataSerivce: ImagesMetadataService,
              fb: FormBuilder) {
    this.metadataForm = fb.group({
      metadata: [null, [Validators.required]],
      image: [null, Validators.required],
      value: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.load();
  }

  submit(val?: any): void {
    const data = this.metadataForm.value;
    if (val !== undefined) {
      data.value = val;
    }
    this.imageMetadataSerivce.create(data)
      .subscribe(() => this.load());
  }

  private load(): void {
    this.imagesService.getEnrichment().subscribe(
      (enrichment) => {
        this.enrichment = enrichment;
        this.metadataForm.reset({
          image: enrichment.image.id,
          metadata: enrichment.metadata.id
        });
      }
    );
  }

  next(): void {
    this.load();
  }
}

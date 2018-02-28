import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Image, ImageMetadata, ImagesService } from '../images.service';
import { Metadata, MetadataService } from '../../metadata/metadata.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagesMetadataService } from '../images-metadata.service';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit, OnDestroy {
  metadataForm: FormGroup;
  id: string;
  currentImage: Image;
  allMetadata: Metadata[];
  placeholder = '';
  metadataSubscription: Subscription;

  constructor(private imagesService: ImagesService,
              private metadataService: MetadataService,
              private imageMetadataService: ImagesMetadataService,
              private route: ActivatedRoute,
              private router: Router,
              fb: FormBuilder) {

    this.metadataForm = fb.group({
      metadata: [null, [Validators.required]],
      image: [null, Validators.required],
      value: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.imagesService.getImage(+params.id))
      .subscribe(image => {
          this.currentImage = image;
          this.metadataForm.reset({image: image.id});
        }
      );

    this.metadataSubscription = this.metadataService.getMetadataList()
      .switchMap(metadataListResponse => {
        return concat(
          of(metadataListResponse),
          ...(
            (Array.from(Array(metadataListResponse.view.pages && (metadataListResponse.view.pages - 1)).keys()).map((i) => i + 2))
              .map((page) => this.metadataService.getMetadataList(page))
          )
        );
      })
      .subscribe(metadataListResponse => {
        // this.allMetadata = metadataListResponse.metadata;
        this.allMetadata = (this.allMetadata || []).concat(
          metadataListResponse.metadata
        );
      });

    this.metadataForm.get('metadata').valueChanges.subscribe(
      (metadata) => {
        this.placeholder = '';
        if (metadata) {
          this.allMetadata.forEach((meta) => {
            if (meta.id === metadata) {
              this.placeholder = meta.values;
            }
          });
        }
        console.log(this.placeholder);
      }
    );
  }

  ngOnDestroy() {
    if (this.metadataSubscription) {
      this.metadataSubscription.unsubscribe();
      this.metadataSubscription = undefined;
    }
  }

  onSubmit() {
    // this.metadataForm.markAsTouched({onlySelf: true});
    this.metadataForm.markAsTouched();
    if (!this.metadataForm.valid) {
      return;
    }
    this.imageMetadataService
      .create(this.metadataForm.value)
      .subscribe((imageMetadata) => {
        this.currentImage.image_metadata.push(imageMetadata);
        this.metadataForm.reset({});
      });
  }

  removeMetadata(image_meta: ImageMetadata): void {
    this.imageMetadataService.delete(image_meta.id)
      .subscribe(() => {
        const index = this.currentImage.image_metadata.indexOf(image_meta);
        this.currentImage.image_metadata.splice(index, 1);
      });
  }

  removeImage(): void {
    this.imagesService
      .remove(this.currentImage)
      .subscribe(() => {
        this.router.navigate(['/images']);
      });
  }
}

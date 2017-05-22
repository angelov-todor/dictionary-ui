import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Image, ImagesService } from '../images.service';
import { Metadata, MetadataService } from '../../metadata/metadata.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagesMetadataService } from '../images-metadata.service';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {
  metadataForm: FormGroup;
  id: string;
  currentImage: Image;
  allMetadata: Metadata[];

  constructor(private imagesService: ImagesService,
              private metadataService: MetadataService,
              private imageMetadataService: ImagesMetadataService,
              private route: ActivatedRoute,
              fb: FormBuilder) {

    this.metadataForm = fb.group({
      metadata: [null, [Validators.required]],
      image: [null, Validators.required],
      value: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.imagesService.getImage(+params['id']))
      .subscribe(image => {
          this.currentImage = image;
          this.metadataForm.reset({image: image['@id']});
        }
      );


    this.metadataService.getMetadataList()
      .then(metadata => this.allMetadata = metadata);
  }

  onSubmit() {
    this.metadataForm.markAsTouched({onlySelf: true});
    if (!this.metadataForm.valid) {
      console.log(this.metadataForm.value);
      console.log('not valid');
      return;
    }
    this.imageMetadataService
      .create(this.metadataForm.value)
      .subscribe(() => console.log('sent'));
  }

}

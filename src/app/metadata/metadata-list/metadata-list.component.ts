import { Metadata, MetadataListResponse, MetadataService, MetadataTypes } from '../metadata.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartialCollectionView } from '../../words/words.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-metadata-list',
  templateUrl: './metadata-list.component.html',
  styleUrls: ['./metadata-list.component.scss']
})
export class MetadataListComponent implements OnInit {

  private nameFilter = new BehaviorSubject<string>('');
  private metadataSubscription: Subscription;
  selectedMetadata: Metadata = null;
  metadata: Metadata[];
  createForm: FormGroup;
  public types = MetadataTypes;
  collectionView: PartialCollectionView;

  constructor(private metadataService: MetadataService,
              private fb: FormBuilder) {
    this.createForm = fb.group({
      name: [null, [Validators.required]],
      type: ['text', Validators.required],
      parent: [null]
    });
  }

  ngOnInit(): void {
    this.getMetadata();
    this.metadataSubscription = this.nameFilter
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.metadataService.filterByName(term)
        : this.metadataService.getMetadataList()
      ).catch((error, caught) => {
        return caught;
      })
      .subscribe(
        (metadataResponse: MetadataListResponse) => {
          console.log(metadataResponse);
          this.metadata = metadataResponse.metadata;
          this.collectionView = metadataResponse.view;
        }
      );
  }

  onSubmit() {
    this.createForm.markAsTouched();
    if (!this.createForm.valid) {
      return;
    }
    this.metadataService.create(this.createForm.value)
      .subscribe((metadata) => {
        this.nameFilter.next(this.nameFilter.value);
        this.createForm.reset();
      });
  }

  remove(meta: Metadata): void {
    this.metadataService
      .remove(meta.id)
      .do(() => {
        this.metadata = this.metadata.filter(h => h !== meta);
      });
  }

  getMetadata(page?: string): void {
    this.metadataService.getMetadataList(page).subscribe(
      (metadataListResponse) => {
        this.metadata = metadataListResponse.metadata;
        this.collectionView = metadataListResponse.view;
      }
    );
  }

  edit(metadata: Metadata): void {
    this.selectedMetadata = metadata;
  }

  setPage(page: string) {
    this.getMetadata(page);
  }

  filterByName(term: string): void {
    this.nameFilter.next(term);
  }
}



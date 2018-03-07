import { Metadata, MetadataListResponse, MetadataService, MetadataTypes } from '../metadata.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartialCollectionView } from '../../words/words.service';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-metadata-list',
  templateUrl: './metadata-list.component.html',
  styleUrls: ['./metadata-list.component.scss']
})
export class MetadataListComponent implements OnInit, OnDestroy {

  private nameFilter = new BehaviorSubject<string>('');
  private metadataSubscription: Subscription;
  selectedMetadata: Metadata = null;
  metadata: Metadata[];
  allMetadata: Metadata[];
  createForm: FormGroup;
  public types = MetadataTypes;
  collectionView: PartialCollectionView;

  constructor(private metadataService: MetadataService,
              fb: FormBuilder) {
    this.createForm = fb.group({
      name: [null, [Validators.required]],
      type: ['text', Validators.required],
      parent_id: [null],
      values: [null]
    });
  }

  ngOnInit(): void {
    this.getMetadata();
    this.getAllMetadata();
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
          this.metadata = metadataResponse.metadata;
          this.collectionView = metadataResponse.view;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.metadataSubscription) {
      this.metadataSubscription.unsubscribe();
      this.metadataSubscription = undefined;
    }
  }

  getAllMetadata() {
    this.metadataService.getMetadataList()
      .switchMap(metadataListResponse => {
        return concat(
          of(metadataListResponse),
          ...(
            // given `page=1` is loaded, for the rest of `pagesToLoad=[2,3,4,...]`
            (Array.from(Array(metadataListResponse.view.pages && (metadataListResponse.view.pages - 1)).keys()).map((i) => i + 2))
            // do a sequential request for each page of Properties
              .map((page) => this.metadataService.getMetadataList(page))
          )
        );
      })
      .subscribe(metadataListResponse => {
        this.allMetadata = (this.allMetadata || []).concat(
          metadataListResponse.metadata
        );
      });
  }

  onSubmit() {
    this.createForm.markAsTouched();
    if (!this.createForm.valid) {
      return;
    }
    this.metadataService.create(this.createForm.value)
      .subscribe(() => {
        this.nameFilter.next(this.nameFilter.value);
        this.createForm.reset();
      });
  }

  remove(meta: Metadata): void {
    this.metadataService
      .remove(meta.id)
      .subscribe(
        () => {
          this.metadata = this.metadata.filter(h => h !== meta);
        }
      );
  }

  getMetadata(page?: number): void {
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

  setPage(page: number) {
    this.getMetadata(page);
  }

  filterByName(term: string): void {
    this.nameFilter.next(term);
  }
}



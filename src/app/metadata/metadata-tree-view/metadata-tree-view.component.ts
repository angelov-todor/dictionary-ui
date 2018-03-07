import { Component, OnInit } from '@angular/core';
import { TreeNode, TreeNodeParams } from '../../shared/tree-node';
import { Metadata, MetadataService, MetadataTypes } from '../metadata.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormControlAsTouched } from '../../shared/utils/markFormControlAsTouched';

@Component({
  selector: 'app-metadata-tree-view',
  templateUrl: './metadata-tree-view.component.html',
  styleUrls: ['./metadata-tree-view.component.scss']
})
export class MetadataTreeViewComponent implements OnInit {

  public editForm: FormGroup;
  public metadata: Metadata = null;
  public child: Metadata = null;
  public types = MetadataTypes;
  public tree: TreeNode;

  constructor(private metadataService: MetadataService, fb: FormBuilder) {
    this.editForm = fb.group({
      id: [null, Validators.required],
      name: [null, [Validators.required]],
      type: ['text', Validators.required],
      parent_id: [null],
      values: ['']
    });
  }

  ngOnInit() {
    this.showTreeView();
  }

  clickNode(fileNode: TreeNode): void {
    this.metadata = null;
    if (fileNode.id) {
      this.metadataService.get(fileNode.id).subscribe((metadata) => {
        this.metadata = metadata;
        this.editForm.reset(this.metadata);
      });
    }
  }

  showTreeView() {
    this.metadataService.filterByParent(false).subscribe((metadataListResponse) => {
      this.tree = new TreeNode(<TreeNodeParams>{
        id: '',
        name: '-',
        children: metadataListResponse.metadata
      });
    });
  }

  createChild() {
    this.child = new Metadata({ parent: this.metadata, type: 'text' });
  }

  onChildAdded(): void {
    this.child = null;
    this.showTreeView();
  }

  removeMetadata() {
    this.metadataService
      .remove(this.metadata.id)
      .subscribe(() => {
        this.showTreeView();
        this.metadata = null;
      });
  }

  onSubmit() {
    markFormControlAsTouched(this.editForm);
    if (!this.editForm.valid) {
      return;
    }
    this.metadataService.update(this.editForm.value)
      .subscribe(() => true);
  }
}

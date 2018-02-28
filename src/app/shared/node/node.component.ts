import { Component } from '@angular/core';
import { Input } from '@angular/core'
import { Output } from '@angular/core'
import { EventEmitter } from '@angular/core'
import { TreeNode } from '../tree-node';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent {

  @Input() node: TreeNode;
  @Input() index: number;
  @Output() clicked: EventEmitter<TreeNode>;

  constructor() {
    this.clicked = new EventEmitter<TreeNode>();
  }

  isExpandable(): boolean {
    return this.node.isParent();
  }

  isExpanded(): boolean {
    return this.node.isExpanded()
  }

  expandFolder(): void {
    if (this.node.isExpanded()) {
      this.node.fold()
    } else {
      this.node.expand()
    }
  }

  clickNode(node: TreeNode) {
    this.clicked.emit(node)
  }

  propagate(node: TreeNode) {
    this.clicked.emit(node)
  }

}

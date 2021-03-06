import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeNode } from '../tree-node';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent {

  @Input() tree: TreeNode;
  @Input() keyboardWatch: boolean;
  @Output() onChange: EventEmitter<TreeNode>;

  private currFocusNode: TreeNode = null;

  constructor() {
    this.onChange = new EventEmitter();
    this.keyboardWatch = false;
  }

  nodeClicked(nextNode: TreeNode) {
    this.updateFocusNode(nextNode);
    this.onChange.emit(nextNode);
  }

  keydownHandler(event: KeyboardEvent) {
    if (!this.keyboardWatch) {
      return;
    }
    if (this.currFocusNode === null) {
      return;
    }

    switch (event.keyCode) {
      case 13: // Enter
        this.onChange.emit(this.currFocusNode);
        break;
      case 37: // left
        if (this.currFocusNode.isParent()
          && this.currFocusNode.isExpanded) {
          this.currFocusNode.fold();
          return;
        }
        if (!this.currFocusNode.hasParent()) {
          return;
        }
        this.updateFocusNode(this.currFocusNode.getParentNode());
        break;
      case 38: // Up
        // Move to upper item
        break;
      case 39: // Right
        if (!this.currFocusNode.isParent()) {
          return;
        }
        if (!this.currFocusNode.isExpanded) {
          this.currFocusNode.expand();
        } else if (this.currFocusNode.children.length > 0) {
          this.updateFocusNode(this.currFocusNode.children[0]);
        }
        break;
      case 40: // Down
        if (this.currFocusNode.isParent()
          && this.currFocusNode.isExpanded
          && this.currFocusNode.children.length > 0) {
          // first child
          this.updateFocusNode(this.currFocusNode.children[0]);
        } else {
          // next sibling
        }
        break;
    }
  }

  private updateFocusNode(next: TreeNode) {
    if (this.currFocusNode) {
      this.currFocusNode.blur();
    }
    this.currFocusNode = next;
    this.currFocusNode.focus();
  }

}

export interface TreeNodeParams {
  id: string
  name: string
  children?: Array<TreeNodeParams>
  focus?: boolean
}

export class TreeNode {
  public id: string;
  public name: string;
  public children: Array<TreeNode>;

  // Full file path from root node
  private filePath: string;

  // Parent Node
  private parentNode: TreeNode;

  private _isFocused: boolean;
  get isFocused(): boolean {
    return this._isFocused;
  }

  private _isExpanded: boolean;

  constructor(params: TreeNodeParams, parent: TreeNode = null) {
    this.id = params.id;
    this.name = params.name;
    this.children = [];

    // update private values
    this.parentNode = parent;
    this._isFocused = params.focus || false;

    if (parent !== null) {
      const parentPath: string = this.parentNode.getFullPath();
      if (parentPath.slice(-1) === '/') {
        this.filePath = `${parentPath}${this.name}`;
      } else {
        this.filePath = `${parentPath}/${this.name}`;
      }
    } else {
      this.filePath = this.name;
    }

    if (typeof(params.children) !== 'undefined' && params.children !== null) {
      params.children.forEach(
        (fileNodeParams) => this.children.push(new TreeNode(fileNodeParams, this))
      );
    }

    this._isExpanded = this.children.length > 0;
  }

  getFullPath(): string {
    return this.filePath;
  }

  public isParent(): boolean {
    return this.children.length > 0;
  }

  public getParentNode(): TreeNode {
    return this.parentNode
  }

  public isExpanded(): boolean {
    return this._isExpanded
  }

  public expand(): void {
    this._isExpanded = true
  }

  public fold(): void {
    this._isExpanded = false
  }

  public hasParent(): boolean {
    return this.getParentNode !== null
  }

  public focus(): void {
    this._isFocused = true
  }

  public blur(): void {
    this._isFocused = false
  }

  public stringify() {
    return JSON.stringify(this, (key: string, value: any) => {
      if (key.includes('_')) {
        return;
      }
      return value
    })
  }
}

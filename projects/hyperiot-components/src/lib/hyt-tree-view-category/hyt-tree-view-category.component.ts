import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// export namespace TreeNodeCategory {
//   export type ActiveEnum = 'TRUE' | 'FALSE' | 'PARTIAL';
//   export const TypeEnum = {
//     TRUE: 'TRUE' as ActiveEnum,
//     FALSE: 'FALSE' as ActiveEnum,
//     PARTIAL: 'PARTIAL' as ActiveEnum
//   };
// }

export interface TreeNodeCategory {
  label: string;
  data: any;
  // active: TreeNodeCategory.ActiveEnum;
  active: boolean,
  children: TreeNodeCategory[],
  parent: TreeNodeCategory
}

@Component({
  selector: 'hyt-tree-view-category',
  templateUrl: './hyt-tree-view-category.component.html',
  styleUrls: ['./hyt-tree-view-category.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HytTreeViewCategoryComponent implements OnInit {

  @Input() treeData: TreeNodeCategory[];

  @Output() cbChange = new EventEmitter<TreeNodeCategory>();

  @Output() cbAdd = new EventEmitter<TreeNodeCategory>();

  treeControl = new NestedTreeControl<TreeNodeCategory>(node => node.children);

  dataSource = new MatTreeNestedDataSource<TreeNodeCategory>();

  catForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.dataSource.data = this.treeData;
  }

  hasChild = (_: number, node: TreeNodeCategory) => !!node.children && node.children.length > 0;

  hasNoContent = (_: number, nodeData: TreeNodeCategory) => nodeData.label === '';

  checkChildren(node: TreeNodeCategory) {
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        node.children[i].active = node.active;
        this.checkChildren(node.children[i]);
      }
    }
  }

  checkParent(node: TreeNodeCategory) {
    if (node.parent) {
      node.parent.active = node.active;
      this.checkParent(node.parent);
    }
  }

  cbChanged(node: TreeNodeCategory) {
    this.checkChildren(node);
    this.checkParent(node);
    this.cbChange.emit(node);
  }

  creatingParentNode;
  creatingNode;
  creating: string = '';

  addNode(node) {
    if (this.creating != '') {
      this.cancelNode();
    }
    this.creating = 'true';
    this.catForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    let emptyNode: TreeNodeCategory = {
      label: '',
      data: {},
      active: false,
      children: [],
      parent: null
    }
    if (!node) {
      this.creating = 'root';
      this.dataSource.data.push(emptyNode);
      this.creatingNode = this.dataSource.data.find(x => x.label == '');
    }
    else {
      this.creating = '!root';
      this.creatingParentNode = node;
      this.treeControl.expand(this.creatingParentNode);
      this.creatingParentNode.children.push(emptyNode);
      this.creatingNode = this.creatingParentNode.children.find(x => x.label == '');
      this.creatingNode.parent = this.creatingParentNode;
    }
    this.triggerChange();
  }

  cancelNode() {
    if (this.creating == 'root') {
      for (let k = 0; k < this.dataSource.data.length; k++) {
        if (this.dataSource.data[k] == this.creatingNode)
          this.dataSource.data.splice(k, 1);
      }
    }
    else if (this.creating == '!root') {
      if (this.creatingNode && this.creatingNode.label == '')
        for (let k = 0; k < this.creatingParentNode.children.length; k++) {
          if (this.creatingParentNode.children[k] == this.creatingNode)
            this.creatingParentNode.children.splice(k, 1);
        }
    }

    this.triggerChange();
  }

  addCategory() {
    this.creatingNode.label = this.catForm.get('name').value;
    this.cbAdd.emit(this.creatingNode);
    this.triggerChange();
    this.creating = '';
  }

  triggerChange() {
    let data = this.dataSource.data;
    this.dataSource.data = null;
    this.dataSource.data = data;
  }

}
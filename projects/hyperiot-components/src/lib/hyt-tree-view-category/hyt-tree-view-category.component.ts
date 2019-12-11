import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnChanges } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

export interface TreeNodeCategory {
  id: number;
  label: string;
  data: any;
  active: any;
  children: TreeNodeCategory[];
  parent: TreeNodeCategory;
}

export type CategoryTreeAction = 'checked' | 'add' | 'edit' | 'delete';

export interface CategoryTreeEvent {
  action: CategoryTreeAction;
  node: TreeNodeCategory;
}
@Component({
  selector: 'hyt-tree-view-category',
  templateUrl: './hyt-tree-view-category.component.html',
  styleUrls: ['./hyt-tree-view-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HytTreeViewCategoryComponent implements OnChanges {

  @Input() treeDataFlat: TreeNodeCategory[] = [];

  @Input() mode: string;

  treeData: TreeNodeCategory[] = [];

  @Output() treeAction = new EventEmitter<CategoryTreeEvent>();

  treeControl = new NestedTreeControl<TreeNodeCategory>(node => node.children);

  dataSource = new MatTreeNestedDataSource<TreeNodeCategory>();

  constructor() { }

  ngOnChanges() {
    this.createTree();
  }

  createTree() {
    this.treeData = [];
    const lookup = {};
    this.treeDataFlat.forEach((x) => {
      lookup[x.id] = x;
      x.children = [];
    });
    this.treeDataFlat.forEach((x) => {
      if (x.parent != null) {
        lookup[x.parent.id].children.push(x);
      } else {
        this.treeData.push(x);
      }
    });
    this.dataSource.data = this.treeData;
    this.triggerChange();
  }

  hasChild = (_: number, node: TreeNodeCategory) => !!node.children && node.children.length > 0;

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
      //      node.parent.active = node.active;
      let countTrue = 0;
      let countFalse = 0;
      let countNull = 0;
      node.parent.children.forEach(children => {
        if (children.active === true) {
          countTrue++;
        } else if (children.active === false) {
          countFalse++;
        } else {
          countNull++;
        }
      });
      if ((countNull > 0) || (countTrue > 0) && (countFalse > 0)) {
        node.parent.active = null;
      } else if (countTrue > 0) {
        node.parent.active = true;
      } else {
        node.parent.active = false;
      }
      this.checkParent(node.parent);
    }
  }

  updateCheckStatus() {
    this.treeDataFlat
      .filter(y => y.active)
      .forEach(el => {
        this.checkRelatives(el);
      });
  }

  cbChanged(node: TreeNodeCategory) {
    if (node.active == null) {
      node.active = true;
    }
    this.checkRelatives(node);
    this.treeAction.emit({ action: 'checked', node });
  }

  checkRelatives(node: TreeNodeCategory) {
    this.checkChildren(node);
    this.checkParent(node);
  }

  addNode(node) {
    this.treeAction.emit({ action: 'add', node });
  }

  editNode(node) {
    this.treeAction.emit({ action: 'edit', node });
  }

  removeNode(node: TreeNodeCategory) {
    this.treeAction.emit({ action: 'delete', node });
  }

  triggerChange() {
    const data = this.dataSource.data;
    this.dataSource.data = null;
    this.dataSource.data = data;
    this.updateCheckStatus();
    this.treeControl.dataNodes = this.dataSource.data;
    this.treeControl.expandAll();
  }

}

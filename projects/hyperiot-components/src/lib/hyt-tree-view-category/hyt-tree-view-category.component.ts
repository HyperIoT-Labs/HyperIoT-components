import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a label, data, active property and an optional list of children.
 */
export interface TreeNodeCategory {
  label: string;
  data: any;
  active?: boolean;
  children?: TreeNodeCategory[];
}

@Component({
  selector: 'hyt-tree-view-category',
  templateUrl: './hyt-tree-view-category.component.html',
  styleUrls: ['./hyt-tree-view-category.component.css']
})
export class HytTreeViewCategoryComponent implements OnInit {

  @Input() treeData: TreeNodeCategory[];

  @Output() cbChange = new EventEmitter<TreeNodeCategory>();

  treeControl = new NestedTreeControl<TreeNodeCategory>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNodeCategory>();

  constructor() {
  }

  ngOnInit() {
    this.dataSource.data = this.treeData;
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

  cbChanged(node: TreeNodeCategory) {
    this.checkChildren(node);
    this.cbChange.emit(node);
  }

}

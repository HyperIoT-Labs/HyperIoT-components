import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

/**
 * Data node that is used in the `treeData` array passed by the hosting component
 */
export interface TreeDataNode {
  name: string;
  icon?: string;
  children?: TreeDataNode[];
  last?: boolean;
  parent?: TreeDataNode;
  data?: any;
}

/**
 * Internal node representation with `expandable`, `level`, `data` and `parent` information
 */
interface TreeViewNode {
  active: boolean;
  expandable: boolean;
  name: string;
  icon?: string;
  level: number;
  last: boolean;
  parent?: TreeDataNode;
  data?: any;
}

@Component({
  selector: 'hyt-tree-view-project',
  templateUrl: './hyt-tree-view-project.component.html',
  styleUrls: ['./hyt-tree-view-project.component.scss']
})
export class HytTreeViewProjectComponent implements OnInit {
  @Input() treeData: TreeDataNode[] = [];
  @Output() nodeClick = new EventEmitter<TreeViewNode>();
  treeControl = new FlatTreeControl<TreeViewNode>(
    node => node.level, node => node.expandable
  );
  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  private lastActiveNode: TreeViewNode;
  constructor() {
  }

  ngOnInit() {
    if (this.treeData) {
      this.setData(this.treeData);
    }
  }

  setData(data: any) {
    this.prepareData(data);
    this.treeData = data;
    this.dataSource.data = this.treeData;
  }

  setActiveNode(node: TreeViewNode) {
    if (this.lastActiveNode) {
      this.lastActiveNode.active = false;
    }
    node.active = true;
    this.lastActiveNode = node;
  }

  onNodeClicked(node: TreeViewNode) {
    this.setActiveNode(node);
    this.nodeClick.emit(node);
  }

  hasChild(i: number, node: TreeViewNode) {
    return node.expandable;
  }

  getLevelTabs(l: number) {
    const spacer = Array(l);
    for (let i = 0; i < spacer.length; i++) {
      spacer[i] = i;
    }
    return spacer;
  }

  private prepareData(nodeList: TreeDataNode[], parent?: TreeDataNode) {
    let lastNode;
    nodeList.forEach((n) => {
      if (parent) {
        n.parent = parent;
      }
      if (n.children) {
        this.prepareData(n.children, n);
      }
      lastNode = n;
    });
    if (lastNode) {
      lastNode.last = true;
    }
  }

  private transformer(node: TreeDataNode, level: number): TreeViewNode {
    return {
      active: false,
      name: node.name,
      icon: node.icon,
      level,
      last: node.last || false,
      parent: node.parent,
      expandable: !!node.children && node.children.length > 0,
      data: node.data
    };
  }
}

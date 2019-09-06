import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

/**
 * Each node has a name and optional icon and list of children.
 */
export interface TreeViewDataNode {
  name: string;
  icon?: string;
  children?: TreeViewDataNode[];
  last?: boolean;
}

const TREE_DATA: TreeViewDataNode[] = [
  {
    name: 'Fruit',
    icon: 'cake',
    children: [
      { name: 'Apple', icon: 'drive_eta' },
      { name: 'Banana', icon: 'adb' },
      { name: 'Fruit loops', icon: 'train', last: true },
    ]
  }, {
    name: 'Vegetables',
    icon: 'public',
    children: [
      {
        name: 'Green',
        children: [
          { name: 'Broccoli', icon: 'restaurant' },
          { name: 'Brussel sprouts', icon: 'local_florist', last: true },
        ]
      }, {
        name: 'Orange',
        last: true,
        children: [
          { name: 'Pumpkins', icon: 'filter_drama' },
          { name: 'Carrots', last: true },
        ]
      }
    ]
  },
];

/** Flat node with expandable and level information */
interface TreeViewFlatNode {
  expandable: boolean;
  name: string;
  icon?: string;
  level: number;
  last: boolean;
}

@Component({
  selector: 'hyt-tree-view-project',
  templateUrl: './hyt-tree-view-project.component.html',
  styleUrls: ['./hyt-tree-view-project.component.css']
})
export class HytTreeViewProjectComponent implements OnInit {
  private _transformer = (node: TreeViewDataNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      icon: node.icon,
      level,
      last: node.last
    };
  }

  treeControl = new FlatTreeControl<TreeViewFlatNode>(
    node => node.level, node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit() {
  }

  hasChild = (_: number, node: TreeViewFlatNode) => node.expandable;

  getLevelTabs = (l: number) => {
    const spacer = Array(l);
    for (let i = 0; i < spacer.length; i++) {
      spacer[i] = i;
    }
    return spacer;
  }
}

import { Component, OnInit, EventEmitter, Output, Input, ViewEncapsulation } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
// import { ConsoleReporter } from 'jasmine';

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
  visible?: boolean;
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
  visible?: boolean;
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

  nodeHasTags(node: TreeDataNode) {
    let hasTags = false;
    node.children.forEach(child => {
      if (child.data.id === 999999999) {
        hasTags = true;
      }
    });
    return hasTags;
  }

  nodeHasCategories(node: TreeDataNode) {
    let hasCategories = false;
    node.children.forEach(child => {
      if (child.data.id === 999999998) {
        hasCategories = true;
      }
    });
    return hasCategories;
  }

  addTagsAndCategories(data: TreeDataNode[]) {
    console.log('addTagsAndCategories');
    data.forEach(node => {
      if (this.nodeHasTags(node) === false) {
        const tags: TreeDataNode = {
          data: {
            id: 999999999
          },
          name: 'Project Tags',
          icon: 'icon-hyt_tags',
          visible: true,
          children: []
        };
        node.children.push(tags);
      }
      if (this.nodeHasCategories(node) === false) {
        const categories: TreeDataNode = {
          data: {
            id: 999999998
          },
          name: 'Project Categories',
          icon: 'icon-hyt_categories',
          visible: true,
          children: []
        };
        node.children.push(categories);
      }
    });
  }

  setData(data: TreeDataNode[]) {
    this.addTagsAndCategories(this.treeData);
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

  isParentLast(node, level) {
    let levelDiff = node.level - level - 1;
    let parent = node.parent;
    while (--levelDiff > 0) {
      parent = parent.parent;
    }
    return parent.last;
  }

  getLevelConnector(node, i) {
    if ((i !== node.level - 1 && !this.isParentLast(node, i))) {
      return 'line-straight';
    } else if (!node.active && (i === node.level - 1 && !node.last) && ((i < node.level && !node.last) || (i !== node.level - 1 && node.last) || this.treeControl.isExpanded(node))) {
      return 'line-right';
    } else if (node.active && (i === node.level - 1 && !node.last) && ((i < node.level && !node.last) || (i !== node.level - 1 && node.last) || this.treeControl.isExpanded(node))) {
      return 'line-right-active';
    } else if (i === node.level - 1 && node.last && !node.active) {
      return 'line-end';
    } else if (i === node.level - 1 && node.last && node.active) {
      return 'line-end-active';
    } else {
      return 'line-empty';
    }
  }

  private prepareData(nodeList: TreeDataNode[], parent?: TreeDataNode) {
    let lastNode;
    nodeList.forEach((n) => {
      n.last = false;
      if (n.visible == null) {
        n.visible = true;
      }
      if (parent) {
        n.parent = parent;
      }
      if (n.children) {
        this.prepareData(n.children, n);
      }
      if (n.visible) {
        lastNode = n;
      }
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
      data: node.data,
      visible: node.visible
    };
  }

  propagateVisibilityUp(node: TreeDataNode, visibility: boolean) {
    if (node.parent) {
      node.parent.visible = visibility;
      this.propagateVisibilityUp(node.parent, visibility);
    }
  }

  propagateVisibilityDown(node: TreeDataNode, visibility: boolean) {
    if (node.children) {
      node.children.forEach(child => {
        if (child.data.id !== 999999999 && child.data.id !== 999999998) {
          child.visible = visibility;
          this.propagateVisibilityDown(child, visibility);
        }
      });
    }
  }

  treeDataSearch(node: TreeDataNode, token: string): void {
    if (node.children) {
      if (node.name.toLocaleLowerCase().includes(token.toLocaleLowerCase())) {
        console.log(node.name);
        node.visible = true;
        this.propagateVisibilityUp(node, true);
        this.propagateVisibilityDown(node, true);
      }
      node.children.forEach(child => {
        if (!child.visible) {
          this.treeDataSearch(child, token);
        }
      });
    }
  }

  onChangeInput(value: string) {
    console.log('onChangeInput ' + value);
    this.treeData.forEach(node => {
      node.visible = false;
      this.propagateVisibilityDown(node, false);
    });
    this.treeData.forEach(node => {
      this.treeDataSearch(node, value);
    });

    this.setData(this.treeData);
    this.treeControl.expandAll();
  }
}

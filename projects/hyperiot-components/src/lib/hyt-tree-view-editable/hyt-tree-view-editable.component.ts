import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit, Input } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';

export class Node {
  name: string;
  lom: string;
  type: string;
  children?: Node[];
}

export class FlatNode {
  name: string;
  lom: string;
  type: string;
  level: number;
  expandable: boolean;
}

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: string;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {

  //  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  dataChange = new BehaviorSubject<Node[]>([]);

  //  get data(): TodoItemNode[] { return this.dataChange.value; }
  get data(): Node[] { return this.dataChange.value; }

  constructor() {
    //    this.initialize();
  }

  public initialize(treeData) {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(treeData, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  // buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
  //   return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
  //     const value = obj[key];
  //     const node = new TodoItemNode();
  //     node.item = key;

  //     if (value != null) {
  //       if (typeof value === 'object') {
  //         node.children = this.buildFileTree(value, level + 1);
  //       } else {
  //         node.item = value;
  //       }
  //     }

  //     return accumulator.concat(node);
  //   }, []);
  // }

  buildFileTree(obj: { [key: string]: any }, level: number): Node[] {
    return Object.keys(obj).reduce<Node[]>((accumulator, key) => {
      const value = obj[key];
      const node = new Node();
      node.name = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.name = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  // insertItem(parent: TodoItemNode, name: string) {
  //   if (parent.children) {
  //     parent.children.push({ item: name } as TodoItemNode);
  //     this.dataChange.next(this.data);
  //   }
  // }
  insertItem(parent: Node, name: string, lom: string, type: string) {
    if (parent.children) {
      parent.children.push({ name, lom, type } as Node);
      this.dataChange.next(this.data);
    }
  }

  /** Add an item to to-do list */
  // removeItem(parent: TodoItemNode, name: string) {
  //   if (parent.children) {
  //     parent.children.forEach((item, index) => {
  //       if (item.item === name) {
  //         parent.children.splice(index, 1);
  //       }
  //     });
  //     this.dataChange.next(this.data);
  //   }
  // }
  removeItem(parent: Node, name: string) {
    if (parent.children) {
      parent.children.forEach((node, index) => {
        if (node.name === name) {
          parent.children.splice(index, 1);
        }
      });
      this.dataChange.next(this.data);
    }
  }

  // updateItem(node: TodoItemNode, name: string) {
  //   node.item = name;
  //   this.dataChange.next(this.data);
  // }
  updateItem(node: Node, name: string) {
    node.name = name;
    this.dataChange.next(this.data);
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-tree-view-editable',
  templateUrl: './hyt-tree-view-editable.component.html',
  styleUrls: ['./hyt-tree-view-editable.component.scss'],
  providers: [ChecklistDatabase]
})
export class HytTreeViewEditableComponent implements OnInit {

  @Input() treeData: any;

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  //  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();
  flatNodeMap = new Map<FlatNode, Node>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  //  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();
  nestedNodeMap = new Map<Node, FlatNode>();

  /** A selected parent node to be inserted */
  //  selectedParent: TodoItemFlatNode | null = null;
  selectedParent: FlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  //  treeControl: FlatTreeControl<TodoItemFlatNode>;
  treeControl: FlatTreeControl<FlatNode>;

  //  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
  treeFlattener: MatTreeFlattener<Node, FlatNode>;

  dataSource: MatTreeFlatDataSource<Node, FlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<FlatNode>(true /* multiple */);

  constructor(private _database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<FlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngOnInit() {
    this._database.initialize(this.treeData);
  }

  getLevel = (node: FlatNode) => node.level;

  isExpandable = (node: FlatNode) => node.expandable;

  getChildren = (node: Node): Node[] => node.children;

  hasChild = (_: number, _nodeData: FlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: FlatNode) => _nodeData.name === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: Node, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name
      ? existingNode
      : new FlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: FlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: FlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: FlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: FlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: FlatNode): void {
    let parent: FlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: FlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: FlatNode): FlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: FlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this._database.insertItem(parentNode!, '', '', '');
    this.treeControl.expand(node);
  }

  removeItem(node: FlatNode) {
    const parentNodeFlat = this.getParentNode(node);
    const parentNode = this.flatNodeMap.get(parentNodeFlat);
    this._database.removeItem(parentNode, node.name);
  }

  /** Save the node to database */
  saveNode(node: FlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this._database.updateItem(nestedNode!, itemValue);
  }
}

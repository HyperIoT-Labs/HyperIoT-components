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
 * Node database, it can build a tree structured Json object.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class NodeDatabase {

  dataChange = new BehaviorSubject<Node[]>([]);

  get data(): Node[] { return this.dataChange.value; }

  constructor() {
  }

  public initialize(treeData) {
    const data = this.buildFileTree(treeData, 0);
    console.log(JSON.stringify(data));
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): Node[] {
    const nodeList: Node[] = [];
    for (const i in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, i)) {
        const newNode = new Node();
        const node = obj[i];
        newNode.name = node.name;
        newNode.lom = node.lom;
        newNode.type = node.type;
        if (node.children) {
          newNode.children = this.buildFileTree(node.children, level + 1);
        }
        nodeList.push(newNode);
      }
    }

    return nodeList;
  }

  /** Add an item to to-do list */
  insertItem(parent: Node, name: string, lom: string, type: string) {
    if (parent.children) {
      parent.children.push({ name, lom, type } as Node);
      this.dataChange.next(this.data);
    }
  }

  /** Add an item to to-do list */
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
  providers: [NodeDatabase]
})
export class HytTreeViewEditableComponent implements OnInit {

  @Input() treeData: any;

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<FlatNode, Node>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<Node, FlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: FlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<FlatNode>;

  treeFlattener: MatTreeFlattener<Node, FlatNode>;

  dataSource: MatTreeFlatDataSource<Node, FlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<FlatNode>(true /* multiple */);

  constructor(private database: NodeDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<FlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngOnInit() {
    this.database.initialize(this.treeData);
  }

  getLevel = (node: FlatNode) => node.level;

  isExpandable = (node: FlatNode) => node.expandable;

  getChildren = (node: Node): Node[] => node.children;

  hasChild = (_: number, nodeData: FlatNode) => nodeData.expandable;

  hasNoContent = (_: number, nodeData: FlatNode) => nodeData.name === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: Node, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name
      ? existingNode
      : new FlatNode();
    flatNode.name = node.name;
    flatNode.lom = node.lom;
    flatNode.type = node.type;
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
    this.database.insertItem(parentNode!, '', '', '');
    this.treeControl.expand(node);
  }

  removeItem(node: FlatNode) {
    const parentNodeFlat = this.getParentNode(node);
    const parentNode = this.flatNodeMap.get(parentNodeFlat);
    this.database.removeItem(parentNode, node.name);
  }

  /** Save the node to database */
  saveNode(node: FlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.database.updateItem(nestedNode!, itemValue);
  }
}

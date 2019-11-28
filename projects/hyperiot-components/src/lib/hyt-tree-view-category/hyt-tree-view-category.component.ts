import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, OnChanges } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface TreeNodeCategory {
  id: number;
  label: string;
  data: any;
  active: any;
  children: TreeNodeCategory[];
  parent: TreeNodeCategory;
}

@Component({
  selector: 'hyt-tree-view-category',
  templateUrl: './hyt-tree-view-category.component.html',
  styleUrls: ['./hyt-tree-view-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HytTreeViewCategoryComponent implements OnInit, OnChanges {

  @Input() treeDataFlat: TreeNodeCategory[] = [];

  treeData: TreeNodeCategory[] = [];

  @Output() cbChange = new EventEmitter<TreeNodeCategory>();

  @Output() cbAdd = new EventEmitter<TreeNodeCategory>();

  treeControl = new NestedTreeControl<TreeNodeCategory>(node => node.children);

  dataSource = new MatTreeNestedDataSource<TreeNodeCategory>();

  catForm: FormGroup;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.createTree();
  }

  createTree() {
    this.treeData = [];
    var lookup = {};
    this.treeDataFlat.forEach((x) => {
      lookup[x['id']] = x;
      x['children'] = [];
    });
    this.treeDataFlat.forEach((x) => {
      if (x['parent'] != null) {
        lookup[x['parent'].id]['children'].push(x);
      } else {
        this.treeData.push(x);
      }
    });
    this.dataSource.data = this.treeData;
    this.triggerChange();
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
      //      node.parent.active = node.active;
      let countTrue = 0;
      let countFalse = 0;
      let countNull = 0;
      node.parent.children.forEach(children => {
        console.log(node.parent.label + ' children: ' + children.active);
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

  cbChanged(node: TreeNodeCategory) {
    if (node.active == null) {
      node.active = true;
    }
    this.checkChildren(node);
    this.checkParent(node);
    this.cbChange.emit(node);
  }

  creatingParentNode;
  creatingNode;
  creating: string = '';

  addNode(parentNode) {
    if (this.creating != '') {
      this.cancelNode();
    }
    this.creating = 'true';
    this.catForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    let emptyNode: TreeNodeCategory = {
      id: null,
      label: '',
      data: {},
      active: false,
      children: [],
      parent: null
    }
    if (!parentNode) {
      this.creating = 'root';
      this.dataSource.data.push(emptyNode);
      this.creatingNode = this.dataSource.data.find(x => x.label == '');
    }
    else {
      this.creating = '!root';
      this.creatingParentNode = parentNode;
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

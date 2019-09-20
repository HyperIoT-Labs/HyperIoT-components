import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TreeNode } from 'projects/hyperiot-components/src/public-api';
import { Node } from 'projects/hyperiot-components/src/lib/hyt-tree-view-editable/hyt-tree-view-editable.component';
import { TreeNodeCategory } from 'projects/hyperiot-components/src/lib/hyt-tree-view-category/hyt-tree-view-category.component';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  @ViewChild('editableTree', { static: false }) private editableTree: ElementRef;

  treeData: TreeNode[] = [
    {
      name: 'Fruit',
      children: [
        { name: 'Apple' },
        { name: 'Banana' },
        { name: 'Fruit loops' },
      ]
    }, {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [
            { name: 'Broccoli' },
            { name: 'Brussel sprouts' },
          ]
        }, {
          name: 'Orange',
          children: [
            { name: 'Pumpkins' },
            { name: 'Carrots' },
          ]
        },
      ]
    },
  ];

  treeCategory: TreeNodeCategory[] = [
    {
      label: 'Fruit',
      data: {},
      active: true,
      children: [
        { label: 'Apple', data: {}, active: true },
        { label: 'Banana', data: {}, active: true },
        { label: 'Fruit loops', data: {}, active: true },
      ]
    }, {
      label: 'Vegetables',
      data: {},
      active: true,
      children: [
        {
          label: 'Green',
          data: {},
          active: true,
          children: [
            { label: 'Broccoli', data: {}, active: true },
            { label: 'Brussel sprouts', data: {}, active: true },
          ]
        }, {
          label: 'Orange',
          data: {},
          active: true,
          children: [
            { label: 'Pumpkins', data: {}, active: true },
            { label: 'Carrots', data: {}, active: true },
          ]
        },
      ]
    },
  ];

  deviceName = 'Weather Station Data';

  Tree: Node[] = [
    {
      name: 'Temperature',
      lom: 'Single',
      type: 'Double',
      data: 1,
      root: false
    }, {
      name: 'GPS',
      lom: 'Multiple',
      type: 'Object',
      data: 2,
      root: false,
      children: [
        {
          name: 'Longitude',
          lom: 'Single',
          type: 'Double',
          data: 3,
          root: false
        }, {
          name: 'Latitude',
          lom: 'Single',
          type: 'Double',
          data: 4,
          root: false
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  addCallback(parent: Node) {
    console.log('addCallback', parent);
  }

  removeCallback(node: Node) {
    console.log('removeCallback', node);
    this.Tree.forEach((n, i) => {
      if (n.name === node.name) {
        this.Tree.splice(i, 1);
      }
    });
    this.editableTree['removed'](node);
  }

  cbChange(event) {
    console.log(event);
  }

}

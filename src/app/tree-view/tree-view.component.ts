import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TreeNode } from 'projects/hyperiot-components/src/public-api';
import { Node } from 'projects/hyperiot-components/src/lib/hyt-tree-view-editable/hyt-tree-view-editable.component';

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

  deviceName = 'Weather Station Data';

  Tree: Node[] = [
    {
      name: 'Temperature',
      lom: 'Single',
      type: 'Double',
      id: 1,
      root: false
    }, {
      name: 'GPS',
      lom: 'Multiple',
      type: 'Object',
      id: 2,
      root: false,
      children: [
        {
          name: 'Longitude',
          lom: 'Single',
          type: 'Double',
          id: 3,
          root: false
        }, {
          name: 'Latitude',
          lom: 'Single',
          type: 'Double',
          id: 4,
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
}

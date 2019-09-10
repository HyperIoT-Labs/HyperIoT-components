import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'projects/hyperiot-components/src/public-api';
import { Node } from 'projects/hyperiot-components/src/lib/hyt-tree-view-editable/hyt-tree-view-editable.component';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

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

  Tree: Node[] = [
    {
      name: 'Temperature',
      lom: 'Single',
      type: 'Double'
    }, {
      name: 'GPS',
      lom: 'Multiple',
      type: 'Object',
      children: [
        {
          name: 'Longitude',
          lom: 'Single',
          type: 'Double'
        }, {
          name: 'Latitude',
          lom: 'Single',
          type: 'Double'
        }
      ]
    }
  ];


  /**
   * The Json object for to-do list data.
   */
  editableTree = {
    Groceries: {
      'Almond Meal flour': null,
      'Organic eggs': null,
      'Protein Powder': null,
      Fruits: {
        Apple: null,
        Berries: ['Blueberry', 'Raspberry'],
        Orange: null
      }
    },
    Reminders: [
      'Cook dinner',
      'Read the Material Design spec',
      'Upgrade Application to Angular'
    ]
  };
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'projects/hyperiot-components/src/public-api';

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

  Tree = {
    items: [
      {
        name: 'Temperature',
        lom: 'Single',
        type: 'Double'
      }, {
        name: 'GPS',
        lom: 'Multiple',
        type: 'Object',
        items: [
          {
            name: 'Longitude',
            type: 'Double'
          }, {
            name: 'Latitude',
            type: 'Double'
          }
        ]
      }
    ]
  };

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

import { Component } from '@angular/core';
import { TreeDataNode } from 'hyperiot-components/public-api';

@Component({
  selector: 'app-tree-view-project',
  templateUrl: './tree-view-project.component.html',
  styleUrls: ['./tree-view-project.component.scss']
})
export class TreeViewProjectComponent {

  treeData: TreeDataNode[] = [
    {
      data: {id: 1},
      name: 'Fruit',
      icon: 'cake',
      children: [
        { name: 'Apple', icon: 'drive_eta', data: {id: 10} },
        { name: 'Banana', icon: 'adb', data: {id: 11} },
        { name: 'Fruit loops', icon: 'train', data: {id: 12} },
      ]
    }, {
      data: {id: 2},
      name: 'Vegetables',
      icon: 'public',
      children: [
        {
          data: {id: 3},
          name: 'Green',
          children: [
            { name: 'Broccoli', icon: 'restaurant', children: [{ name: 'Just a test!', data: {id: 15} }], data: {id: 13} },
            { name: 'Brussel sprouts', icon: 'local_florist', data: {id: 14} },
          ]
        }, {
          data: {id: 4},
          name: 'Orange',
          children: [
            { name: 'Pumpkins', icon: 'filter_drama', data: {id: 21} },
            { name: 'Carrots', data: {id: 1} },
          ]
        }
      ]
    },
  ];

  onNodeClicked(node: any) {
    console.log('onNodeClicked', node);
  }
}

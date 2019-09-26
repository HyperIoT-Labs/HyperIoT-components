import { Component, ViewChild, OnInit } from '@angular/core';
import { TreeDataNode } from 'hyperiot-components/public-api';
import { HytTreeViewProjectComponent } from 'projects/hyperiot-components/src/lib/hyt-tree-view-project/hyt-tree-view-project.component';

@Component({
  selector: 'app-tree-view-project',
  templateUrl: './tree-view-project.component.html',
  styleUrls: ['./tree-view-project.component.scss']
})
export class TreeViewProjectComponent implements OnInit {
  // @ViewChild('treeView', {static: true}) treeView: HytTreeViewProjectComponent;
  @ViewChild('treeView2', {static: true}) treeView2: HytTreeViewProjectComponent;

  // treeData: TreeDataNode[] = [
  //   {
  //     data: {id: 1},
  //     name: 'Fruit',
  //     icon: 'cake',
  //     children: [
  //       { name: 'Apple', icon: 'drive_eta', data: {id: 10} },
  //       { name: 'Banana', icon: 'adb', data: {id: 11} },
  //       { name: 'Fruit loops', icon: 'train', data: {id: 12} },
  //     ]
  //   }, {
  //     data: {id: 2},
  //     name: 'Vegetables',
  //     icon: 'public',
  //     children: [
  //       {
  //         data: {id: 3},
  //         name: 'Green',
  //         children: [
  //           { name: 'Broccoli', icon: 'restaurant', children: [{ name: 'Just a test!', data: {id: 15} }], data: {id: 13} },
  //           { name: 'Brussel sprouts', icon: 'local_florist', data: {id: 14} },
  //         ]
  //       }, {
  //         data: {id: 4},
  //         name: 'Orange',
  //         children: [
  //           { name: 'Pumpkins', icon: 'filter_drama', data: {id: 21} },
  //           { name: 'Carrots', data: {id: 1} },
  //         ]
  //       }
  //     ]
  //   },
  // ];

  /******************************************************/

  treeData2: TreeDataNode[] = [
    {
      data: {id: 1},
      name: 'Project',
      icon: 'icon-hyt_projectRSolo', /* cake */
      children: [
        { name: 'Device 1', icon: 'icon-hyt_device', data: {id: 10} },
        { name: 'Device 3', icon: 'icon-hyt_device', data: {id: 11} },
        { name: 'Device 3', icon: 'icon-hyt_device', data: {id: 12} },
      ]
    }, {
      data: {id: 2},
      name: 'Project 2',
      icon: 'icon-hyt_projectRSolo',
      children: [
        {
          data: {id: 3},
          name: 'Device 4',
          children: [
            { name: 'Packet_1', icon: 'icon-hyt_packets', children: [{ name: 'Just a test!', data: {id: 15} }], data: {id: 13} },
            { name: 'Packet_2', icon: 'icon-hyt_packets', data: {id: 14} },
          ]
        }, {
          data: {id: 4},
          name: 'Orange',
          children: [
            { name: 'Pumpkins', icon: 'icon-hyt_packets', data: {id: 21} },
            { name: 'Carrots', data: {id: 1} },
          ]
        }
      ]
    },
  ];

  ngOnInit() {
    // this.treeView.setData(this.treeData);
    this.treeView2.setData(this.treeData2);
  }

  onNodeClicked(node: any) {
    console.log('onNodeClicked', node);
  }
}

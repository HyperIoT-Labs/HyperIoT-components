import { Component, ViewChild, OnInit } from '@angular/core';
import { TreeDataNode } from './../../../projects/hyperiot-components/src/public-api';
import { HytTreeViewProjectComponent } from 'projects/hyperiot-components/src/lib/hyt-tree-view-project/hyt-tree-view-project.component';
import { Logger, LoggerService } from '@hyperiot/core';

@Component({
  selector: 'app-tree-view-project',
  templateUrl: './tree-view-project.component.html',
  styleUrls: ['./tree-view-project.component.scss']
})
export class TreeViewProjectComponent implements OnInit {

  @ViewChild('treeView', {static: true}) treeView: HytTreeViewProjectComponent;

  private logger: Logger
  
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

  constructor(private loggerService: LoggerService) {
    this.logger = new Logger(this.loggerService);
    this.logger.registerClass('TreeViewProjectComponent');
  }

  ngOnInit() {
    this.treeView.setData(this.treeData);
  }

  onNodeClicked(node: any) {
    this.logger.debug('onNodeClicked method called', node);
  }
}

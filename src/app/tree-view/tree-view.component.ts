import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TreeNode } from 'projects/hyperiot-components/src/public-api';
import { Node } from 'projects/hyperiot-components/src/lib/hyt-tree-view-editable/hyt-tree-view-editable.component';
import { LoggerService, Logger } from '@hyperiot/core';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  @ViewChild('editableTree', { static: false }) private editableTree: ElementRef;

  private logger: Logger;

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

  constructor(private loggerService: LoggerService) {
    this.logger = new Logger(this.loggerService);
    this.logger.registerClass('TreeViewComponent');
   }

  ngOnInit() {
  }

  addCallback(parent: Node) {
    this.logger.debug('addCallback method called', parent);
  }

  removeCallback(node: Node) {
    this.logger.debug('removeCallback method called', node);
    this.Tree.forEach((n, i) => {
      if (n.name === node.name) {
        this.Tree.splice(i, 1);
      }
    });
    this.editableTree['removed'](node);
  }
}

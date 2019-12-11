import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TreeNode } from 'projects/hyperiot-components/src/public-api';
import { Node } from 'projects/hyperiot-components/src/lib/hyt-tree-view-editable/hyt-tree-view-editable.component';
import { LoggerService, Logger } from '@hyperiot/core';
import { TreeNodeCategory, CategoryTreeEvent } from 'projects/hyperiot-components/src/lib/hyt-tree-view-category/hyt-tree-view-category.component';
import { MatDialog } from '@angular/material';

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

  dataCategories: any[] = [
    { "id": 365, "entityVersion": 1, "entityCreateDate": 1569165668042, "entityModifyDate": 1569165668042, "categoryIds": null, "tagIds": null, "name": "sasf", "owner": { "ownerResourceName": "it.acsoftware.hyperiot.hproject", "ownerResourceId": 364, "userId": 0, "resourceName": "it.acsoftware.hyperiot.hproject" }, "parent": null },
    { "id": 366, "entityVersion": 1, "entityCreateDate": 1569165676734, "entityModifyDate": 1569165676734, "categoryIds": null, "tagIds": null, "name": "son", "owner": { "ownerResourceName": "it.acsoftware.hyperiot.hproject", "ownerResourceId": 364, "userId": 0, "resourceName": "it.acsoftware.hyperiot.hproject" }, "parent": { "id": 365, "entityVersion": 1, "entityCreateDate": 1569165668042, "entityModifyDate": 1569165668042, "categoryIds": null, "tagIds": null, "name": "sasf", "owner": { "ownerResourceName": "it.acsoftware.hyperiot.hproject", "ownerResourceId": 364, "userId": 0, "resourceName": "it.acsoftware.hyperiot.hproject" }, "parent": null } },
    { "id": 367, "entityVersion": 1, "entityCreateDate": 1569165668042, "entityModifyDate": 1569165668042, "categoryIds": null, "tagIds": null, "name": "sasf", "owner": { "ownerResourceName": "it.acsoftware.hyperiot.hproject", "ownerResourceId": 364, "userId": 0, "resourceName": "it.acsoftware.hyperiot.hproject" }, "parent": { "id": 366, "entityVersion": 1, "entityCreateDate": 1569165676734, "entityModifyDate": 1569165676734, "categoryIds": null, "tagIds": null, "name": "son", "owner": { "ownerResourceName": "it.acsoftware.hyperiot.hproject", "ownerResourceId": 364, "userId": 0, "resourceName": "it.acsoftware.hyperiot.hproject" }, "parent": { "id": 365, "entityVersion": 1, "entityCreateDate": 1569165668042, "entityModifyDate": 1569165668042, "categoryIds": null, "tagIds": null, "name": "sasf", "owner": { "ownerResourceName": "it.acsoftware.hyperiot.hproject", "ownerResourceId": 364, "userId": 0, "resourceName": "it.acsoftware.hyperiot.hproject" }, "parent": null } } },
  ]

  createTreeCategory() {
    this.treeCategory = this.dataCategories.map((d) => ({
      id: d.id,
      label: d.name,
      parent: null,
      children: null,
      data: d,
      active: false
    }));
    this.treeCategory.forEach(x => {
      x.parent = (x.data.parent) ? this.treeCategory.find(y => y.id == x.data.parent.id) : null;
    });
  }

  treeAction(event: CategoryTreeEvent) {
    switch (event.action) {
      case 'add':
        console.log('adding with parent: ', event.node);
        break;
      case 'checked':
        console.log('checked: ' + event.node.data.name + ' -> ' + event.node.active);
        break;
      case 'delete':
        console.log('delete: ', event.node);
        break;
      case 'edit':
        console.log('edit: ', event.node);
        break;
    }
  }

  // examples
  idInc = 368;

  cbEdit(event) {
      const newData = {
        entityVersion: 1,
        name: event.label,
        owner: { ownerResourceName: 'it.acsoftware.hyperiot.hproject', ownerResourceId: 364 },
        parent: event.parent ? event.parent.data : null
      };
      // this.service.addCAtegory()
      const fakeRes = {
        id: this.idInc,
        entityVersion: 1,
        name: event.label,
        owner: { ownerResourceName: 'it.acsoftware.hyperiot.hproject', ownerResourceId: 364 },
        parent: event.parent ? event.parent.data : null
      };
      this.idInc++;
      this.treeCategory.push({
        id: fakeRes.id,
        label: fakeRes.name,
        parent: event.parent,
        children: [],
        data: fakeRes,
        active: false
      });

    this.treeCategory = [...this.treeCategory];
  }

  cbRemove($event) {
    console.log('DELETE: ' + event);
  }

  removeNodeAndChildren(node: TreeNodeCategory) {
    this.treeCategory.filter(t => (t.parent) ? t.parent.id === node.id : false).forEach(element => {
      this.removeNodeAndChildren(element);
    });
    this.treeCategory = this.treeCategory.filter(t => t.id !== node.id);
  }

  treeCategory: TreeNodeCategory[] = [];

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

  constructor(
    private loggerService: LoggerService,
    private dialog: MatDialog
  ) {
    this.logger = new Logger(this.loggerService);
    this.logger.registerClass('TreeViewComponent');
  }

  ngOnInit() {
    this.createTreeCategory();
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

  cbChange(event) {
    console.log(event);
  }

}

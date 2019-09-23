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

  dataCategories: any[] = [
    { "id": 365, "entityVersion": 1, "entityCreateDate": 1569165668042, "entityModifyDate": 1569165668042, "categoryIds": null, "tagIds": null, "name": "sasf", "owner": { "ownerResourceName": "it.acsoftware.hyperiot.hproject", "ownerResourceId": 364, "userId": 0, "resourceName": "it.acsoftware.hyperiot.hproject" }, "parent": null },
    { "id": 366, "entityVersion": 1, "entityCreateDate": 1569165676734, "entityModifyDate": 1569165676734, "categoryIds": null, "tagIds": null, "name": "son", "owner": { "ownerResourceName": "it.acsoftware.hyperiot.hproject", "ownerResourceId": 364, "userId": 0, "resourceName": "it.acsoftware.hyperiot.hproject" }, "parent": { "id": 365, "entityVersion": 1, "entityCreateDate": 1569165668042, "entityModifyDate": 1569165668042, "categoryIds": null, "tagIds": null, "name": "sasf", "owner": { "ownerResourceName": "it.acsoftware.hyperiot.hproject", "ownerResourceId": 364, "userId": 0, "resourceName": "it.acsoftware.hyperiot.hproject" }, "parent": null } },
    { "id": 367, "entityVersion": 1, "entityCreateDate": 1569165668042, "entityModifyDate": 1569165668042, "categoryIds": null, "tagIds": null, "name": "sasf", "owner": { "ownerResourceName": "it.acsoftware.hyperiot.hproject", "ownerResourceId": 364, "userId": 0, "resourceName": "it.acsoftware.hyperiot.hproject" }, "parent": { "id": 366, "entityVersion": 1, "entityCreateDate": 1569165676734, "entityModifyDate": 1569165676734, "categoryIds": null, "tagIds": null, "name": "son", "owner": { "ownerResourceName": "it.acsoftware.hyperiot.hproject", "ownerResourceId": 364, "userId": 0, "resourceName": "it.acsoftware.hyperiot.hproject" }, "parent": { "id": 365, "entityVersion": 1, "entityCreateDate": 1569165668042, "entityModifyDate": 1569165668042, "categoryIds": null, "tagIds": null, "name": "sasf", "owner": { "ownerResourceName": "it.acsoftware.hyperiot.hproject", "ownerResourceId": 364, "userId": 0, "resourceName": "it.acsoftware.hyperiot.hproject" }, "parent": null } } },
  ]

  createTreeCategory() {
    this.dataCategories.forEach(x => {
      this.treeCategory.push({
        id: x.id,
        label: x.name,
        parent: null,
        children: null,
        data: x,
        active: false
      })
    })
    this.treeCategory.forEach(x => {
      x.parent = (x.data.parent) ? this.treeCategory.find(y => y.id == x.data.parent.id) : null;
    })
  }

  cbAdd(event) {
    let newData = {
      entityVersion: 1,
      name: event.label,
      owner: { ownerResourceName: "it.acsoftware.hyperiot.hproject", ownerResourceId: 364 },
      parent: event.parent ? event.parent.data : null
    }
    let fakeRes = {
      id: 987,
      entityVersion: 1,
      name: event.label,
      owner: { ownerResourceName: "it.acsoftware.hyperiot.hproject", ownerResourceId: 364 },
      parent: event.parent ? event.parent.data : null
    }
    this.treeCategory.push({
      id: Math.random() * 10000,
      label: fakeRes.name,
      parent: event.parent,
      children: [],
      data: fakeRes,
      active: false
    })
    this.treeCategory = [...this.treeCategory];
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

  constructor() { }

  ngOnInit() {
    this.createTreeCategory();
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

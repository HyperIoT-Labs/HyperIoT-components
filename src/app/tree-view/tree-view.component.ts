import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Logger, LoggerService } from '@hyperiot/core';
import { TreeNodeCategory } from 'projects/components/src/lib/hyt-tree-view-category/hyt-tree-view-category.component';
import { Node } from 'projects/components/src/lib/hyt-tree-view-editable/hyt-tree-view-editable.component';
import { TreeNode } from 'projects/components/src/public-api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  @ViewChild('editableTree') private editableTree: ElementRef;

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

  // examples
  idInc = 368;

  // removeNodeAndChildren(node: TreeNodeCategory) {
  //   this.treeCategory.filter(t => (t.parent) ? t.parent.id === node.id : false).forEach(element => {
  //     this.removeNodeAndChildren(element);
  //   });
  //   this.treeCategory = this.treeCategory.filter(t => t.id !== node.id);
  // }

  editFunction: (node: TreeNodeCategory) => Observable<TreeNodeCategory> = (node) => {
    return new Observable(sub => {
      setTimeout(() => {
        sub.next({
          id: node.id,
          label: 'modificato',
          parent: null,
          children: [],
          data: {},
          active: false
        });
      }, 1000);
      // this.http.ask(node).subscribe(
      //   res => sub.next(res)
      // )
    });
  }

  removeFunction: (node: TreeNodeCategory) => Observable<TreeNodeCategory> = (node) => {
    return new Observable(sub => {
      setTimeout(() => {
        sub.next();
      }, 1000);
      // this.http.ask(node).subscribe(
      //   res => sub.next(res)
      // )
    });
  }

  addFunction: (node: TreeNodeCategory) => Observable<TreeNodeCategory> = (node) => {
    return new Observable(sub => {
      setTimeout(() => {
        sub.next({
          id: this.idInc,
          label: 'd.name',
          parent: null,
          children: [],
          data: {},
          active: false
        });
        this.idInc++;
      }, 1000);
    });
    // this.http.ask(node).subscribe(
    //   res => sub.next(res)
    // )
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

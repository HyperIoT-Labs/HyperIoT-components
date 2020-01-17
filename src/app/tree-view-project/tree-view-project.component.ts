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
  // @ViewChild('treeView', {static: true}) treeView: HytTreeViewProjectComponent;
  @ViewChild('treeView2', { static: true }) treeView2: HytTreeViewProjectComponent;

  /** logger */
  private logger: Logger;

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
  /*
    treeData2: TreeDataNode[] = [
      {
        data: {id: 1},
        name: 'Project',
        icon: 'icon-hyt_projectRSolo',
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
              {
                name: 'Carrots',
                data: {id: 1},
                children: [
                  {
                    name: 'Test',
                    data: {id: 1}
                  }
                ]
              },
            ]
          }
        ]
      },
    ];
  */
  treeData2 = JSON.parse(`
  [
    {
        "data": {
            "id": 12
        },
        "name": "Test project22",
        "icon": "icon-hyt_projectRSolo",
        "last": true,
        "children": [
            {
                "data": {
                    "id": 30,
                    "type": "source"
                },
                "name": "Sources",
                "icon": "icon-hyt_StreamCloud_Lamp",
                "children": [
                    {
                        "data": {
                            "id": 31,
                            "type": "application"
                        },
                        "name": "TestApplication31 prova overflow testo lungo",
                        "icon": "icon-hyt_fieldsPlusHalf",
                        "children": [
                            {
                                "data": {
                                    "id": 32,
                                    "type": "packet"
                                },
                                "name": "TestPacket331",
                                "icon": "icon-hyt_packets",
                                "children": [
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-fields"
                                        },
                                        "name": "Fields",
                                        "icon": "icon-hyt_fields"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-enrichments"
                                        },
                                        "name": "Enrichments with text overflow test the quick brown",
                                        "icon": "icon-hyt_enrichments"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-statistics"
                                        },
                                        "name": "Statistics",
                                        "icon": "icon-hyt_statistics"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-events"
                                        },
                                        "name": "Events",
                                        "icon": "icon-hyt_event"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "data": {
                            "id": 22,
                            "type": "device"
                        },
                        "name": "TestDevice212 prova overflow testo lungo",
                        "icon": "icon-hyt_device",
                        "children": [
                            {
                                "data": {
                                    "id": 23,
                                    "type": "packet"
                                },
                                "name": "TestPacket2uy",
                                "icon": "icon-hyt_packets",
                                "children": [
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-fields"
                                        },
                                        "name": "Fields",
                                        "icon": "icon-hyt_fields"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-enrichments"
                                        },
                                        "name": "Enrichments with text overflow test the quick brown",
                                        "icon": "icon-hyt_enrichments"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-statistics"
                                        },
                                        "name": "Statistics",
                                        "icon": "icon-hyt_statistics"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-events"
                                        },
                                        "name": "Events",
                                        "icon": "icon-hyt_event"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "data": {
                            "id": 23,
                            "type": "device"
                        },
                        "name": "TestDevice39",
                        "icon": "icon-hyt_device",
                        "children": [
                            {
                                "data": {
                                    "id": 26,
                                    "type": "packet"
                                },
                                "name": "TestPacket2133",
                                "icon": "icon-hyt_packets",
                                "children": [
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-fields"
                                        },
                                        "name": "Fields",
                                        "icon": "icon-hyt_fields"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-enrichments"
                                        },
                                        "name": "Enrichments",
                                        "icon": "icon-hyt_enrichments"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-statistics"
                                        },
                                        "name": "Statistics",
                                        "icon": "icon-hyt_statistics"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-events"
                                        },
                                        "name": "Events",
                                        "icon": "icon-hyt_event"
                                    }
                                ]
                            },
                            {
                                "data": {
                                    "id": 25,
                                    "type": "packet"
                                },
                                "name": "TestPacket2152 3 3  32 eeww test text overflow",
                                "icon": "icon-hyt_packets",
                                "children": [
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-fields"
                                        },
                                        "name": "Fields",
                                        "icon": "icon-hyt_fields"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-enrichments"
                                        },
                                        "name": "Enrichments",
                                        "icon": "icon-hyt_enrichments"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-statistics"
                                        },
                                        "name": "Statistics",
                                        "icon": "icon-hyt_statistics"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-events"
                                        },
                                        "name": "Events",
                                        "icon": "icon-hyt_event"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "data": {
                            "id": 13,
                            "type": "device"
                        },
                        "name": "TestDevice123",
                        "icon": "icon-hyt_device",
                        "children": [
                            {
                                "data": {
                                    "id": 14,
                                    "type": "packet"
                                },
                                "name": "TestPacket1",
                                "icon": "icon-hyt_packets",
                                "children": [
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-fields"
                                        },
                                        "name": "Fields",
                                        "icon": "icon-hyt_fields"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-enrichments"
                                        },
                                        "name": "Enrichments",
                                        "icon": "icon-hyt_enrichments"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-statistics"
                                        },
                                        "name": "Statistics",
                                        "icon": "icon-hyt_statistics"
                                    },
                                    {
                                        "data": {
                                            "id": 0,
                                            "type": "packet-events"
                                        },
                                        "name": "Events",
                                        "icon": "icon-hyt_event"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]`) as TreeDataNode[];

  constructor(private loggerService: LoggerService) {
    this.logger = new Logger(this.loggerService);
    this.logger.registerClass('TreeViewProjectComponent');
  }

  ngOnInit() {
    // this.treeView.setData(this.treeData);
    this.treeView2.setData(this.treeData2);
  }

  onNodeClicked(node: any) {
    this.logger.debug('onNodeClicked method called', node);
  }
}

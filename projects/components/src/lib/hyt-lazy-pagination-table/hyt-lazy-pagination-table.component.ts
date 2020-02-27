import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { SelectOption } from '../hyt-select/hyt-select.component';

export type TableRowIndexes = [number, number];

@Component({
  selector: 'hyt-lazy-pagination-table',
  templateUrl: './hyt-lazy-pagination-table.component.html',
  styleUrls: ['./hyt-lazy-pagination-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HytLazyPaginationTableComponent implements OnInit {

  math = Math;

  validationError = false;

  @Input()
  headers: string[];

  @Input()
  pageData: any[];

  @Input()
  totalRows = 0;

  rowPerPageSelection: SelectOption[] = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 }
  ];

  rowPerPage = 5;

  selectedPage = 0;

  actualRowsIndexes: TableRowIndexes = [0, 0];

  @Output()
  pageRequest: EventEmitter<TableRowIndexes> = new EventEmitter<TableRowIndexes>();

  pageStatus = 0;

  constructor() { }
  ngOnInit() {
    this.updatePageData(0);
  }

  onRowPerPageChanged(event) {
    this.rowPerPage = event.value;
    this.updatePageData(0);
  }

  updatePageData(asd: number) {
    this.selectedPage = +asd;
    const dataIndexes: [number, number] = [
      this.selectedPage * this.rowPerPage,
      (this.selectedPage + 1) * this.rowPerPage < this.totalRows ? (this.selectedPage + 1) * this.rowPerPage : this.totalRows
    ];
    if (dataIndexes[0] !== this.actualRowsIndexes[0] || dataIndexes[1] !== this.actualRowsIndexes[1]) {
      this.actualRowsIndexes = dataIndexes;
      this.pageData = null;
      this.pageRequest.emit(this.actualRowsIndexes);
    }
  }

}

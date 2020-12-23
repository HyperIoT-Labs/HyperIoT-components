import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { SelectOption } from '../hyt-select/hyt-select.component';

export type TableRowIndexes = [number, number];

enum TableStatus {
  NoData = -1,
  LoadingData = 0,
  ShowData = 1
}

@Component({
  selector: 'hyt-lazy-pagination-table',
  templateUrl: './hyt-lazy-pagination-table.component.html',
  styleUrls: ['./hyt-lazy-pagination-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HytLazyPaginationTableComponent implements OnInit {

  tableStatus: TableStatus = TableStatus.NoData;

  @Input()
  dataSource: Subject<any[]>;

  @Input()
  headers: string[];

  math = Math;

  pageData: any[] = [];

  totalRows = 0;

  rowPerPageSelection: SelectOption[] = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 }
  ];

  rowPerPage = 10;

  selectedPage = 0;

  actualRowsIndexes: TableRowIndexes = [0, 0];

  @Output()
  pageRequest: EventEmitter<TableRowIndexes> = new EventEmitter<TableRowIndexes>();

  constructor() { }

  ngOnInit(): void {
    this.dataSource.subscribe(
      r => {
        this.pageData = r;
        this.tableStatus = TableStatus.ShowData;
      }
    );
  }

  onRowPerPageChanged(event) {
    this.rowPerPage = event.value;
    this.updatePageData(0);
  }

  updatePageData(asd: number) {
    if (asd !== null) {
      this.selectedPage = +asd;
    }
    const dataIndexes: [number, number] = [
      this.selectedPage * this.rowPerPage,
      (this.selectedPage + 1) * this.rowPerPage < this.totalRows ? (this.selectedPage + 1) * this.rowPerPage : this.totalRows
    ];
    this.actualRowsIndexes = dataIndexes;
    if (this.totalRows !== 0) {
      this.tableStatus = TableStatus.LoadingData;
      this.pageRequest.emit(this.actualRowsIndexes);
    } else {
      this.tableStatus = TableStatus.NoData;
    }
  }

  resetTable(numRow: number, resetPage: boolean) {
    this.totalRows = +numRow;
    this.updatePageData(resetPage ? 0 : null);
  }

}

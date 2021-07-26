import {
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';

export interface TableEvent {
  type: 'DATA' | 'EVENT';
  values?: any[];
  event?: 'LIMIT_REACHED' | 'DATA_END';
}

enum TableStatus {
  Error = -2,
  NoData = -1,
  LoadingChunkData = 0,
  ShowData = 1,
  DataEnd = 2,
  LimitReached = 3
}

@Component({
  selector: 'hyt-infinite-scrolling-table',
  templateUrl: './hyt-infinite-scrolling-table.component.html',
  styleUrls: ['./hyt-infinite-scrolling-table.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HytInfiniteScrollingTableComponent implements OnInit {

  tableStatus: TableStatus = TableStatus.NoData;

  @Input()
  dataSource: Subject<TableEvent>;

  @Input()
  headers: string[];

  @Input()
  dataLimit = 0;

  tableData = [];
  startToLoadData = 200;
  totalRows = 0;
  chunk = 0;

  @ViewChild('tableContainer') private tableContainer: ElementRef;

  @Output()
  dataRequest: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.dataSource.subscribe((data) => {
      if (data.type === 'DATA') {
        this.tableData = data.values;
        this.tableStatus = TableStatus.ShowData;
      } else {
        if(data.event === 'LIMIT_REACHED') {
          this.tableStatus = TableStatus.LimitReached;
        }
        if(data.event === 'DATA_END') {
          this.tableStatus = TableStatus.DataEnd;
        }
      }
    }, err => {
        this.tableStatus = TableStatus.Error;
    });
  }

  updateData() {
    if (this.totalRows === 0) {
      this.tableStatus = TableStatus.NoData;
      return;
    }
    if(this.tableData.length > this.totalRows) {

    }
    this.tableStatus = TableStatus.LoadingChunkData;
    this.dataRequest.emit(this.chunk);
    this.chunk++;
  }

  resetTable(numRow: number) {
    this.tableData = [];
    this.totalRows = +numRow;
    this.chunk = 0;
    this.updateData();
  }

  onScroll() {
    if (this.tableStatus !== TableStatus.ShowData) {
      return;
    }
    const offsetHeight = this.tableContainer.nativeElement.offsetHeight;
    const scrollTop = this.tableContainer.nativeElement.scrollTop;
    const scrollHeight = this.tableContainer.nativeElement.scrollHeight;

    const scrollToBottom = scrollHeight - scrollTop - offsetHeight;

    if (scrollToBottom < this.startToLoadData) {
      this.updateData();
    }
  }
}

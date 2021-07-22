import { ViewChild, ElementRef, Input, Output, EventEmitter, OnInit, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'hyt-infinite-scrolling-table',
  templateUrl: './hyt-infinite-scrolling-table.component.html',
  styleUrls: ['./hyt-infinite-scrolling-table.component.css']
})
export class HytInfiniteScrollingTableComponent implements OnInit{

  @Input()
  dataSource: Subject<any[]>;

  @Input()
  headers: string[];

  tableData = [];
  askingData;
  startToLoadData = 200;
  totalRows;
  chunk = 0;

  @ViewChild('tableContainer') private tableContainer: ElementRef;

  @Output()
  dataRequest: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.dataSource.subscribe(
      data => {
        console.log('data res', data)
        this.tableData = data;
        this.askingData = false;
      }
    );
  }

  updateData() {
    console.log('updateData()', this.chunk);
    if (this.totalRows === 0 || this.tableData.length > this.totalRows) {
      return;
    }
    this.askingData = true;
    this.dataRequest.emit(this.chunk);
    this.chunk ++;
  }

  resetTable(numRow: number) {
    console.log('reset table');
    this.totalRows = +numRow;
    this.chunk = 0;
    this.updateData();
  }

  onScroll() {
    if(this.askingData) {
      return;
    }
    const offsetHeight = this.tableContainer.nativeElement.offsetHeight;
    const scrollTop = this.tableContainer.nativeElement.scrollTop;
    const scrollHeight = this.tableContainer.nativeElement.scrollHeight;

    const scrollToBottom = scrollHeight - scrollTop - offsetHeight;

    // console.log(scrollToBottom + "<" + this.startToLoadData)
    if(scrollToBottom < this.startToLoadData) {
      // console.log("LOADING")
      this.updateData();
    }
  }
}
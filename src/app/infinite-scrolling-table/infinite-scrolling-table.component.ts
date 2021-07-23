import { Component, OnInit, ViewChild } from '@angular/core';
import { HytInfiniteScrollingTableComponent } from 'projects/components/src/lib/hyt-infinite-scrolling-table/hyt-infinite-scrolling-table.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-infinite-scrolling-table',
  templateUrl: './infinite-scrolling-table.component.html',
  styleUrls: ['./infinite-scrolling-table.component.scss']
})
export class InfiniteScrollingTableComponent implements OnInit {

  CHUNK_SIZE = 50;

  LIMIT_SIZE = 200;

  @ViewChild('tableChild') tableChild: HytInfiniteScrollingTableComponent;

  fakeTotalLength = 0;

  pageData: Subject<any>;

  timeOut;

  allData = [];

  ngOnInit(): void {
    this.pageData = new Subject<any[]>();
  }

  submitNumRows(num: number) {
    this.fakeTotalLength = num;
    this.allData = [];
    this.tableChild.resetTable(this.fakeTotalLength);
  }

  fakeRequest(chunk) {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(() => {
      if(chunk * this.CHUNK_SIZE > this.fakeTotalLength) {
        this.pageData.next({ type: 'EVENT', event: 'DATA_END'});
      }
      else {
        for (let i = 0; i < this.CHUNK_SIZE; i++) {
          this.allData.push({ random: chunk * this.CHUNK_SIZE + i, random2: Math.random() });
        }
        this.pageData.next({ type: 'DATA', values: this.allData});
        if(this.allData.length >= this.LIMIT_SIZE) {
          this.pageData.next({ type: 'EVENT', event: 'LIMIT_REACHED'});
        }
      }
    }, Math.floor(Math.random() * 1000) + 500); // random beteen 500ms and 5000ms
  }

  dataRequest(chunk) {
    this.fakeRequest(chunk);
  }
}

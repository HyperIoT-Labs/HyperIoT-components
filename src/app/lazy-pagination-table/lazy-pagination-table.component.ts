import { Component, OnInit, ViewChild } from '@angular/core';
import { HytLazyPaginationTableComponent } from 'projects/components/src/lib/hyt-lazy-pagination-table/hyt-lazy-pagination-table.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-lazy-pagination-table',
  templateUrl: './lazy-pagination-table.component.html',
  styleUrls: ['./lazy-pagination-table.component.scss']
})
export class LazyPaginationTableComponent implements OnInit {

  @ViewChild('tableChild', { static: false }) tableChild: HytLazyPaginationTableComponent;

  fakeTotalLength = 16;

  pageData: Subject<any[]>;

  timeOut;

  ngOnInit(): void {
    this.pageData = new Subject<any[]>();
  }

  submitNumRows(num: number) {
    this.fakeTotalLength = num;
    this.tableChild.resetTable(this.fakeTotalLength, true);
  }

  fakeRequest(event) {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(() => {
      const data = [];
      for (let i = event[0]; i < event[1]; i++) {
        data.push({ random: Math.random(), random2: Math.random() });
      }
      this.pageData.next(data);
    }, Math.floor(Math.random() * 1000) + 500); // random beteen 500ms and 5000ms
  }

  pageRequest(event) {
    this.fakeRequest(event);
  }

}

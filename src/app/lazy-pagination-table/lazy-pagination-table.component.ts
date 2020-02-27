import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy-pagination-table',
  templateUrl: './lazy-pagination-table.component.html',
  styleUrls: ['./lazy-pagination-table.component.scss']
})
export class LazyPaginationTableComponent implements OnInit {

  fakeTotalLength = 16;

  pageData;

  timeOut;

  ngOnInit(): void {
    //this.fakeRequest();
  }

  fakeRequest(event) {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(() => {
      this.pageData = [];
      for (let i = event[0]; i < event[1]; i++) {
        this.pageData.push({ data: Math.random(), data2: Math.random() });
      }
    }, Math.floor(Math.random() * 1000) + 500); // random beteen 500ms and 5000ms
  }

  pageRequest(event) {
    this.fakeRequest(event);
  }

}

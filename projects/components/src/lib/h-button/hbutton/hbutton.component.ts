import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'h-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hbutton.component.html',
  styleUrls: ['./hbutton.component.scss']
})
export class HButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

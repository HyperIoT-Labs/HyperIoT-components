import { Component, OnInit, Input } from '@angular/core';

export interface Option {
  value: string;
  label: string;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-select',
  templateUrl: './hyt-select.component.html',
  styleUrls: ['./hyt-select.component.css']
})
export class HytSelectComponent implements OnInit {
  /**
   * Select main label
   */
  @Input() title = '';

  /**
   * Array of displayed options
   */
  @Input() options: Option[] = [];

  constructor() { }

  ngOnInit() {
  }

}

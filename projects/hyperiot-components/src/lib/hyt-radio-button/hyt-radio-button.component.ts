import { Component, OnInit, Input } from '@angular/core';

export class Option {
  value: string;
  label: string;
}

@Component({
  selector: 'hyt-radio-button',
  templateUrl: './hyt-radio-button.component.html',
  styleUrls: ['./hyt-radio-button.component.scss']
})
export class HytRadioButtonComponent implements OnInit {
  /** Array of the available options */
  @Input() options: Option[];

  constructor() { }

  ngOnInit() {
  }

}

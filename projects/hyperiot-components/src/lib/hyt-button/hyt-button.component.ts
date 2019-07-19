import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hyt-button',
  templateUrl: './hyt-button.component.html',
  styleUrls: ['./hyt-button.component.scss']
})
export class HytButtonComponent implements OnInit {
  /** Specifies button color: primary, accent or warn */
  @Input() color: string;

  /** Disables the button */
  @Input() isDisabled: boolean;

  constructor() { }

  ngOnInit() {
  }

}

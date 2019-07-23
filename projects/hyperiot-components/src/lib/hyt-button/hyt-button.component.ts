import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';

/**
 * Wrapper for the botton element.
 */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-button',
  templateUrl: './hyt-button.component.html',
  styleUrls: ['./hyt-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HytButtonComponent implements OnInit {
  /** Specifies button color: primary, accent or warn */
  @Input() color: string;

  /** Disables the button */
  @Input() isDisabled: boolean;

  /** Function called when click event is triggered */
  @Output() clickFn: EventEmitter<any> = new EventEmitter();

  /**
   * constructor
   */
  constructor() { }

  /**
   * ngOnInit
   */
  ngOnInit() { }

  /**
   * Callback for click.
   */
  clickCallback() {
    if (!this.isDisabled) {
      this.clickFn.emit();
    }
  }
}

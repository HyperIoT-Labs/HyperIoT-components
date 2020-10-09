import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hyt-button-toggle',
  templateUrl: './hyt-button-toggle.component.html',
  styleUrls: ['./hyt-button-toggle.component.css']
})
export class HytButtonToggleComponent {

  /**
   * Input of the selected value
   */
  @Input() selectedValue;

  /**
   * Input of the values range
   */
  @Input() range;

  /**
   * Output of the selected value changes
   */
  @Output() valueChanged: EventEmitter<any> = new EventEmitter();

}

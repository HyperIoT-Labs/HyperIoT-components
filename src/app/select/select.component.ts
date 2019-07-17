import { Component, OnInit } from '@angular/core';
import { SelectOption } from '../../../projects/hyperiot-components/src/lib/hyt-select/hyt-select.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  /** Selected element */
  selected: any;

  /** Select options */
  options: SelectOption[] = [
    { value: 'steak-0', label: 'Steak' },
    { value: 'pizza-1', label: 'Pizza' },
    { value: 'tacos-2', label: 'Tacos' },
  ];

  constructor() { }

  ngOnInit() {
  }

}

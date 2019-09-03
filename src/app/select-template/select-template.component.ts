import { Component, OnInit } from '@angular/core';
import { SelectOption } from 'hyperiot-components/public-api';

@Component({
  selector: 'app-select-template',
  templateUrl: './select-template.component.html',
  styleUrls: ['./select-template.component.scss']
})
export class SelectTemplateComponent implements OnInit {
  /** Selected element */
  selected: any;

  /** Select options */
  options: SelectOption[] = [
    { label: 'None' },
    { value: 'steak-0', label: 'Steak' },
    { value: 'pizza-1', label: 'Pizza' },
    { value: 'tacos-2', label: 'Tacos' },
  ];

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    console.log('onChange called');
    console.log(event);
  }

  submit() { }
}

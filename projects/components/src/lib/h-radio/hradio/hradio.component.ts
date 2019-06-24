import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'h-radio',
  templateUrl: './hradio.component.html',
  styleUrls: ['./hradio.component.css']
})
export class HRadioComponent implements OnInit {

  options = [
    { value: 'This is value 1', label: 'Option 1' },
    { value: 'This is value 2', label: 'Option 2' },
    { value: 'This is value 3', label: 'Option 3' },
    { value: 'This is value 4', label: 'Option 4' },
  ];
  option;

  constructor() { }

  ngOnInit() {
  }

}

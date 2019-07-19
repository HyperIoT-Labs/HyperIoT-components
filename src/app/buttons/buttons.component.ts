import { Component, OnInit } from '@angular/core';
import { Option } from '../../../projects/hyperiot-components/src/lib/hyt-radio-button/hyt-radio-button.component';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  options: Option[] = [
    {
      value: 'Option1',
      label: 'Option1'
    },
    {
      value: 'Option2',
      label: 'Option2'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}

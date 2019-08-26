import { Component, OnInit } from '@angular/core';
import { Option } from '../../../projects/hyperiot-components/src/lib/hyt-radio-button/hyt-radio-button.component';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  selectedOption: any;

  checked: boolean;

  options: Option[] = [
    {
      value: 'option1',
      label: 'Option1'
    },
    {
      value: 'option2',
      label: 'Option2'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    console.log('clicked');
  }

  onClickCheckbox() {
    console.log('checked=' + this.checked);
  }

  onChangeRadio(e: any) {
    if (this.selectedOption) {
      console.log(this.selectedOption.value);
    }
    console.log('onChangeRadio: ' + e.value);
  }
}

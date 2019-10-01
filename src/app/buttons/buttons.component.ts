import { Component, OnInit } from '@angular/core';
import { Option } from '../../../projects/hyperiot-components/src/lib/hyt-radio-button/hyt-radio-button.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoggerService, Logger } from "@hyperiot/core";

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {
  form: FormGroup;
  form1: FormGroup;
  form2: FormGroup;

  private logger: Logger;

  selectedOption: any;

  checked: boolean;

  options: Option[] = [
    {
      value: 'option1',
      label: 'Option1',
      checked: true
    },
    {
      value: 'option2',
      label: 'Option2'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private loggerService: LoggerService
  ) {
    this.logger = new Logger(this.loggerService);
    this.logger.registerClass('ButtonsComponent');
  }

  ngOnInit() {
    this.form = this.fb.group({});
    this.form1 = this.fb.group({});
    this.form2 = this.fb.group({});
  }

  onClick() {
    this.logger.debug('clicked', event);
  }

  onClickCheckbox() {
    this.checked = !this.checked;
    this.logger.debug('checked = ' + this.checked);
  }

  onChangeRadio(e: any) {
    if (this.selectedOption) {
      this.logger.debug(this.selectedOption.value);
    }
    this.logger.debug('onChangeRadio: ' + e.value);
  }

  submit() { }
}

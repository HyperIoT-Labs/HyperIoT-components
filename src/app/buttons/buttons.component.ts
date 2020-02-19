import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Logger, LoggerService } from '@hyperiot/core';
import { Option } from '../../../projects/components/src/lib/hyt-radio-button/hyt-radio-button.component';

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

  checked: any;

  checked2: any;

  checked3 = true;

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

  onClickCheckbox(value) {
    this.checked = !this.checked;
    this.logger.debug('checked = ' + this.checked);
  }

  onClickCheckbox2(value) {
    console.log('checked=' + this.checked2, value);
  }

  onClickCheckbox3(value) {
    this.checked3 = !this.checked3;
    this.logger.debug('checked = ' + this.checked3);
  }

  onChangeRadio(e: any) {
    if (this.selectedOption) {
      this.logger.debug(this.selectedOption.value);
    }
    this.logger.debug('onChangeRadio: ' + e.value);
  }

  submit() { }
}

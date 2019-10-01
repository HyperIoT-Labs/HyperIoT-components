import { Component, OnInit } from '@angular/core';
import { SelectOption } from 'projects/hyperiot-components/src/public-api';
import { Logger, LoggerService } from '@hyperiot/core';

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

  private logger: Logger;

  constructor(private loggerService: LoggerService) {
    this.logger = new Logger(this.loggerService);
    this.logger.registerClass('SelectTemplateComponent');
   }

  ngOnInit() {
  }

  onChange(event) {
    this.logger.debug('onChange method called', event);
  }

  submit() { }
}

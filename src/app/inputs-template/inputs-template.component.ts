import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LoggerService, Logger } from '@hyperiot/core';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs-template.component.html',
  styleUrls: ['./inputs-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputsTemplateComponent implements OnInit {

  form: FormGroup;

  inputText: string;

  injectedErrorState = false;

  username = 'err';

  private logger: Logger;

  constructor(
    private fb: FormBuilder, private loggerService: LoggerService
  ) {
    this.logger = new Logger(this.loggerService);
    this.logger.registerClass('InputsTemplateComponent');
   }

  ngOnInit() {
    this.form = this.fb.group({});
  }

  onChange(event: any) {
    this.logger.debug('onChange2 method called', event.target.value);
    this.inputText = event.target.value;
  }

  toogleErrorState() {
    this.injectedErrorState = !this.injectedErrorState;
  }

  submit() {
    if (this.injectedErrorState) {
      this.username = 'lo username esiste già';
      this.form.get('username').setErrors({
        validateInjectedError: {
          valid: false
        }
      });
    }
  }
}

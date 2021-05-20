import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Logger, LoggerService } from '@hyperiot/core';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputsComponent implements OnInit {

  isFormInvalid(): boolean {
    console.log(this.form.get('required'));
    return  this.form.get('required').invalid;
  }
  
  private logger: Logger;

  form: FormGroup;

  inputText: string;

  injectedErrorState = false;

  username = 'err';

  constructor(
    private fb: FormBuilder,
    private loggerService: LoggerService
  ) {
    this.logger = new Logger(this.loggerService);
    this.logger.registerClass('InputsComponent');
  }

  ngOnInit() {
    this.form = this.fb.group({});
  }

  onChange(event: any) {
    this.logger.debug('onChange method called', event.target.value);
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

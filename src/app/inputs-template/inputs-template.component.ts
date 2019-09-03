import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({});
  }

  onChange(event: any) {
    console.log('onChange2 called');
    console.log(event.target.value);
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

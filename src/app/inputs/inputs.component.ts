import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputsComponent implements OnInit {

  form: FormGroup;

  inputText: string;

  injectedErrorState = true;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({});
  }

  onChange(event: any) {
    console.log('onChange2 called');
    console.log(event.target.value);
  }

  toogleErrorState() {
    this.injectedErrorState = !this.injectedErrorState;
  }
}

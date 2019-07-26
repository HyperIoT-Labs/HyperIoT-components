import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputsComponent implements OnInit {

  inputText: string;

  inputText2: string;

  injectedErrorState = true;

  constructor() { }

  ngOnInit() {
  }

  onChange(event: any) {
    console.log('onChange2 called');
    console.log(event.target.value);
  }

  toogleErrorState() {
    this.injectedErrorState = !this.injectedErrorState;
    this.inputText2 += ' ';
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {

  inputText: string;

  constructor() { }

  ngOnInit() {
  }

  onChange(event: any) {
    console.log('onChenge2 called');
    console.log(event.target.value);
  }
}

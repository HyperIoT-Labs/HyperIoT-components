import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'h-input',
  templateUrl: './h-input.component.html',
  styleUrls: ['./h-input.component.css']
})
export class HInputComponent implements OnInit {

  @Input() placeHolder: string;

  @Input() value: string;

  constructor() { }

  ngOnInit() {
  }

}

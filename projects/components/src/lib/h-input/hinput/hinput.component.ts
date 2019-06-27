import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'h-input',
  templateUrl: './hinput.component.html',
  styleUrls: ['./hinput.component.css']
})
export class HInputComponent implements OnInit {

  @Input() disabled: boolean;

  @Input() placeholder: string;

  constructor() { }

  ngOnInit() {
  }

}

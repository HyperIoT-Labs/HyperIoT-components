import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hyt-step',
  templateUrl: './hyt-step.component.html',
  styleUrls: ['./hyt-step.component.css']
})
export class HytStepComponent implements OnInit {

  @Input() stepControl: string;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'hyt-modal',
  templateUrl: './hyt-modal.component.html',
  styleUrls: ['./hyt-modal.component.css']
})
export class HytModalComponent {

  @Input('mOpen') mOpen: boolean = false;

  constructor() { }

}

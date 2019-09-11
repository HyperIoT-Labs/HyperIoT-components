import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-tag',
  templateUrl: './hyt-tag.component.html',
  styleUrls: ['./hyt-tag.component.scss']
})
export class HytTagComponent implements OnInit {

  @Input() color: string;

  isSelected: boolean;
  @Input()
  get selected(): boolean {
    return this.isSelected;
  }
  set selected(s: boolean) {
    this.isSelected = s;
  }

  @Input() selectable: boolean;

  isDisabled: boolean;
  @Input()
  get disabled(): boolean {
    return this.isDisabled;
  }
  set disabled(d: boolean) {
    this.isDisabled = d;
  }

  @Input() removable: boolean;

  @Output() removed: EventEmitter<any> = new EventEmitter();

  @Output() clickFn: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  click(event: any) {
    this.clickFn.emit(event);
  }

  removedFn(event: any) {
    this.removed.emit(event);
  }
}

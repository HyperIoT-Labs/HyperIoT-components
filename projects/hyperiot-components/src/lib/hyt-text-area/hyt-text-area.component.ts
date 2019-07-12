import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-text-area',
  templateUrl: './hyt-text-area.component.html',
  styleUrls: ['./hyt-text-area.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HytTextAreaComponent),
    multi: true,
  }]
})
export class HytTextAreaComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: any = '';

  @Input() fieldValue: string;

  @Input() type: string;

  @Input() id: string;

  value: any = '';

  // @ViewChild('inputElement', {}) private inputElement: ElementRef;

  constructor(
    private renderer: Renderer2,
  ) { }

  ngOnInit() { }

  private onChangeFn = (_: any) => { };
  private onTouchedFn = () => { };

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  onChange(event: any) {
    this.onChangeFn(event.target.value);
  }

  onKeyup(event: any) {
    this.onChangeFn(event.target.value);
  }

  onBlur(event: any) {
    this.onTouchedFn();
  }


}

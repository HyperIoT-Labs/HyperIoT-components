import { Component, OnInit, forwardRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';

/**
 * Custom provider for NG_VALUE_ACCESSOR
 */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => HytTriCheckboxComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-tri-checkbox',
  templateUrl: './hyt-tri-checkbox.component.html',
  styleUrls: ['./hyt-tri-checkbox.component.scss'],
  providers: [
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'noop' }
  ],
  encapsulation: ViewEncapsulation.None
})
export class HytTriCheckboxComponent implements OnInit {

  tape = [null, true, false];

  done = null;

  doneControl = new FormControl(false);

  /** Function called when click event is triggered */
  @Output() clickFn: EventEmitter<any> = new EventEmitter();

  /** The internal data */
  innerValue: any = '';

  /** Callback function for change event */
  private onChangeFn = (_: any) => { };

  /** Callback function for blur event */
  private onTouchedFn = () => { };

  constructor() { }

  ngOnInit() {
  }

  onClick(event) {
    const newValue: any = this.tape[(this.tape.indexOf(this.doneControl.value) + 1) % this.tape.length];
    this.doneControl.setValue(newValue);
    this.innerValue = this.done;
    this.clickFn.emit(event);
  }

  /** get accessor */
  get value(): any {
    return this.innerValue;
  }

  /** set accessor including call the onchange callback  */
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeFn(v);
    }
  }

  /**
   * ControlValueAccessor.
   * Set the internal value
   */
  writeValue(value: any): void {
    this.innerValue = value;
  }

  /**
   * ControlValueAccessor.
   * Set onChange function
   */
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  /**
   * ControlValueAccessor.
   * Set onTouched function
   */
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

}

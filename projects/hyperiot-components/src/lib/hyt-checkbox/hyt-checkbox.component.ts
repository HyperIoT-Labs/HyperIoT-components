import { Component, OnInit, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * Custom provider for NG_VALUE_ACCESSOR
 */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => HytCheckboxComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-checkbox',
  templateUrl: './hyt-checkbox.component.html',
  styleUrls: ['./hyt-checkbox.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})

export class HytCheckboxComponent implements OnInit, ControlValueAccessor {

  /** The internal data */
  private innerValue: any = '';

  /** Callback function for change event */
  private onChangeFn = (_: any) => { };

  /** Callback function for blur event */
  private onTouchedFn = () => { };

  constructor() { }

  ngOnInit() {
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

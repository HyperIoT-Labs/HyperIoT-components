import { Component, OnInit, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators, FormGroup } from '@angular/forms';

/** Interface for select option element */
export interface SelectOption {
  value?: string;
  label: string;
}

/** Interface for a group of select options element */
export interface SelectOptionGroup {
  disabled?: boolean;
  name: string;
  options: SelectOption[];
}

/** Custom provider for NG_VALUE_ACCESSOR */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => HytSelectTemplateComponent),
  multi: true
};

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-select-template',
  templateUrl: './hyt-select-template.component.html',
  styleUrls: ['./hyt-select-template.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class HytSelectTemplateComponent implements OnInit, ControlValueAccessor {

  /** Selected element */
  selected: any;

  /** Element name, connected to the formcontrol */
  @Input() name = '';

  /** Select main label */
  @Input() label = '';

  /** Array of displayed options */
  @Input() options: SelectOption[] = [];

  /** Array of displayed group options */
  @Input() groups: SelectOptionGroup[] = [];

  /** Optional select hint */
  @Input() hint: string;

  /** Specifies if the select form is required */
  @Input() isRequired: boolean;

  /** Error displayed in case of required form */
  @Input() errorMsgRequired: string;

  /** Disable the select */
  @Input() disabled = false;

  /** Specifies if it is a multiple select */
  @Input() isMultiple = false;

  /**
   * Map an error key with the displayed message
   */
  errorMap = {
    required: 'The field is required.',
  };

  /**
   * Callback functions for change
   */
  private onChangeFn = (_: any) => { };

  /**
   * Callback functions for blur
   */
  private onTouchedFn = () => { };

  /**
   * Constructor
   */
  constructor() { }

  /**
   * ngOnInit
   */
  ngOnInit() {
  }

  // get accessor
  get value(): any {
    return this.selected;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.selected) {
      this.selected = v;
      this.onChangeFn(v);
    }
  }

  writeValue(value: any): void {
    this.selected = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

}

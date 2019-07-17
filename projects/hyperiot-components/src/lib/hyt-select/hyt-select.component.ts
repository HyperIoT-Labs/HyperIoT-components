import { Component, OnInit, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators } from '@angular/forms';

/** Interface for select option element */
export interface SelectOption {
  value: string;
  label: string;
}

/** Custom provider for NG_VALUE_ACCESSOR */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => HytSelectComponent),
  multi: true
};

/**
 * Wrapper for a select element.
 * This compoenent allows to select an element in a set of options.
 */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-select',
  templateUrl: './hyt-select.component.html',
  styleUrls: ['./hyt-select.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class HytSelectComponent implements OnInit, ControlValueAccessor {
  /** Selected element */
  selected: any;

  /** formControl */
  @Input() formControl: FormControl;

  /** Select main label */
  @Input() label = '';

  /** Array of displayed options */
  @Input() options: SelectOption[] = [];

  /** Optional select hint */
  @Input() hint: string;

  /** Specifies if the select form is required */
  @Input() isRequired: boolean;

  /** Error displayed in case of required form */
  @Input() errorMsgRequired: string;

  errorMap = {
    required: 'The field is required.',
  };

  /**
   * Callback functions for change and blur
   */
  private onChangeFn = (_: any) => { };
  private onTouchedFn = () => { };

  constructor() { }

  ngOnInit() {
    const validators = [];
    if (this.isRequired) {
      validators.push(Validators.required);
      this.label += ' *';
    }
    this.formControl = new FormControl('', Validators.compose(validators));
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

  getErrorList(): string[] {
    const errorList: string[] = [];
    for (const key in this.formControl.errors) {
      if (this.formControl.errors.hasOwnProperty(key)) {
        if (this.errorMap.hasOwnProperty(key)) {
          errorList.push(this.errorMap[key]);
        }
      }
    }
    return errorList;
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

  onBlur() {
    this.onTouchedFn();
  }
}

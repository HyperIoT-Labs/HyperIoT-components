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

  /** FormGroup */
  @Input() form: FormGroup;

  /** formControl */
  @Input() formControl: FormControl;

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
  @Input() onChangeFn = (_: any) => { };

  /**
   * Callback functions for blur
   */
  @Input() onTouchedFn = () => { };

  /**
   * Callback functions for blur
   */
  @Input() onBlur = () => { };

  /**
   * Constructor
   */
  constructor() { }

  /**
   * ngOnInit
   */
  ngOnInit() {
    const validators = [];
    if (this.isRequired) {
      validators.push(Validators.required);
      this.label += ' *';
    }
    this.formControl = new FormControl('', Validators.compose(validators));
    if (this.disabled) {
      this.formControl.disable();
    }
    if (this.form) {
      this.form.addControl(this.name, this.formControl);
    }
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

}

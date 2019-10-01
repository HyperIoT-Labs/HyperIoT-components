import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { I18n } from '@ngx-translate/i18n-polyfill';

/**
 * Class used to represent a select option.
 * Label is the displayed field and value is the real value.
 */
export class Option {
  value: string;
  label: string;
  checked?: boolean;
}

/**
 * Custom provider for NG_VALUE_ACCESSOR
 */
export const CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => HytRadioButtonComponent),
  multi: true
};

/**
 * Wrapper for the radio buttons.
 */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-radio-button',
  templateUrl: './hyt-radio-button.component.html',
  styleUrls: ['./hyt-radio-button.component.scss'],
  providers: [CUSTOM_RADIO_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class HytRadioButtonComponent implements OnInit, ControlValueAccessor {
  /** The internal data */
  private innerValue: any = '';

  /** FormGroup */
  @Input() form: FormGroup;

  /** FormControl */
  @Input() formControl: FormControl;

  /** Element name, connected to the formcontrol */
  @Input() name = '';

  /** Select main label */
  @Input() label: string;

  /** Specifies button label position */
  @Input() labelPosition: string;

  /** Specifies button label position */
  @Input() verticalAlign: boolean;

  /** Array of the available options */
  @Input() options: Option[];

  /** Function called when click event is triggered */
  @Output() changeFn: EventEmitter<any> = new EventEmitter();

  /** Applies required validation */
  @Input() isRequired = false;

  /** Map error type with default error string */
  errorMap = {
    required: this.i18n('HYT_field_required'), // 'The field is required.',
    validateRequired: this.i18n('HYT_field_required'), // 'The field is required.',
  };

  /**
   * Callback function for change event
   */
  private onChangeFn = (_: any) => { };

  /**
   * Callback function for blur event
   */
  private onTouchedFn = () => { };

  /**
   * constructor
   */
  constructor(
    private i18n: I18n,
  ) { }

  /**
   * ngOnInit
   */
  ngOnInit() {
    const validators = [];

    if (this.isRequired) {
      validators.push(Validators.required);
    }

    this.formControl = new FormControl('', Validators.compose(validators));

    // set checked option
    for (const option of this.options) {
      if (option.checked) {
        this.formControl.setValue(option.value);
      }
    }
    if (this.form) {
      this.form.addControl(this.name, this.formControl);
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

  /**
   * get accessor
   */
  get value(): any {
    return this.innerValue;
  }

  /**
   * set accessor including call the onchange callback
   */
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeFn(v);
    }
  }

  writeValue(v: any): void {
    this.innerValue = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  onChange(e: any) {
    this.changeFn.emit(e.value);
    this.onChangeFn(e.value);
  }
}

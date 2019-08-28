import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Class used to represent a select option.
 * Label is the displayed field and value is the real value.
 */
export class Option {
  value: string;
  label: string;
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
  formControl: FormControl;

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
  constructor() { }

  /**
   * ngOnInit
   */
  ngOnInit() {
    const validators = [];

    if (this.isRequired) {
      validators.push(Validators.required);
    }

    this.formControl = new FormControl('', Validators.compose(validators));
    if (this.form) {
      this.form.addControl(this.name, this.formControl);
    }
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
    this.changeFn.emit(e);
    this.onChangeFn(e);
  }
}

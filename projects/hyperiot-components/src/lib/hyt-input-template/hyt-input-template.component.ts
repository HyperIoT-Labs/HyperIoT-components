import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroupDirective,
  NgForm,
  FormControl,
  Validators,
  FormGroup
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Observable } from 'rxjs';

/**
 * Custom provider for NG_VALUE_ACCESSOR
 */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => HytInputTemplateComponent),
  multi: true
};

/**
 * Error when invalid control is dirty, touched, or submitted
 */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * Wrapper for text input, this component allows to insert a text field.
 * Input validation is performed using an attribute that specifies validation type.
 * Supported validations are:
 *
 * isRequired: mandatory field
 * isEmail: email validation
 * isPassword: password validation
 * isInputPassword: password without validators
 */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-input-template',
  templateUrl: './hyt-input-template.component.html',
  styleUrls: ['./hyt-input-template.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class HytInputTemplateComponent implements OnInit, ControlValueAccessor {
  /** Foloating label of the input */
  @Input() placeholder: any = '';

  /** Initial field value */
  @Input() fieldValue: string;

  /** Element id */
  @Input() id = '';

  /** Element name, connected to the formcontrol */
  @Input() name = '';

  /** Type of the input: text or passowrd */
  @Input() type = '';

  /** Optional additional hint */
  @Input() hint = '';

  /** If 'bottom' is specified errors appears at the bottom */
  @Input() errorPosition = '';

  /** ViewChild */
  @ViewChild('input', { static: false }) private inputElement: ElementRef;

  /** Applies required validation */
  @Input() isRequired = false;

  /** Applies required validation */
  @Input() isDisabled = false;

  /** Applies pattern validation */
  @Input() pattern: RegExp;

  /** The internal data */
  private innerValue: any = '';

  /** Custom error matcher */
  matcher = new CustomErrorStateMatcher();

  /** The password visibility icon */
  visibilityIcon = 'visibility';

  /** Map error type with default error string */
  errorMap = {
    required: this.i18n('HYT_field_required'), // 'The field is required.',
    validateRequired: this.i18n('HYT_field_required'),
    email: this.i18n('HYT_valid_email'),
    minlength: this.i18n('HYT_min_length'),
    validateNumber: this.i18n('HYT_min_one_number'),
    validateUperCase: this.i18n('HYT_upper_case'),
    validateSpecialChar: this.i18n('HYT_special_char'),
    validateConfirmPassword: 'Password Mismatch',
    validatePassword: 'Password must be valid',
    validateInjectedError: ''
  };

  /**
   * Default errors are displayed at the top of the field
   */
  private defaultErrors: string[] = [
    'required',
    'validateRequired',
    'email',
    'validateConfirmPassword',
    'validatePassword',
    'validateInjectedError'
  ];

  /** Callback function for change event */
  private onChangeFn = (_: any) => { };

  /** Callback function for blur event */
  private onTouchedFn = () => { };

  /**
   * Constructor
   */
  constructor(
    private i18n: I18n,
  ) { }

  /**
   * ngOnInit
   */
  ngOnInit() {
    if (this.fieldValue !== undefined) {
      this.innerValue = this.fieldValue;
    }
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

  /** onChange callback */
  onChange(event: any) {
    console.log('onChange called');
    console.log(JSON.stringify(event));
    this.onChangeFn(event);
  }

  /** onKeyup callback */
  onKeyup(event: any) {
    console.log('onKeyup called');
    this.onChangeFn(event.target.value);
  }

  /** onBlur callback */
  onBlur() {
    console.log('onBlur called');
    this.onTouchedFn();
  }

}

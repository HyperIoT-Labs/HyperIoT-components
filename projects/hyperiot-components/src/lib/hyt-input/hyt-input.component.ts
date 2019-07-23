import { Component, OnInit, Input, ViewChild, ElementRef, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * Custom provider for NG_VALUE_ACCESSOR
 */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => HytInputComponent),
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
 */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-input-text',
  templateUrl: './hyt-input.component.html',
  styleUrls: ['./hyt-input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class HytInputComponent implements OnInit, ControlValueAccessor {
  /**
   * Binding variables with the input element
   */
  @Input() formControl: FormControl;
  @Input() placeholder: any = '';
  @Input() fieldValue: string;
  @Input() id = '';
  @Input() type = '';
  @Input() hint = '';
  @Input() errorPosition = '';

  // @ViewChild('inputElement', { static: false }) private inputElement: ElementRef;

  @Input() errorMsgRequired: string;
  @Input() errorMsgEmail: string;
  @Input() errorMsgMinLength: string;
  @Input() errorMsgOneNumber: string;
  @Input() errorMsgUpperCase: string;
  @Input() errorMsgSpecialChar: string;

  @Input() isRequired = false;
  @Input() isEmail = false;
  @Input() isPassword = false;

  /** The internal data */
  private innerValue: any = '';

  /** Custom error matcher */
  matcher = new CustomErrorStateMatcher();

  /** The password visibility icon */
  visibilityIcon = 'visibility';

  /** Map error type with default error string */
  errorMap = {
    required: 'The field is required.',
    email: 'Please insert a valid email.',
    minlength: 'Password should be at least 6 char long.',
    validateNumber: 'Password should contain at least one number.',
    validateUperCase: 'Password should contain at least one uppercase letter.',
    validateSpecialChar: 'Password should contain at least one special character.'
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
  ) { }

  /**
   * ngOnInit
   */
  ngOnInit() {
    const validators = [];

    function validateUperCase(c: FormControl) {
      const PASS_REGEX: RegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z]).*$');
      return PASS_REGEX.test(c.value) || c.value.length === 0 ? null : {
        validateUperCase: {
          valid: false
        }
      };
    }
    function validateNumber(c: FormControl) {
      const PASS_REGEX: RegExp = new RegExp('^(?=.*[a-z])(?=.*[1-9]).*$');
      return PASS_REGEX.test(c.value) || c.value.length === 0 ? null : {
        validateNumber: {
          valid: false
        }
      };
    }
    function validateSpecialChar(c: FormControl) {
      const PASS_REGEX: RegExp = new RegExp('[^A-Za-z0-9]');
      return PASS_REGEX.test(c.value) || c.value.length === 0 ? null : {
        validateSpecialChar: {
          valid: false
        }
      };
    }

    if (this.isRequired) {
      validators.push(Validators.required);
      this.placeholder += ' *';
    }
    if (this.isEmail) {
      validators.push(Validators.email);
    }
    if (this.isPassword) {
      validators.push(Validators.minLength(6));
      validators.push(validateUperCase);
      validators.push(validateNumber);
      validators.push(validateSpecialChar);
    }

    if (this.errorMsgRequired) {
      this.errorMap.required = this.errorMsgRequired;
    }
    if (this.errorMsgEmail) {
      this.errorMap.email = this.errorMsgEmail;
    }
    if (this.errorMsgMinLength) {
      this.errorMap.minlength = this.errorMsgMinLength;
    }
    if (this.errorMsgOneNumber) {
      this.errorMap.validateNumber = this.errorMsgOneNumber;
    }
    if (this.errorMsgUpperCase) {
      this.errorMap.validateUperCase = this.errorMsgUpperCase;
    }
    if (this.errorMsgSpecialChar) {
      this.errorMap.validateSpecialChar = this.errorMsgSpecialChar;
    }

    this.formControl = new FormControl('', Validators.compose(validators));
    //  this.form.addControl(this.fieldName, this.formControl);
  }

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
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

  tooglePassword() {
    if (this.type === 'password') {
      this.type = 'text';
      this.visibilityIcon = 'visibility_off';
    } else {
      this.type = 'password';
      this.visibilityIcon = 'visibility';
    }
  }

  writeValue(value: any): void {
    this.innerValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  onChange(event: any) {
    console.log('onChange called');
    console.log(JSON.stringify(event));
    this.onChangeFn(event);
  }

  onKeyup(event: any) {
    console.log('onKeyup called');
    this.onChangeFn(event.target.value);
  }

  onBlur() {
    console.log('onBlur called');
    this.onTouchedFn();
  }

}

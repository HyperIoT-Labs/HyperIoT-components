import { Component, OnInit, Input, ViewChild, ElementRef, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * Custom provider for NG_VALUE_ACCESSOR
 */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
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
  styleUrls: ['./hyt-input.component.css'],
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

  @ViewChild('inputElement', { static: false }) private inputElement: ElementRef;

  @Input() errorMsgRequired: string;
  @Input() errorMsgEmail: string;
  @Input() errorMsgMinLength: string;
  @Input() errorMsgOneNumber: string;
  @Input() errorMsgUpperCase: string;

  @Input() isRequired = false;
  @Input() isEmail = false;
  @Input() isPassword = false;

  /**
   * The internal data
   */
  private innerValue: any = '';

  matcher = new CustomErrorStateMatcher();

  errorMap = {
    required: 'The field is required.',
    email: 'Please insert a valid email.',
    minlength: 'Password should be at least 6 char long.',
    validateNumber: 'Password should contain at least one number.',
    validateUperCase: 'Password should contain at least one uppercase letter.'
  };

  /**
   * Callback functions for change and blur
   */
  private onChangeFn = (_: any) => { };
  private onTouchedFn = () => { };

  constructor(
  ) { }

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
    if (this.isRequired) {
      validators.push(Validators.required);
      this.placeholder += '*';
    }
    if (this.isEmail) {
      validators.push(Validators.email);
    }
    if (this.isPassword) {
      validators.push(Validators.minLength(6));
      validators.push(validateUperCase);
      validators.push(validateNumber);
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
    this.formControl = new FormControl('', Validators.compose(validators));
    //  this.form.addControl(this.fieldName, this.formControl);
  }

  hasErrorForm(): boolean {
    for (const key in this.formControl.errors) {
      if (this.formControl.errors.hasOwnProperty(key)) {
        return true;
      }
    }
    return false;
  }

  getErrorMessage(): string {
    for (const key in this.formControl.errors) {
      if (this.formControl.errors.hasOwnProperty(key)) {
        if (this.errorMap.hasOwnProperty(key)) {
          return this.errorMap[key];
        }
      }
    }
    return '';
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

  onBlur(event: any) {
    console.log('onBlur called');
    this.onTouchedFn();
  }

}

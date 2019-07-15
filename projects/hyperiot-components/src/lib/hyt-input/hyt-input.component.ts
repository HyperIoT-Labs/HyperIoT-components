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
  @Input() hint = '';

  @ViewChild('inputElement', { static: false }) private inputElement: ElementRef;

  @Input() errorMsgRequired: string;
  @Input() errorMsgEmail: string;

  @Input() isRequired = false;
  @Input() isEmail = false;
  @Input() isPassword = false;

  /**
   * The internal data
   */
  private innerValue: any = '';

  /**
   * Callback functions for change and blur
   */
  private onChangeFn = (_: any) => { };
  private onTouchedFn = () => { };

  matcher = new CustomErrorStateMatcher();

  errorMap = {
    required: 'The field is required.',
    email: 'Please insert a valid email.'
  };

  constructor(
  ) { }

  ngOnInit() {
    const validators = [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    if (this.isEmail) {
      validators.push(Validators.email);
    }
    if (this.errorMsgRequired) {
      this.errorMap.required = this.errorMsgRequired;
    }
    if (this.errorMsgEmail) {
      this.errorMap.email = this.errorMsgEmail;
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
        if (key === 'required') {
          return this.errorMap.required;
        } else if (key === 'email') {
          return this.errorMap.email;
        } else {
          return '';
        }
      }
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

  onBlur(event: any) {
    console.log('onBlur called');
    this.onTouchedFn();
  }

}

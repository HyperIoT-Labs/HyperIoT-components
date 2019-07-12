import { Component, OnInit, Input, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** 
 * Error when invalid control is dirty, touched, or submitted. 
 */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * Wrapper for text input, this componenet allow to insert a text field.
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
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HytInputComponent),
    multi: true,
  }]
})
export class HytInputComponent implements OnInit, ControlValueAccessor {
  @Input() formControl: FormControl;
  @Input() placeholder: any = '';
  @Input() fieldValue: string;
  @Input() type: string;
  @Input() id = '';
  @Input() hint = '';

  innerValue: any = '';
  @ViewChild('inputElement', { static: false }) private inputElement: ElementRef;

  @Input() isRequired = false;
  @Input() isEmail = false;
  @Input() isPassword = false;

  matcher = new CustomErrorStateMatcher();

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
          return 'The field is required.';
        } else if (key === 'email') {
          return 'Please insert a valid email.';
        } else {
          return '';
        }
      }
    }
  }

  private onChangeFn = (_: any) => { };
  private onTouchedFn = () => { };

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

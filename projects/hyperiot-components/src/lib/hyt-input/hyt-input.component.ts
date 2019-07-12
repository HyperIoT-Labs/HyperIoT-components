import { Component, OnInit, Input, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroupDirective, NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
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
    this.onChangeFn(event.target.value);
  }

  onKeyup(event: any) {
    this.onChangeFn(event.target.value);
  }

  onBlur(event: any) {
    this.onTouchedFn();
  }

}

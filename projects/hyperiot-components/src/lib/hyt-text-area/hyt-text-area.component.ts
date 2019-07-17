import { Component, OnInit, Input, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * Custom provider for NG_VALUE_ACCESSOR
 */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => HytTextAreaComponent),
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

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-text-area',
  templateUrl: './hyt-text-area.component.html',
  styleUrls: ['./hyt-text-area.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class HytTextAreaComponent implements OnInit, ControlValueAccessor {
  /**
   * Binding variables with text area element
   */
  @Input() formControl: FormControl;
  @Input() placeholder: any = '';
  @Input() fieldValue: string;
  @Input() type: string;
  @Input() id: string;
  @Input() hint = '';

  value: any = '';

  // @ViewChild('inputElement', {}) private inputElement: ElementRef;

  @Input() isRequired = false;
  @Input() errorMsgRequired: string;
  errMsgRequired = 'The field is required';

  matcher = new CustomErrorStateMatcher();

  constructor(
  ) { }

  ngOnInit() {
    const validators = [];
    if (this.isRequired) {
      validators.push(Validators.required);
      this.placeholder += '*';
    }
    if (this.errorMsgRequired) {
      this.errMsgRequired = this.errorMsgRequired;
    }
    this.formControl = new FormControl('', Validators.compose(validators));
  }

  private onChangeFn = (_: any) => { };
  private onTouchedFn = () => { };

  writeValue(obj: any): void {
    this.value = obj;
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

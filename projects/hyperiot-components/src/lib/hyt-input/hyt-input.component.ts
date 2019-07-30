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
  FormGroup,
  FormControlName
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
  @Input() form: FormGroup;
  @Input() formControl: FormControl;
  @Input() placeholder: any = '';
  @Input() fieldValue: string;
  @Input() id = '';
  @Input() name = '';
  @Input() type = '';
  @Input() hint = '';
  @Input() errorPosition = '';

  @ViewChild('input', { static: false }) private inputElement: ElementRef;

  @Input() injectedErrorMsg: string;

  @Input() isRequired = false;
  @Input() isEmail = false;
  @Input() isPassword = false;
  @Input() isInputPassword = false;
  @Input() injectedErrorState = false;

  /** The internal data */
  private innerValue: any = '';

  /** Custom error matcher */
  matcher = new CustomErrorStateMatcher();

  /** The password visibility icon */
  visibilityIcon = 'visibility';

  /** Map error type with default error string */
  errorMap = {
    required: this.i18n('HYT_field_required'), // 'The field is required.',
    email: this.i18n('HYT_valid_email'),
    minlength: this.i18n('HYT_min_length'),
    validateNumber: this.i18n('HYT_min_one_number'),
    validateUperCase: this.i18n('HYT_upper_case'),
    validateSpecialChar: this.i18n('HYT_special_char'),
    validateInjectedError: ''
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
    const self = this;

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
    function validateInjectedError(c: FormControl) {
      return (!self.injectedErrorState) ? null : {
        validateInjectedError: {
          valid: false
        }
      };
    }
    /*
    function userValidator(): AsyncValidatorFn {
      return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return self.injectedErrorState ? null : { userNameExists: true };
              }
            })
          );
      };
*/
    if (this.isRequired) {
      validators.push(Validators.required);
      this.placeholder += ' *';
    }
    if (this.isEmail) {
      validators.push(Validators.email);
    }
    if (this.isPassword) {
      validators.push(Validators.minLength(8));
      validators.push(validateUperCase);
      validators.push(validateNumber);
      validators.push(validateSpecialChar);
    }
    if (this.injectedErrorState) {
      validators.push(validateInjectedError);
    }

    if (this.injectedErrorMsg) {
      this.errorMap.validateInjectedError = this.injectedErrorMsg;
    }

    this.formControl = new FormControl('', Validators.compose(validators));
    this.form.addControl(this.name, this.formControl);
  }

  /** get accessor */
  get value(): any {
    return this.innerValue;
  }

  /** set accessor including call the onchange callback */
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

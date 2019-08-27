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
 * isInputPassword: password without validators
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
  /** FormGroup */
  @Input() form: FormGroup;

  /** FormControl */
  @Input() formControl: FormControl;

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

  /** This error appears in case of injected error */
  @Input()
  set injectedErrorMsg(msg: string) {
    this.injectedError = msg;
    this.errorMap.validateInjectedError = msg;
  }

  /** Applies required validation */
  @Input() isRequired = false;

  /** Applies email validation */
  @Input() isEmail = false;

  /** Applies password validation */
  @Input() isPassword = false;

  /** Applies password type but not password validation */
  @Input() isInputPassword = false;

  /**
   * Applies password type and add confirm validation.
   * Validation will compare the actual value with the formControl specified by this field
   */
  @Input() confirmPassword = '';

  /** The internal data */
  private innerValue: any = '';

  private injectedError = '';

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
    validateConfirmPassword: 'Password Mismatch',
    validateInjectedError: ''
  };

  /**
   * Default errors are displayed at the top of the field
   */
  private defaultErrors: string[] = [
    'required',
    'email',
    'validateConfirmPassword',
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
    function validateConfirmPassword(c: FormControl) {
      const passwordForm = self.form.get(self.confirmPassword);
      let password = '';
      if (passwordForm) {
        password = self.form.get(self.confirmPassword).value;
      }
      return (c.value === password) || c.value.length === 0 ? null : {
        validateConfirmPassword: {
          valid: false
        }
      }
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

    if (this.confirmPassword !== '') {
      validators.push(validateConfirmPassword);
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

  /** set accessor including call the onchange callback  */
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeFn(v);
    }
  }


  /** returns the errors to be displayed in the mat-error tag */
  getMultiErrorList(): string[] {
    const errorList: string[] = [];

    for (const key in this.formControl.errors) {
      if (this.formControl.errors.hasOwnProperty(key) && !this.defaultErrors.includes(key)) {
        if (this.errorMap.hasOwnProperty(key)) {
          errorList.push(this.errorMap[key]);
        }
      }
    }
    return errorList;
  }

  getDefaultErrorList(): string[] {
    const errorList: string[] = [];

    for (const key in this.formControl.errors) {
      if (this.formControl.errors.hasOwnProperty(key)) {
        if (this.errorMap.hasOwnProperty(key) && this.defaultErrors.includes(key)) {
          errorList.push(this.errorMap[key]);
        }
      }
    }
    return errorList;
  }

  /** Toggle the state of the input between text and password */
  tooglePassword() {
    if (this.type === 'password') {
      this.type = 'text';
      this.visibilityIcon = 'visibility_off';
    } else {
      this.type = 'password';
      this.visibilityIcon = 'visibility';
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

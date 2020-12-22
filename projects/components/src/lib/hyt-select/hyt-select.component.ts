import { Component, OnInit, Input, forwardRef, ViewEncapsulation, Output, EventEmitter, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, Validators, FormGroup } from '@angular/forms';

/** Interface for select option element */
export interface SelectOption {
  value?: any;
  label: string;
  disabled?: boolean;
}

/** Interface for a group of select options element */
export interface SelectOptionGroup {
  disabled?: boolean;
  name: string;
  options: SelectOption[];
}

/** Custom provider for NG_VALUE_ACCESSOR */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => HytSelectComponent),
  multi: true
};

/**
 * Wrapper for a select element.
 * This compoenent allows to select an element in a set of options.
 */
@Component({
  selector: 'hyt-select',
  templateUrl: './hyt-select.component.html',
  styleUrls: ['./hyt-select.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class HytSelectComponent implements OnInit, ControlValueAccessor, OnChanges {
  /** Selected element */
  @Input() selected: any;

  /** FormGroup */
  @Input() form: FormGroup;

  /** formControl */
  @Input() formControl: FormControl;

  /** Element name, connected to the formcontrol */
  @Input() name = '';

  /** Select main label */
  @Input() label = '';

  /** Tells if the elements are sortable */
  @Input() isSortable = false;

  /** Specify the element sorting algorithm */
  @Input() sortingAlgorithm = 'A-Z';

  /** Array of displayed options */
  selectOptions: SelectOption[] = [];

  @Input()
  get options(): SelectOption[] {
    return this.selectOptions;
  }
  set options(opts: SelectOption[]) {
    this.selectOptions = opts;
  }

  /** Array of displayed group options */
  @Input() groups: SelectOptionGroup[] = [];

  /** Optional select hint */
  @Input() hint: string;

  /** Specifies if the select form is required */
  @Input() isRequired: boolean;

  /** Error displayed in case of required form */
  @Input() errorMsgRequired: string;

  /** Disable the select */
  isDisabled = false;
  @Input()
  get disabled(): boolean {
    return this.isDisabled;
  }
  set disabled(d: boolean) {
    this.isDisabled = d;
  }

  /** Specifies if it is a multiple select */
  @Input() isMultiple = false;

  /**
   * Map an error key with the displayed message
   */
  errorMap = {
    required: 'The field is required.',
  };

  /**
   * Callback functions for change
   */
  @Input() onChangeFn = (_: any) => { };

  /**
   * Callback functions for blur
   */
  @Input() onTouchedFn = () => { };

  /**
   * Callback functions for change
   */
  @Output() changeFn: EventEmitter<any> = new EventEmitter();

  /**
   * Constructor
   */
  constructor() { }

  sortAlphabeticallyAsc (option1: SelectOption, option2: SelectOption): 1 | -1 | 0  {
    if (option1.label.localeCompare(option2.label) === 1) {
      return 1;
    } else  if (option1.label.localeCompare(option2.label) === -1) {
      return -1;
    } else {
      return 0;
    }
  }

  sortAlphabeticallyDesc (option1: SelectOption, option2: SelectOption): 1 | -1 | 0 {
    if (option1.label.localeCompare(option2.label) === 1) {
      return -1;
    } else  if (option1.label.localeCompare(option2.label) === -1) {
      return 1;
    } else {
      return 0;
    }
  }

  sortOptions(): void {
    if (this.isSortable) {

      let sortingFunction: (option1: SelectOption, option2: SelectOption) => 1 | -1 | 0 ;

      switch (this.sortingAlgorithm) {
        case 'A-Z':
          sortingFunction = this.sortAlphabeticallyAsc;
          break;
        case 'Z-A':
          sortingFunction = this.sortAlphabeticallyDesc;
          break;
        default:
          sortingFunction = (o1: SelectOption, o2: SelectOption) => 0;
          break;
      }

      this.options = this.options.sort(sortingFunction);
    }
  }

  ngOnChanges(): void {
    this.sortOptions();    
  }

  /**
   * ngOnInit
   */
  ngOnInit() {
    const validators = [];
    if (this.isRequired) {
      validators.push(Validators.required);
      this.label += ' *';
    }
    this.formControl = new FormControl('', Validators.compose(validators));
    if (this.disabled) {
      this.formControl.disable();
    }
    if (this.form) {
      this.form.addControl(this.name, this.formControl);
    }
    if (this.selected) {
      this.formControl.setValue(this.selected);
    }

    this.sortOptions();
  }

  // get accessor
  get value(): any {
    return this.selected;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.selected) {
      this.selected = v;
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

  change(event) {
    this.changeFn.emit(event);
  }

  writeValue(value: any): void {
    this.selected = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }
}

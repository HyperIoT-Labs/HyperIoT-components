import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-stepper',
  templateUrl: './hyt-stepper.component.html',
  styleUrls: ['./hyt-stepper.component.css']
})
export class HytStepperComponent implements OnInit {
  /** ViewChild */
  @ViewChild('stepper', { static: false }) private stepperElement: ElementRef;

  /** Eneable liner stepper */
  @Input() isLinear = false;

  @Input() stepArray: TemplateRef<any>[];

  @Input() labelArray: string[];

  @Input() controlArray: FormGroup[];

  completed: string[];

  @Input()
  set completedArray(completedArr: string[]) {
    this.completed = completedArr;
  }

  // @Input() firstStep: TemplateRef<any>;
  // @Input() secondStep: TemplateRef<any>;
  // @Input() thirdStep: TemplateRef<any>;
  // @Input() fourthStep: TemplateRef<any>;
  // @Input() fifthStep: TemplateRef<any>;
  // @Input() sixthStep: TemplateRef<any>;
  // @Input() seventhStep: TemplateRef<any>;

  // @Input() firstStepControl: FormGroup;
  // @Input() secondStepControl: FormGroup;
  // @Input() thirdStepControl: FormGroup;
  // @Input() fourthStepControl: FormGroup;
  // @Input() fifthStepControl: FormGroup;
  // @Input() sixthStepControl: FormGroup;
  // @Input() seventhStepControl: FormGroup;

  // @Input() firstLabel: string;
  // @Input() secondLabel: string;
  // @Input() thirdLabel: string;
  // @Input() fourthLabel: string;
  // @Input() fifthLabel: string;
  // @Input() sixthLabel: string;
  // @Input() seventhLabel: string;

  /**
   * constructor
   * @param fb FormBuilder
   */
  constructor(private fb: FormBuilder) { }

  /**
   * ngOnInit
   */
  ngOnInit() {
  }

  /** Trigger next step */
  next() {
    const stepper = this.stepperElement as any;
    stepper.next();
  }

  /** Trigger previous step */
  previous() {
    const stepper = this.stepperElement as any;
    stepper.previous();
  }
}

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

  @Input() firstStep: TemplateRef<any>;
  @Input() secondStep: TemplateRef<any>;
  @Input() thirdStep: TemplateRef<any>;
  @Input() fourthStep: TemplateRef<any>;

  @Input() firstStepControl: FormGroup;
  @Input() secondStepControl: FormGroup;
  @Input() thirdStepControl: FormGroup;
  @Input() fourthStepControl: FormGroup;

  @Input() firstLabel: string;
  @Input() secondLabel: string;
  @Input() thirdLabel: string;
  @Input() fourthLabel: string;

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

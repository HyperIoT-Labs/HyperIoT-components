import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-stepper',
  templateUrl: './hyt-stepper.component.html',
  styleUrls: ['./hyt-stepper.component.css']
})
export class HytStepperComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  /** ViewChild */
  @ViewChild('stepper', { static: false }) private stepperElement: ElementRef;

  @Input() isLinear = false;

  @Input() firstStep: TemplateRef<any>;

  @Input() secondStep: TemplateRef<any>;

  @Input() thirdStep: TemplateRef<any>;

  @Input() fourthStep: TemplateRef<any>;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  next() {
    const stepper = this.stepperElement as any;
    stepper.next();
  }

  previous() {
    const stepper = this.stepperElement as any;
    stepper.previous();
  }
}

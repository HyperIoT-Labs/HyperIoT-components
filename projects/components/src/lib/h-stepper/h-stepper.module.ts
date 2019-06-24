import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HStepperComponent } from './h-stepper/h-stepper.component';
import { NbStepperModule, NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [HStepperComponent],
  imports: [
    CommonModule,
    NbButtonModule,
    NbStepperModule
  ],
  exports: [
    HStepperComponent
  ]
})
export class HStepperModule { }

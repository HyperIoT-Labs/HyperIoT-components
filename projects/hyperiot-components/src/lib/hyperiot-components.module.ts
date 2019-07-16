import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HytInputComponent } from './hyt-input/hyt-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { DemoMaterialModule } from './material-module';
import { HButtonComponent } from './h-button/h-button.component';
import { HRadioButtonComponent } from './h-radio-button/h-radio-button.component';
import { HCheckboxComponent } from './h-checkbox/h-checkbox.component';
import { HCardComponent } from './h-card/h-card.component';
import { HytStepperComponent } from './hyt-stepper/hyt-stepper.component';
import { HytStepComponent } from './hyt-stepper/hyt-step/hyt-step.component';
import { HytTextAreaComponent } from './hyt-text-area/hyt-text-area.component';
import { HytSelectComponent } from './hyt-select/hyt-select.component';

@NgModule({
  declarations: [
    HytInputComponent,
    HButtonComponent,
    HRadioButtonComponent,
    HCheckboxComponent,
    HCardComponent,
    HytStepperComponent,
    HytStepComponent,
    HytTextAreaComponent,
    HytSelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatStepperModule,
    MatNativeDateModule,
    DemoMaterialModule
  ],
  exports: [
    HytInputComponent,
    HButtonComponent,
    HRadioButtonComponent,
    HCheckboxComponent,
    HCardComponent,
    HytStepperComponent,
    HytStepComponent,
    HytTextAreaComponent,
    HytSelectComponent
  ]
})
export class HyperiotComponentsModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HInputComponent } from './hyt-input/hyt-input.component';
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

@NgModule({
  declarations: [
    HInputComponent,
    HButtonComponent,
    HRadioButtonComponent,
    HCheckboxComponent,
    HCardComponent,
    HytStepperComponent,
    HytStepComponent
  ],
  imports: [
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
    HInputComponent,
    HButtonComponent,
    HRadioButtonComponent,
    HCheckboxComponent,
    HCardComponent,
    HytStepperComponent,
    HytStepComponent
  ]
})
export class HyperiotComponentsModule { }

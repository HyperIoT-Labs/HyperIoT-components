import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HInputComponent } from './h-input/h-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HButtonComponent } from './h-button/h-button.component';
import { HRadioButtonComponent } from './h-radio-button/h-radio-button.component';
import { HCheckboxComponent } from './h-checkbox/h-checkbox.component';

@NgModule({
  declarations: [
    HInputComponent,
    HButtonComponent,
    HRadioButtonComponent,
    HCheckboxComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  exports: [
    HInputComponent,
    HButtonComponent,
    HRadioButtonComponent,
    HCheckboxComponent
  ]
})
export class HyperiotComponentsModule { }

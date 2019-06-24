import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HCheckboxComponent } from './h-checkbox/h-checkbox.component';
import { NbCheckboxModule } from '@nebular/theme';

@NgModule({
  declarations: [HCheckboxComponent],
  imports: [
    CommonModule,
    NbCheckboxModule
  ],
  exports: [
    HCheckboxComponent
  ]
})
export class HCheckboxModule { }

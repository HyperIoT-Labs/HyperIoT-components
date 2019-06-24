import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HInputComponent } from './hinput/hinput.component';
import { NbInputModule } from '@nebular/theme';

@NgModule({
  declarations: [HInputComponent],
  imports: [
    CommonModule,
    NbInputModule
  ],
  exports: [
    HInputComponent
  ]
})
export class HInputModule { }

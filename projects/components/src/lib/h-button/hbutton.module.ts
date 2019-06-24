import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HButtonComponent } from './hbutton/hbutton.component';
import { NbButtonModule } from '@nebular/theme';

@NgModule({
  declarations: [HButtonComponent],
  imports: [
    CommonModule,
    NbButtonModule
  ],
  exports: [
    HButtonComponent
  ]
})
export class HButtonModule { }

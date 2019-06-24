import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NbRadioModule } from '@nebular/theme';
import { HRadioComponent } from './hradio/hradio.component';

@NgModule({
  declarations: [HRadioComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbRadioModule
  ],
  exports: [
    HRadioComponent
  ]
})
export class HRadioModule { }

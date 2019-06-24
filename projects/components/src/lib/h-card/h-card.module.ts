import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HCardComponent } from './h-card/h-card.component';
import { NbCardModule } from '@nebular/theme';

@NgModule({
  declarations: [HCardComponent],
  imports: [
    CommonModule,
    NbCardModule
  ],
  exports: [
    HCardComponent
  ]
})
export class HCardModule { }

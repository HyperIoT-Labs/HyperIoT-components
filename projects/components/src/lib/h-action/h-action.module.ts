import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HActionComponent } from './h-action/h-action.component';
import { NbActionsModule } from '@nebular/theme';

@NgModule({
  declarations: [HActionComponent],
  imports: [
    CommonModule,
    NbActionsModule
  ],
  exports: [
    HActionComponent
  ]
})
export class HActionModule { }

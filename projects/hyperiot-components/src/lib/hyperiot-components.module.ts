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
import { HytButtonComponent } from './hyt-button/hyt-button.component';
import { HytRadioButtonComponent } from './hyt-radio-button/hyt-radio-button.component';
import { HytCheckboxComponent } from './hyt-checkbox/hyt-checkbox.component';
import { HytCardComponent } from './hyt-card/hyt-card.component';
import { HytStepperComponent } from './hyt-stepper/hyt-stepper.component';
import { HytTextAreaComponent } from './hyt-text-area/hyt-text-area.component';
import { HytSelectComponent } from './hyt-select/hyt-select.component';
import { HytTreeViewComponent } from './hyt-tree-view/hyt-tree-view.component';
import { HytInputTemplateComponent } from './hyt-input-template/hyt-input-template.component';
import { HytSelectTemplateComponent } from './hyt-select-template/hyt-select-template.component';

@NgModule({
  declarations: [
    HytInputComponent,
    HytButtonComponent,
    HytRadioButtonComponent,
    HytCheckboxComponent,
    HytCardComponent,
    HytStepperComponent,
    HytTextAreaComponent,
    HytSelectComponent,
    HytTreeViewComponent,
    HytInputTemplateComponent,
    HytSelectTemplateComponent,
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
    HytButtonComponent,
    HytRadioButtonComponent,
    HytCheckboxComponent,
    HytCardComponent,
    HytStepperComponent,
    HytTextAreaComponent,
    HytSelectComponent,
    HytTreeViewComponent,
    HytInputTemplateComponent,
    HytSelectTemplateComponent
  ]
})
export class HyperiotComponentsModule { }

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
import { HytTreeViewProjectComponent } from './hyt-tree-view-project/hyt-tree-view-project.component';
import { HytTreeViewEditableComponent } from './hyt-tree-view-editable/hyt-tree-view-editable.component';
import { HytModalEComponent } from './hyt-modal-e/hyt-modal-e.component';
import { HytTagComponent } from './hyt-tag/hyt-tag.component';
import { HytTagListComponent } from './hyt-tag-list/hyt-tag-list.component';
import { HytTreeViewCategoryComponent } from './hyt-tree-view-category/hyt-tree-view-category.component';
import { HytAutocompleteComponent } from './hyt-autocomplete/hyt-autocomplete.component';
import { HytTriCheckboxComponent } from './hyt-tri-checkbox/hyt-tri-checkbox.component';
import { HytHexagonComponent } from './hyt-hexagon/hyt-hexagon.component';
import { HytConfirmDialogComponent } from './hyt-confirm-dialog/hyt-confirm-dialog.component';
import { HytModalContainerComponent } from './hyt-modal/hyt-modal-container.component';
import { HytModalContentDirective } from './hyt-modal/hyt-modal-content.directive';
import { HytDatePickerComponent } from './hyt-date-picker/hyt-date-picker.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PickerPopUpComponent } from './hyt-date-picker/picker-pop-up/picker-pop-up.component';
import { HytLazyPaginationTableComponent } from './hyt-lazy-pagination-table/hyt-lazy-pagination-table.component';
import { PageInputDirective } from './hyt-lazy-pagination-table/page-input.directive';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

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
    HytTreeViewProjectComponent,
    HytTreeViewEditableComponent,
    HytModalEComponent,
    HytTagComponent,
    HytTagListComponent,
    HytTreeViewCategoryComponent,
    HytAutocompleteComponent,
    HytTriCheckboxComponent,
    HytHexagonComponent,
    HytConfirmDialogComponent,
    HytModalContainerComponent,
    HytModalContentDirective,
    HytDatePickerComponent,
    PickerPopUpComponent,
    HytLazyPaginationTableComponent,
    PageInputDirective
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
    DemoMaterialModule,
    NgxMaskModule.forRoot(options)
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
    HytTreeViewCategoryComponent,
    HytInputTemplateComponent,
    HytSelectTemplateComponent,
    HytTreeViewProjectComponent,
    HytTreeViewEditableComponent,
    HytTagComponent,
    HytTagListComponent,
    HytModalEComponent,
    HytAutocompleteComponent,
    HytTriCheckboxComponent,
    HytHexagonComponent,
    HytModalContainerComponent,
    HytModalContentDirective,
    HytDatePickerComponent,
    HytLazyPaginationTableComponent
  ],
  entryComponents: [
    HytModalContainerComponent
  ]
})
export class ComponentsModule { }

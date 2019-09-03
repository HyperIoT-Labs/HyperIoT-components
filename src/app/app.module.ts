import { BrowserModule } from '@angular/platform-browser';
import { NgModule, TRANSLATIONS, LOCALE_ID, TRANSLATIONS_FORMAT } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HyperiotComponentsModule } from '../../projects/hyperiot-components/src/lib/hyperiot-components.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InputsComponent } from './inputs/inputs.component';
import { InputsTemplateComponent } from './inputs-template/inputs-template.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { StepperComponent } from './stepper/stepper.component';
import { CardsComponent } from './cards/cards.component';
import { LayoutComponent } from './layout/layout.component';
import { SelectComponent } from './select/select.component';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { SelectTemplateComponent } from './select-template/select-template.component';

const appRoutes: Routes = [
  { path: 'inputs', component: InputsComponent },
  { path: 'inputs-template', component: InputsTemplateComponent },
  { path: 'select', component: SelectComponent },
  { path: 'select-template', component: SelectTemplateComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'stepper', component: StepperComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'layout', component: LayoutComponent },
  { path: 'treeview', component: TreeViewComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    InputsComponent,
    InputsTemplateComponent,
    ButtonsComponent,
    StepperComponent,
    CardsComponent,
    LayoutComponent,
    SelectComponent,
    TreeViewComponent,
    SelectTemplateComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HyperiotComponentsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatTreeModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatStepperModule,
    ScrollingModule,
    CdkTreeModule,
    MatExpansionModule,
    MatRippleModule,
    MatSliderModule,
    MatSlideToggleModule,
    BrowserAnimationsModule
  ],
  providers: [I18n,
    { provide: TRANSLATIONS_FORMAT, useValue: "xlf" },
    {
      provide: TRANSLATIONS,
      useFactory: (locale) => {
        locale = locale || 'en-US'; // default to english if no locale provided
        return require(`raw-loader!../locale/translations.${locale}.xlf`);
      },
      deps: [LOCALE_ID]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbButtonModule,
  NbActionsModule,
  NbInputModule,
  NbCardModule,
  NbSidebarService,
  NbRadioModule,
  NbCheckboxModule,
  NbStepperModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { HCardModule } from '../../projects/components/src/lib/h-card/h-card.module';
import { HActionModule } from '../../projects/components/src/lib/h-action/h-action.module';
import { HButtonModule } from '../../projects/components/src/lib/h-button/hbutton.module';
import { HInputModule } from '../../projects/components/src/lib/h-input/hinput.module';
import { HRadioModule } from '../../projects/components/src/lib/h-radio/h-radio.module';
import { HCheckboxModule } from '../../projects/components/src/lib/h-checkbox/h-checkbox.module';
import { HStepperModule } from '../../projects/components/src/lib/h-stepper/h-stepper.module';

import { Routes, RouterModule } from '@angular/router';
import { InputsComponent } from './inputs/inputs.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { ActionsComponent } from './actions/actions.component';
import { StepperComponent } from './stepper/stepper.component';
import { CardsComponent } from './cards/cards.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
  { path: 'inputs', component: InputsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'actions', component: ActionsComponent },
  { path: 'stepper', component: StepperComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'tables', component: TablesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    InputsComponent,
    ButtonsComponent,
    ActionsComponent,
    StepperComponent,
    CardsComponent,
    TablesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    RouterModule.forRoot(routes),
    HCardModule,
    HActionModule,
    HButtonModule,
    HInputModule,
    HRadioModule,
    HCheckboxModule,
    HStepperModule,
    NbButtonModule,
    NbActionsModule,
    NbInputModule,
    NbCardModule,
    NbRadioModule,
    NbCheckboxModule,
    NbStepperModule
  ],
  providers: [
    NbSidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

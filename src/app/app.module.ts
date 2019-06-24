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
import { AppRoutingModule } from './app-routing.module';

import { HCardModule } from '../../projects/components/src/lib/h-card/h-card.module';
import { HActionModule } from '../../projects/components/src/lib/h-action/h-action.module';
import { HButtonModule } from '../../projects/components/src/lib/h-button/hbutton.module';
import { HInputModule } from '../../projects/components/src/lib/h-input/hinput.module';
import { HRadioModule } from '../../projects/components/src/lib/h-radio/h-radio.module';
import { HCheckboxModule } from '../../projects/components/src/lib/h-checkbox/h-checkbox.module';
import { HStepperModule } from '../../projects/components/src/lib/h-stepper/h-stepper.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    AppRoutingModule,
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

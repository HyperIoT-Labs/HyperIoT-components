import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InputsComponent } from './inputs/inputs.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { StepperComponent } from './stepper/stepper.component';
import { CardsComponent } from './cards/cards.component';
import { LayoutComponent } from './layout/layout.component';

const appRoutes: Routes = [
  { path: 'inputs', component: InputsComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'stepper', component: StepperComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'layout', component: LayoutComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    InputsComponent,
    ButtonsComponent,
    StepperComponent,
    CardsComponent,
    LayoutComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserModule,
    HyperiotComponentsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatTreeModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    ScrollingModule,
    CdkTreeModule,
    MatExpansionModule,
    MatRippleModule,
    MatSliderModule,
    MatSlideToggleModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

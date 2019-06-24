import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HStepperComponent } from './h-stepper.component';

describe('HStepperComponent', () => {
  let component: HStepperComponent;
  let fixture: ComponentFixture<HStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

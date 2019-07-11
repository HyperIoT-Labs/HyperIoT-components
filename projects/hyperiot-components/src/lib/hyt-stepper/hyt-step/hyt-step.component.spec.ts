import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HytStepComponent } from './hyt-step.component';

describe('HytStepComponent', () => {
  let component: HytStepComponent;
  let fixture: ComponentFixture<HytStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HytStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HytStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

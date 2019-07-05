import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRadioButtonComponent } from './h-radio-button.component';

describe('HRadioButtonComponent', () => {
  let component: HRadioButtonComponent;
  let fixture: ComponentFixture<HRadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRadioButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HytDatePickerComponent } from './hyt-date-picker.component';

describe('HytDatePickerComponent', () => {
  let component: HytDatePickerComponent;
  let fixture: ComponentFixture<HytDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HytDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HytDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HCheckboxComponent } from './h-checkbox.component';

describe('HCheckboxComponent', () => {
  let component: HCheckboxComponent;
  let fixture: ComponentFixture<HCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

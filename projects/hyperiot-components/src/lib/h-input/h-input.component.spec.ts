import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HInputComponent } from './h-input.component';

describe('HInputComponent', () => {
  let component: HInputComponent;
  let fixture: ComponentFixture<HInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

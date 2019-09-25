import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HytTriCheckboxComponent } from './hyt-tri-checkbox.component';

describe('HytTriCheckboxComponent', () => {
  let component: HytTriCheckboxComponent;
  let fixture: ComponentFixture<HytTriCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HytTriCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HytTriCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HytButtonToggleComponent } from './hyt-button-toggle.component';

describe('HytButtonToggleComponent', () => {
  let component: HytButtonToggleComponent;
  let fixture: ComponentFixture<HytButtonToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HytButtonToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HytButtonToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

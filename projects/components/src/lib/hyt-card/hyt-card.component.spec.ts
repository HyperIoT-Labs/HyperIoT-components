import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HCardComponent } from './h-card.component';

describe('HCardComponent', () => {
  let component: HCardComponent;
  let fixture: ComponentFixture<HCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

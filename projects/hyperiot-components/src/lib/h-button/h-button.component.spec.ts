import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HBottonComponent } from './h-botton.component';

describe('HBottonComponent', () => {
  let component: HBottonComponent;
  let fixture: ComponentFixture<HBottonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HBottonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HBottonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

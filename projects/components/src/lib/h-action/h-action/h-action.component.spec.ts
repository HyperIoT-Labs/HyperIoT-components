import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HActionComponent } from './h-action.component';

describe('HActionComponent', () => {
  let component: HActionComponent;
  let fixture: ComponentFixture<HActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HActionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

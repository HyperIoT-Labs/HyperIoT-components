import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HRadioComponent } from './hradio.component';

describe('HRadioComponent', () => {
  let component: HRadioComponent;
  let fixture: ComponentFixture<HRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

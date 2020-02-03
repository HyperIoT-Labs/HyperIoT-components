import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickerPopUpComponent } from './picker-pop-up.component';

describe('PickerPopUpComponent', () => {
  let component: PickerPopUpComponent;
  let fixture: ComponentFixture<PickerPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickerPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickerPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

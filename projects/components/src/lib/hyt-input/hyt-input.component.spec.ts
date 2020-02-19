import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HytInputComponent } from './hyt-input.component';

describe('HInputComponent', () => {
  let component: HytInputComponent;
  let fixture: ComponentFixture<HytInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HytInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HytInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HytModalComponent } from './hyt-modal.component';

describe('HytModalComponent', () => {
  let component: HytModalComponent;
  let fixture: ComponentFixture<HytModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HytModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HytModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEComponent } from './modal-e.component';

describe('ModalComponent', () => {
  let component: ModalEComponent;
  let fixture: ComponentFixture<ModalEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

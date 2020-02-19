import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HytTagComponent } from './hyt-tag.component';

describe('HytTagComponent', () => {
  let component: HytTagComponent;
  let fixture: ComponentFixture<HytTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HytTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HytTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

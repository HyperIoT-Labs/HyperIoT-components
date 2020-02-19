import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineCalendarComponent } from './timeline-calendar.component';

describe('TimelineCalendarComponent', () => {
  let component: TimelineCalendarComponent;
  let fixture: ComponentFixture<TimelineCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

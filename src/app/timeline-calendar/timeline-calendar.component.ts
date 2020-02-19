import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline-calendar',
  templateUrl: './timeline-calendar.component.html',
  styleUrls: ['./timeline-calendar.component.scss']
})
export class TimelineCalendarComponent {

  selectedDate: Date;

  changeDate(event) {
    this.selectedDate = event;
  }

}

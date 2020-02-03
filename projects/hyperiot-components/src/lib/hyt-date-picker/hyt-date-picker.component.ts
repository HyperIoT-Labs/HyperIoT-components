import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment_ from 'moment';
const moment = moment_;

export type TimeStep = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';

const TimeFormat = {
  decade: '',
  year: '0000',
  month: '00/0000',
  day: '00/00/0000',
  hour: '00/00/0000 00',
  minute: '00/00/0000 00:00',
  second: '00/00/0000 00:00:00',
  millisecond: '00/00/0000 00:00:00.000'
};

/** @title Datepicker emulating a Year and month picker */
@Component({
  selector: 'hyt-date-picker',
  templateUrl: 'hyt-date-picker.component.html',
  styleUrls: ['hyt-date-picker.component.css'],
})
export class HytDatePickerComponent implements OnInit {

  // @Input()
  // maxStep: TimeStep = 'year';

  @Input()
  minStep: TimeStep = 'day';

  showPopup = false;

  dateString = '';

  // @Input()
  // startStep: TimeStep = 'year';

  @Output()
  selectedDate: EventEmitter<Date> = new EventEmitter<Date>();

  actualMask = TimeFormat.hour;

  date = moment(new Date());

  outputToShow = '';

  constructor() {

  }

  ngOnInit(): void {

  }

  setDate(event: moment_.Moment) {
    // TODO set moment in input
    this.outputToShow = event.format('DD/MM/YYYY HH:mm:ss');

    this.selectedDate.emit(event.toDate());
  }

  openCal() {
    this.showPopup = !this.showPopup;
  }

  blur() {
    console.log(this.dateString)
  }

}

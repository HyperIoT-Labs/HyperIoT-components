import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import * as moment_ from 'moment';
const moment = moment_;

export type TimeStep = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';

interface DateFormat {
  maskFormat: string;
  momentFormat: string;
}

const TimeFormat: Record<string, DateFormat> = {
  year: {
    maskFormat: '0000',
    momentFormat: 'YYYY'
  },
  month: {
    maskFormat: '0000/00',
    momentFormat: 'YYYY/MM'
  },
  day: {
    maskFormat: '0000/00/00',
    momentFormat: 'YYYY/MM/DD'
  },
  hour: {
    maskFormat: '0000/00/00 00',
    momentFormat: 'YYYY/MM/DD HH'
  },
  minute: {
    maskFormat: '0000/00/00 00:00',
    momentFormat: 'YYYY/MM/DD HH:mm'
  },
  second: {
    maskFormat: '0000/00/00 00:00:00',
    momentFormat: 'YYYY/MM/DD HH:mm:ss'
  },
  millisecond: {
    maskFormat: '0000/00/00 00:00:00.000',
    momentFormat: 'YYYY/MM/DD HH:mm:ss.SSS'
  }
};

/** @title Datepicker emulating a Year and month picker */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hyt-date-picker',
  templateUrl: 'hyt-date-picker.component.html',
  styleUrls: ['hyt-date-picker.component.css'],
})
export class HytDatePickerComponent implements OnInit, OnChanges {

  @Input()
  date: Date = new Date();

  @Input()
  minStep: TimeStep = 'day';

  showPopup = false;

  dateString = '';

  @Output()
  selectedDate: EventEmitter<Date> = new EventEmitter<Date>();

  dateError = false;

  actualMask: string;

  constructor() { }

  ngOnInit(): void {
    this.actualMask = TimeFormat[this.minStep].maskFormat;
    this.dateString = moment(this.date).format(TimeFormat[this.minStep].momentFormat);
  }

  ngOnChanges(): void {
    this.actualMask = TimeFormat[this.minStep].maskFormat;
    this.dateString = moment(this.date).format(TimeFormat[this.minStep].momentFormat);
  }

  openCal() {
    this.showPopup = !this.showPopup;
  }

  setDate(event: moment_.Moment) {
    this.showPopup = false;
    this.date = event.toDate();
    this.dateString = moment(this.date).format(TimeFormat[this.minStep].momentFormat);
    this.selectedDate.emit(this.date);
  }

  submit() {
    const arr = this.dateString.split(/[\/\s\:]+/);
    const dateString = `${+arr[0] || 0}/${+arr[1] || 1}/${+arr[2] || 1} ${+arr[3] || '00'}:${+arr[4] || '00'}:${+arr[5] || '00'}`;
    const date = new Date(dateString);
    if (date.toString() === 'Invalid Date') {
      this.dateError = true;
    } else {
      this.date = date;
      this.selectedDate.emit(this.date);
    }
  }

}

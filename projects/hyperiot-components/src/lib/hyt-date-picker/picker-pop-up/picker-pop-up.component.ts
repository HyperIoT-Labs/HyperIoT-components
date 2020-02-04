import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import * as moment_ from 'moment';
import { CalendarContextData, HytDatePickerService } from '../services/hyt-date-picker.service';

export type TimeStep = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond';
const moment = moment_;

interface CalElement {
  action: () => void;
  label: string;
  selectable?: boolean;
  class?: string;
}

interface CalendarRow {
  elements: CalElement[];
  class?: string;
}

interface CalendarContext {
  headRows: CalendarRow[];
  bodyRows: CalendarRow[];
  class?: string;
}

@Component({
  selector: 'lib-picker-pop-up',
  templateUrl: './picker-pop-up.component.html',
  styleUrls: ['./picker-pop-up.component.css']
})
export class PickerPopUpComponent implements OnInit, OnChanges {

  model: CalendarContext;

  @Input()
  dateInput: moment_.Moment;

  @Input()
  lowView: TimeStep = 'second';

  @Input()
  show = false;

  @Output()
  dateOutput: EventEmitter<moment_.Moment> = new EventEmitter<moment_.Moment>();

  constructor(
    private calendarService: HytDatePickerService
  ) { }

  ngOnInit() {
    this.buildModel('year', moment(new Date()).startOf('year'));
  }

  ngOnChanges() {
    this.buildModel('year', moment(new Date()).startOf('year'));
  }

  public buildModel(step: any, mom: moment_.Moment): void {

    const calendarContextData: CalendarContextData = this.calendarService.getContextDataByStep(step);
    mom.startOf(calendarContextData.toPrevious);

    const hRows: CalendarRow[] = [];
    const defHeader: CalElement[] = [];
    defHeader.push({
      label: '<-',
      action: () => this.buildModel(step, calendarContextData.subtract(mom))
    });
    defHeader.push({
      label: calendarContextData.headerFormat(mom),
      action: () =>
        (step === 'year') ?
          {} :
          this.buildModel(calendarContextData.toPrevious, moment(mom).startOf(calendarContextData.toPrevious))
    });
    defHeader.push({
      label: '->',
      action: () => this.buildModel(step, calendarContextData.add(mom))
    });
    hRows.push({ elements: defHeader });
    if (step === 'day') {
      hRows.push({ elements: [] });
      for (let i = 0; i < 7; i++) {
        hRows[1].elements.push({
          label: mom.clone().day(i).format('ddd'),
          action: () => { }
        });
      }
    }

    const bRows: CalendarRow[] = [];
    for (let i = 0; i < calendarContextData.brows; i++) {
      bRows.push({ elements: [] });
      for (let k = 0; k < calendarContextData.bcols; k++) {
        bRows[i].elements.push({
          action: () => (step !== this.lowView) ? this.buildModel(
            calendarContextData.toNext,
            mom.clone().set(step, calendarContextData.bcols * i + k + ((step === 'year') ? this.getYearStart(mom) : 0))
          ) : this.emitValue(mom.clone().set(step, calendarContextData.bcols * i + k + ((step === 'year') ? this.getYearStart(mom) : 0))),
          label: mom.clone().set(
            step,
            calendarContextData.bcols * i + k + ((step === 'year') ? this.getYearStart(mom) : 0)
          ).format(calendarContextData.elementFormat),
          selectable: true
        });
      }
    }
    console.log(bRows);

    this.model = {
      headRows: hRows,
      bodyRows: bRows
    };

  }

  getYearStart(m) {
    const mom = m.clone();
    while (mom.year() % 10 !== 0) {
      mom.year(mom.year() - 1);
    }
    return mom.clone().subtract(1, 'year').year();
  }

  emitValue(output) {
    this.dateOutput.emit(output);
    // TODO update visible in hyt-date-picker
    this.show = false;
  }

}

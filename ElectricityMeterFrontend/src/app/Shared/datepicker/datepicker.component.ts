import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {

  public daterange = [];

  @Output()
  public onDateChanged: EventEmitter<any> = new EventEmitter<any>();
  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: 'DD-MM-YYYY' },
    alwaysShowCalendars: false,
  };

  public selectedDate(value: any, datepicker?: any) {
    if (value != null) {
      this.onDateChanged.emit(value);
    }
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-linechartcard',
  templateUrl: './linechartcard.component.html',
  styleUrls: ['./linechartcard.component.scss']
})
export class LinechartcardComponent implements OnInit {

  @Input()
  title = '';

  @Output()
  public dateSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  OnDateChanged($event) {
      this.dateSelected.emit($event);
  }
}

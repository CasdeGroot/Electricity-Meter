import {AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BarComponent} from '@swimlane/ngx-charts';
import {BarChart} from './classes/barchart.class';
import {Singleitemserie} from '../basechart/singleitemserie.class';
import {SingleItem} from '../basechart/singleItem.class';
import {MultiItem} from '../basechart/multiitem.class';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit, AfterViewInit {

  @Input() chart: BarChart;

  @Input() loading: boolean;

  @ViewChild(BarComponent)
  chartComponent: BarComponent;

  constructor() {
    this.loading = true;
    this.chart = new BarChart();
  }

  ngAfterViewInit(): void {
    this.chart.update();

  }

  init() {
  }

  ngOnInit() {
  }
}

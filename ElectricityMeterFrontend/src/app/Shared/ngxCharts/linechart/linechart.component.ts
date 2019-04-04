import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {LineChartComponent} from '@swimlane/ngx-charts';
import { LineChart } from './classes/linechart.class';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class CustomLineChartComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() chart: LineChart;

  @Input() loading: boolean;

  @ViewChild(LineChartComponent)
  chartComponent: LineChartComponent;

  colorScheme = {
    name: 'fire',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#ff3d00', '#bf360c', '#ff8f00', '#ff6f00', '#ff5722', '#e65100', '#ffca28', '#ffab00'
    ]
  };

  constructor() {
    this.loading = true;
    this.chart = new LineChart();
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  private init() {
    this.chartComponent.showXAxisLabel = this.chart.showXAxisLabel;
    this.chartComponent.showYAxisLabel = this.chart.showYAxisLabel;
    this.chartComponent.xAxis = this.chart.xAxis;
    this.chartComponent.yAxis = this.chart.yAxis;
    this.chartComponent.legend = this.chart.legend;
    this.chartComponent.xAxisLabel = this.chart.xAxisLabel;
    this.chartComponent.yAxisLabel = this.chart.yAxisLabel;
    this.chartComponent.autoScale = this.chart.autoScale;
    this.chartComponent.tooltipDisabled = this.chart.disableTooltip;
    this.chartComponent.timeline = this.chart.timeline;
    this.chartComponent.animations = true;
    this.chart.update();
  }
}

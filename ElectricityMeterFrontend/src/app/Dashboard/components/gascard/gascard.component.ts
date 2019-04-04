import {Component, OnInit, ViewChild} from '@angular/core';
import {LinechartcardComponent} from '../../../Shared/ngxCharts/linechart/linechartcard/linechartcard.component';
import {LineChart} from '../../../Shared/ngxCharts/linechart/classes/linechart.class';
import {ChartdataService} from '../../../Shared/ngxCharts/services/chartdata.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {IBaseChart} from '../../../Shared/ngxCharts/basechart/basechart.interface';
import {Request} from '../../../Shared/requests/classes/request.class';
import {MultiDataSerie} from '../../../Shared/ngxCharts/basechart/multiItemSeries.class';

@Component({
  selector: 'app-gascard',
  templateUrl: './gascard.component.html',
  styleUrls: ['./gascard.component.scss']
})
export class GascardComponent implements OnInit {

  public chart: LineChart;
  public dataSource: MultiDataSerie[];

  constructor(private dataService: ChartdataService,  private spinnerService: Ng4LoadingSpinnerService) { }

  @ViewChild(LinechartcardComponent)
  lineChart: LinechartcardComponent;

  ngOnInit() {
    this.chart = new LineChart(<IBaseChart>{
      data:  [],
      xAxisLabel: 'Time',
      yAxisLabel: 'Gas (kWh)',
      showXAxisLabel: true,
      showYAxisLabel: true,
      xAxis: true,
      yAxis: true,
      legend: true,
      timeline: true,
      disableTooltip: true,
      autoScale: true
    });

    this.dataSource = [];
  }

  OnDateSelected($event) {
    this.dataSource = [];
    this.spinnerService.show();
    const request = new Request<any>();
    request.url = 'api/measurement';
    request.beginDate = $event.start;
    request.endDate = $event.end;
    request.filter = {sensorId: localStorage.getItem('sensorId')};

    this.dataService.getMultiDataSourceWithDate<number>('gas', 'gasTime', request)
      .subscribe((dataSource) => {
        this.spinnerService.hide();
        this.dataSource.push(new MultiDataSerie('Gas', dataSource));
        this.chart.data = this.dataSource;
        this.chart.update();
      });
  }
}

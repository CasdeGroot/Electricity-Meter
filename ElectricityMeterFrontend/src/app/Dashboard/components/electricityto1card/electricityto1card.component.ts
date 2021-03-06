import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ChartdataService} from '../../../Shared/ngxCharts/services/chartdata.service';
import {LineChart} from '../../../Shared/ngxCharts/linechart/classes/linechart.class';
import {Request} from '../../../Shared/requests/classes/request.class';
import {IBaseChart} from '../../../Shared/ngxCharts/basechart/basechart.interface';
import {MultiDataSerie} from '../../../Shared/ngxCharts/basechart/multiItemSeries.class';
import {AuthService} from '../../../login/services/auth.service';
import {LinechartcardComponent} from '../../../Shared/ngxCharts/linechart/linechartcard/linechartcard.component';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
  selector: 'app-electricityto1card',
  templateUrl: './electricityto1card.component.html',
  styleUrls: ['./electricityto1card.component.scss']
})
export class Electricityto1cardComponent implements OnInit, AfterViewInit {

  public chart: LineChart;
  public dataSource: MultiDataSerie[];

  constructor(private dataService: ChartdataService, private spinnerService: Ng4LoadingSpinnerService) { }

  @ViewChild(LinechartcardComponent)
  lineChart: LinechartcardComponent;

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.chart = new LineChart(<IBaseChart>{
      data:  [],
      xAxisLabel: 'Time',
      yAxisLabel: 'Electricity Usage (kWh)',
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

    this.dataService.getMultiDataSourceWithDate<number>('electricityTo1', 'timestamp', request)
      .subscribe((dataSource) => {
        this.dataSource.push(new MultiDataSerie('Electricity usage tariff 1', dataSource));
        this.chart.data = this.dataSource;
        this.chart.update();
        this.spinnerService.hide();
      });
  }
}

import { Component, OnInit } from '@angular/core';
import {IBaseChart} from '../../../Shared/ngxCharts/basechart/basechart.interface';
import {BarChart} from '../../../Shared/ngxCharts/barchart/classes/barchart.class';
import {Request} from '../../../Shared/requests/classes/request.class';
import {ChartdataService} from '../../../Shared/ngxCharts/services/chartdata.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {MultiItem} from '../../../Shared/ngxCharts/basechart/multiitem.class';

@Component({
  selector: 'app-payingscard',
  templateUrl: './payingscard.component.html',
  styleUrls: ['./payingscard.component.scss']
})
export class PayingscardComponent implements OnInit {
  public chart: BarChart;
  public dataSource = [];
  public elTariff1 = 0.171;
  public elTariff2 = 0.191;
  public gasTariff = 0.634;

  constructor(private dataService: ChartdataService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.chart = new BarChart(<IBaseChart>{
      data:  [],
      xAxisLabel: '',
      yAxisLabel: '',
      showXAxisLabel: false,
      showYAxisLabel: false,
      xAxis: true,
      yAxis: true,
      legend: true,
    });
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
        let usage = dataSource[dataSource.length - 1].value - dataSource[0].value;
        usage = usage * this.elTariff1;
        this.dataSource.push(new MultiItem<number, string>(usage, 'Electricity Tariff 1'));
        this.chart.data = this.dataSource;
        this.chart.update();
        this.spinnerService.hide();
      });

    this.dataService.getMultiDataSourceWithDate<number>('electricityTo2', 'timestamp', request)
      .subscribe((dataSource) => {
        let usage = dataSource[dataSource.length - 1].value - dataSource[0].value;
        usage = usage * this.elTariff2;
        this.dataSource.push(new MultiItem<number, string>(usage, 'Electricity Tariff 2'));
        this.chart.data = this.dataSource;
        this.chart.update();
      });

    this.dataService.getMultiDataSourceWithDate<number>('gas', 'gasTime', request)
      .subscribe((dataSource) => {
        let usage = dataSource[dataSource.length - 1].value - dataSource[0].value;
        usage = usage * this.gasTariff;
        this.dataSource.push(new MultiItem<number, string>(usage, 'gas'));
        this.chart.data = this.dataSource;
        this.chart.update();
      });
  }
}

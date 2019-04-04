import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { CustomLineChartComponent } from './linechart/linechart.component';
import {LoadingModule} from 'ngx-loading';
import { LinechartcardComponent } from './linechart/linechartcard/linechartcard.component';
import {ChartdataService} from './services/chartdata.service';
import {DatepickerComponent} from '../datepicker/datepicker.component';
import {Daterangepicker} from 'ng2-daterangepicker';
import { BarchartComponent } from './barchart/barchart.component';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    Daterangepicker,
    LoadingModule
  ],
  declarations: [CustomLineChartComponent, LinechartcardComponent, DatepickerComponent, BarchartComponent],
  exports: [CustomLineChartComponent, LinechartcardComponent, DatepickerComponent, BarchartComponent],
  providers: [ChartdataService]
})
export class ChartsModule { }

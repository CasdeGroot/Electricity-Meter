import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartsModule} from './ngxCharts/charts.module';
import {RequesthelperService} from './requests/services/requesthelper.service';

@NgModule({
  imports: [
    CommonModule,
    // ChartsModule
  ],
  exports: [ChartsModule],
  declarations: [],
  providers: [RequesthelperService]
})
export class SharedModule { }

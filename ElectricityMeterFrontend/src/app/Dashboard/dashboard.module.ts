import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DashboardpageComponent } from './pages/dashboardpage/dashboardpage.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from '../Shared/shared.module';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import {ChartsModule} from '../Shared/ngxCharts/charts.module';
import { UserpageComponent } from './pages/userpage/userpage.component';
import {DashboardRoutingModule} from './dashboard.routing.module';
import { MeasurementpageComponent } from '../Dashboard/pages/measurementpage/measurementpage.component';
import { HomepageComponent } from '../Dashboard/pages/homepage/homepage.component';
import { PaginationbarComponent } from '../Dashboard/components/paginationbar/paginationbar.component';
import { EnergyusagecardComponent } from '../Dashboard/components/energyusagecard/energyusagecard.component';
import { Electricityto1cardComponent } from '../Dashboard/components/electricityto1card/electricityto1card.component';
import {NgxCarouselModule} from 'ngx-carousel';
import {HttpClientModule} from '@angular/common/http';
import { Electricityto2cardComponent } from '../Dashboard/components/electricityto2card/electricityto2card.component';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import { GascardComponent } from '../Dashboard/components/gascard/gascard.component';
import { PayingspageComponent } from '../Dashboard/pages/payingspage/payingspage.component';
import { PayingscardComponent } from '../Dashboard/components/payingscard/payingscard.component';
import {ElectricitymeterService} from './services/electricitymeter.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    HttpClientModule,
    SharedModule,
    ChartsModule,
    NgxCarouselModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgHttpLoaderModule
  ],
  declarations: [DashboardpageComponent, TopbarComponent, SidebarComponent,
                UserpageComponent, MeasurementpageComponent, HomepageComponent,
                PaginationbarComponent, EnergyusagecardComponent, Electricityto1cardComponent, Electricityto2cardComponent,
                GascardComponent,
                PayingspageComponent,
                PayingscardComponent],
  exports: [DashboardpageComponent, TopbarComponent, SidebarComponent,
    UserpageComponent, MeasurementpageComponent, HomepageComponent,
    PaginationbarComponent, EnergyusagecardComponent, Electricityto1cardComponent, Electricityto2cardComponent, GascardComponent],
  providers: [ElectricitymeterService]

})
export class DashboardModule { }

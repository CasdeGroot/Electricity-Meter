import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginModule} from './login/login.module';
import { HttpClientModule} from '@angular/common/http';
import {InterceptorsModule} from './interceptors/interceptors.module';
import { SweetAlertService } from 'ngx-sweetalert2';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app.routing.module';
import {DashboardModule} from './Dashboard/dashboard.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    HttpClientModule,
    InterceptorsModule,
    AppRoutingModule,
    DashboardModule,
    BrowserAnimationsModule
  ],
  providers: [ SweetAlertService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

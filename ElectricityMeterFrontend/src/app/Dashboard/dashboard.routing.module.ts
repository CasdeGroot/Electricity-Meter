import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {UserpageComponent} from './pages/userpage/userpage.component';
import {MeasurementpageComponent} from './pages/measurementpage/measurementpage.component';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {PayingspageComponent} from './pages/payingspage/payingspage.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' , data: {icon: 'fa fa-home', title: 'Home'}},
  { path: 'home', component: HomepageComponent, data: {icon: 'fa fa-home', title: 'Home'}},
  { path: 'dashboard', component: MeasurementpageComponent, data: { icon: 'fa fa-line-chart', title: 'Measurements'}},
  { path: 'user', component: UserpageComponent, data: {icon: 'fa fa-user', title: 'User Profile'}},
  { path: 'payings', component: PayingspageComponent, data: {icon: 'fa fa-money', title: 'Payings'}},
  ];

@NgModule({
  exports: [ RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class DashboardRoutingModule { }

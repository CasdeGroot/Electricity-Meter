import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/mergeMap';
import {ElectricitymeterService} from '../../services/electricitymeter.service';

@Component({
  selector: 'app-paginationbar',
  templateUrl: './paginationbar.component.html',
  styleUrls: ['./paginationbar.component.scss']
})
export class PaginationbarComponent implements OnInit {

  public title = '';
  public icon = '';
  public currentElectricity = 0;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private service: ElectricitymeterService) { }

  ngOnInit() {
    this.subscribeToRouter();
    //this.getLastMeasurement();
  }

  // private getLastMeasurement() {
  //   this.service.getLastMeasurment().subscribe((measurement) => {
  //     this.currentElectricity = measurement.electricityTo1;
  //   });
  // }

  private subscribeToRouter() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        this.title = event.title;
        this.icon = event.icon;
      });
  }

}

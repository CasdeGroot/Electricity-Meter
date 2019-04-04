import { Component, OnInit } from '@angular/core';
import {NgxCarousel} from 'ngx-carousel';

@Component({
  selector: 'app-measurementpage',
  templateUrl: './measurementpage.component.html',
  styleUrls: ['./measurementpage.component.scss']
})
export class MeasurementpageComponent implements OnInit {

  carouselOne: NgxCarousel;
  constructor() { }

  ngOnInit() {
    this.carouselOne = <NgxCarousel>({
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 800,
      interval: 4000,
      point: {
        visible: true,
      },
      load: 2,
      loop: false,
      touch: false
    });
  }

  public myfunc(event: Event) {
  }
}

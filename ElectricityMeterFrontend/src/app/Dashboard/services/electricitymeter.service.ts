import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ElectricitymeterService {

  constructor(private http: HttpClient) { }

  getLastMeasurment() {
      return this.http.get('api/measurement/last');
  }

}

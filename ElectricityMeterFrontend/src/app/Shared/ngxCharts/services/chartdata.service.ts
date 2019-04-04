import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MultiItem} from '../basechart/multiitem.class';
import {SingleItem} from '../basechart/singleItem.class';
import {RequesthelperService} from '../../requests/services/requesthelper.service';
import {Request} from '../../requests/classes/request.class';
import * as moment from 'moment';

@Injectable()
export class ChartdataService {

  constructor(private http: RequesthelperService) { }

  getMultiDataSource<N, M>(value: string, name: string, request: Request<any>): Observable<MultiItem<N, M>[]> {
    request.select = value + ' ' + name;

    return this.http.get<any>(request)
      .map((response) => {
        return response.map((measurement: any) => {
          return new MultiItem<N, M>(measurement[value], (measurement[name]));
        })
          .filter(multiItem => !isNaN(multiItem.value));
      });
  }

  getMultiDataSourceWithDate<N>(value: string, name: string, request: Request<any>): Observable<MultiItem<N, Date>[]> {
    request.select = value + ' ' + name;

    return this.http.get<any>(request)
      .map((response) => {
        return response.map((measurement: any) => {
          return new MultiItem<N, Date>(measurement[value], moment(measurement[name]).toDate());
        })
          .filter(multiItem => !isNaN(multiItem.value));
      });
  }

  getSingleDataSource<T>(): Observable<SingleItem<T>[]> {
   return null;
  }

}

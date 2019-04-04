import {HttpParams} from '@angular/common/http';
import * as moment from 'moment';
import { Moment } from 'moment';
import {IRequest} from '../interfaces/request.interface';

export class Request<T> implements IRequest<T> {
  public url: string;
  public item: T;
  public filter: any;
  public select: any;
  public beginDate: Moment;
  public endDate: Moment;

  getParams(): HttpParams {
    const params = new HttpParams()
      .set('filter', JSON.stringify(this.filter) || JSON.stringify({}))
      .set('select', this.select || '')
      .set('beginDate', this.beginDate.format('DD-MM-YYYY') || moment().subtract('100', 'years').format('DD-MM-YYYY'))
      .set('endDate', this.endDate.format('DD-MM-YYYY') || moment().add('100', 'years').format('DD-MM-YYYY'));

    return params;
  }

  constructor(json?: any) {
    const defaults = this.getDefaults();

    for(const prop in json) { defaults[prop] = json[prop]; }

    for(const prop in defaults) { this[prop] = defaults[prop]; }

  }

  private getDefaults() {
    return <IRequest<T>>{
      beginDate: moment(),
      enDate: moment(),
      filter: {},
      item: null,
      select: '',
      url: ''
    };
  }
}

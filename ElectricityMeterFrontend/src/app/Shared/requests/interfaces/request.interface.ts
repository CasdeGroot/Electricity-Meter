import {Moment} from 'moment';

export interface IRequest<T> {
  url?: string;
  item?: T;
  filter?: any;
  select?: any;
  beginDate?: Moment;
  endDate?: Moment;
}

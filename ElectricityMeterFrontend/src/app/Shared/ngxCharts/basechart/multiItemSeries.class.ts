import {MultiItem} from './multiitem.class';

export class MultiDataSerie {
  public name: string;
  public series: MultiItem<any, any>[];

  constructor(name: string, series: MultiItem<any, any>[]) {
    this.name = name;
    this.series = series;
  }
}

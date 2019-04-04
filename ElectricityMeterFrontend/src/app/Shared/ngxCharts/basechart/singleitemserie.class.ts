import {SingleItem} from './singleItem.class';

export class Singleitemserie {
  public name: string;
  public series: SingleItem<any>[];

  constructor(name: string, series: SingleItem<any>[]) {
    this.name = name;
    this.series = series;
  }
}

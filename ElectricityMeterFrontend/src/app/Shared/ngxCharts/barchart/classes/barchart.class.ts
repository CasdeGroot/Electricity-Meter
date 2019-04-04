import { Basechart } from '../../basechart/basechart.class';
import {IBaseChart} from '../../basechart/basechart.interface';
import {IBarChart} from './barchart.interface';
import {Singleitemserie} from '../../basechart/singleitemserie.class';
import {SingleItem} from '../../basechart/singleItem.class';

export class BarChart  {

  showXAxis: boolean;
  showYAxis: boolean;
  gradient: boolean;
  showLegend: boolean;
  showXAxisLabel: boolean;
  xAxisLabel: string;
  showYAxisLabel: string;
  yAxisLabel: string;
  data: any[];

  constructor(json?: any) {
    const defaults = this.getDefaults();

    for (const prop in json) { defaults[prop] = json[prop]; }

    for (const prop in defaults) { this[prop] = defaults[prop]; }
  }

  private getDefaults() {
    return <IBarChart>{
      data:  [],
      gradient: false,
      showLegend: true,
      showXAxis: true,
      showXAxisLabel: true,
      showYAxisLabel: true,
      showYAxis: true,
      xAxisLabel: '',
      yAxisLabel: ''
    };
  }

  public update() {
    this.data = [...this.data];
  }
}

import {SingleItem} from '../../basechart/singleItem.class';
import {Singleitemserie} from '../../basechart/singleitemserie.class';

export interface IBarChart {
  showXAxis?: boolean;
  showYAxis?: boolean;
  gradient?: boolean;
  showLegend?: boolean;
  showXAxisLabel?: boolean;
  xAxisLabel?: string;
  showYAxisLabel?: boolean;
  yAxisLabel?: string;
}

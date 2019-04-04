export interface IBaseChart {
  xAxisLabel?: string;
  yAxisLabel?: string;
  showXAxisLabel?: boolean;
  showYAxisLabel?: boolean;
  data?: any;
  xAxis?: boolean;
  yAxis?: boolean;
  legend?: boolean;
  disableTooltip?: boolean;
  autoScale?: boolean;
  timeline?: boolean;
}

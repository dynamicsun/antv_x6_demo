import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { EChartsOption } from 'echarts';

@Component({
  templateUrl: './chronology-modal.component.html',
  styleUrls: ['./chronology-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChronologyModalComponent implements OnInit {
  static readonly config: Partial<MatDialogConfig<unknown>> = {
    width: '160vw',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly handler?: {
      readonly stationId: number;
      readonly nodeId: string;
    }
  ) {}
  readonly chartOptions: EChartsOption = {
    xAxis: {
      type: 'time',
      axisLabel: { color: 'white' },
    },
    darkMode: true,
    toolbox: {
      feature: {
        dataZoom: {},
        restore: {},
      },
    },
    yAxis: {
      type: 'value',
      scale: true,
      axisLabel: { color: 'white' },
    },
    series: [
      {
        data: [
          ['2022-11-10', 820],
          ['2022-11-11', 830],
          ['2022-11-12', 840],
          // 820, 932, 901, 934, 1290, 1330, 1320
        ],
        type: 'line',
      },
    ],
  };
  ngOnInit(): void {}
}

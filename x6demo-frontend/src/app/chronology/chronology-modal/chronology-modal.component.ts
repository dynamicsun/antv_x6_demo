import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { EChartsOption } from 'echarts';
import { Observable, map, shareReplay } from 'rxjs';
import { NodeLoadingTimeline } from 'src/app/api/models';
import { StationsService } from 'src/app/api/services';

function buildChartOptions(data: NodeLoadingTimeline): EChartsOption {
  return {
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
}

@Component({
  templateUrl: './chronology-modal.component.html',
  styleUrls: ['./chronology-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChronologyModalComponent {
  static readonly config: Partial<MatDialogConfig<unknown>> = {
    width: '160vw',
  };
  readonly data$: Observable<NodeLoadingTimeline>;
  readonly chartOptions$: Observable<EChartsOption>;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly handler: {
      readonly stationId: number;
      readonly nodeId: string;
    },
    private readonly apiService: StationsService
  ) {
    this.data$ = this.apiService
      .getNodeLoading(this.handler)
      .pipe(shareReplay(1));
    this.chartOptions$ = this.data$.pipe(map(buildChartOptions));
  }
}

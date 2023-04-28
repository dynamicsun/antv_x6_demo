import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { EChartsOption } from 'echarts';
import { Observable, map, shareReplay } from 'rxjs';
import { NodeLoadingTimeline } from 'src/app/api/models';
import { StationsService } from 'src/app/api/services';
import { LoadingSubject } from './loading-subject';

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
      name: 'Объём, м3',
    },
    series: [
      {
        tooltip: { show: true },
        data: data.points.map((p) => [p.t, p.v]),
        type: 'line',
        smooth: true,
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
  readonly loading$ = new LoadingSubject();
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
      .pipe(this.loading$.wrap(), shareReplay(1));
    this.chartOptions$ = this.data$.pipe(map(buildChartOptions));
  }
}

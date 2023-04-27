import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Graph, Edge } from '@antv/x6';
import { Subscription, map, switchMap } from 'rxjs';
import { StationsService } from '../api/services';
import { SourceReference, StationStructureModel } from '../api/models';

type Dict<T> = { [id in string]: T };
class StructureScheme {
  private _layout!: Dict<{ x: number; y: number }>;
  constructor(private readonly graph: Graph) {}
  readonly _edges: Edge.Metadata[] = [];
  setup(stationStructure: StationStructureModel) {
    this.graph.model.clear();
    this._layout = stationStructure.layout || {};
    Object.entries(stationStructure.sources).forEach(([id, value]) =>
      this._add({ id, type: 'source', ...value, inputs: {} })
    );
    Object.entries(stationStructure.targets).forEach(([id, value]) =>
      this._add({ id, type: 'target', ...value, inputs: { i1: value.input } })
    );
    Object.entries(stationStructure.nodes).forEach(([id, value]) =>
      this._add({ id, ...value })
    );
    this.graph.addEdges(this._edges);
  }

  private _add(conf: {
    id: string;
    title: string;
    type: string;
    inputs: Dict<SourceReference>;
  }) {
    this.graph.addNode({
      id: conf.id,
      // label: conf.title, // Напрямую не используется. Может пригодиться для тултипов
      shape: 'station-structure-' + conf.type,
      data: { ngArguments: { conf } },
      ...this._layout[conf.id],
    });
    this._edges.push(
      ...Object.entries(conf.inputs).map(([key, sr]) => ({
        source: sr.obj,
        target: conf.id,
        sourcePort: sr.port || 'main',
        targetPort: key,
      }))
    );
  }
}
@Component({
  selector: 'app-station-structure-graph',
  templateUrl: './station-structure-graph.component.html',
  styleUrls: ['./station-structure-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationStructureGraphComponent
  implements AfterViewInit, OnDestroy
{
  private readonly _$subscription = new Subscription();
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: StationsService
  ) {}
  ngOnDestroy(): void {
    this._$subscription.unsubscribe();
  }
  @ViewChild('graphContainer', { static: true })
  graphContainerRef!: ElementRef<HTMLDivElement>;

  @ViewChild('customNodeTemplate', { static: true })
  customNodeTemplateRef!: TemplateRef<any>;
  ngAfterViewInit(): void {
    const graph = new Graph({
      container: this.graphContainerRef.nativeElement,
      grid: true,
      connecting: {
        router: 'manhattan',
      },
      background: { color: 'black' },
    });

    const scheme = new StructureScheme(graph);
    (window as any).dumpLayout = () =>
      JSON.stringify(
        graph.getNodes().reduce(
          (acc, node) => ({
            ...acc,
            [node.id]: node.getPosition(),
          }),
          {} as { [id: string]: { x: number; y: number } }
        )
      );

    this._$subscription.add(
      this.activatedRoute.params
        .pipe(
          map((x) => +x['stationId']),
          switchMap((stationId) => this.apiService.getStructure({ stationId }))
        )
        .subscribe((x) => {
          scheme.setup(x);
        })
    );
  }
}

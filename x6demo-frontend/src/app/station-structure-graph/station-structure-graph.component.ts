import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Graph, Edge } from '@antv/x6';
import { NEVER, Subscription, map, switchMap, tap, using } from 'rxjs';
import { StationsService } from '../api/services';
import { SourceReference, StationStructureModel } from '../api/models';
import { MatDialog } from '@angular/material/dialog';
import { ChronologyModalComponent } from '../chronology';
import { Title } from '@angular/platform-browser';

type Dict<T> = { [id in string]: T };
interface NodeNgArguments {
  conf: { title: string; id: string };
}
class StructureScheme {
  private _layout!: Dict<{ x: number; y: number }>;
  constructor(private readonly graph: Graph) {}
  readonly _edges: Edge.Metadata[] = [];
  setup(stationStructure: StationStructureModel) {
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
      shape: 'station-structure-' + conf.type,
      data: { ngArguments: { conf } as NodeNgArguments },
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

function usingGraph(factory: () => Graph) {
  return using(
    () => {
      const graph = factory();
      return {
        unsubscribe: () => {
          graph.dispose();
        },
      };
    },
    () => NEVER
  );
}
function getStationId(params: Params) {
  return +params['stationId'];
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
    private readonly apiService: StationsService,
    private readonly dialogService: MatDialog,
    private readonly title: Title
  ) {}
  ngOnDestroy(): void {
    this._$subscription.unsubscribe();
  }
  @ViewChild('graphContainer', { static: true })
  graphContainerRef!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    let lastGraph: Graph;
    (window as any).dumpLayout = () =>
      JSON.stringify(
        lastGraph?.getNodes().reduce(
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
          map(getStationId),
          switchMap((stationId) => this.apiService.getStructure({ stationId })),
          tap((structure) => this.title.setTitle(structure.title)),
          switchMap((structure) =>
            usingGraph(() => {
              const graph = new Graph({
                container: this.graphContainerRef.nativeElement,
                grid: true,
                connecting: {
                  router: 'manhattan',
                },
                panning: { enabled: true },
                mousewheel: { enabled: true },
                background: { color: 'black' },
              });

              const scheme = new StructureScheme(graph);
              scheme.setup(structure);
              lastGraph = graph;
              return graph;
            })
          )
        )
        .subscribe()
    );
  }
  handleViewDetails(evt: NodeNgArguments) {
    this.dialogService.open(ChronologyModalComponent, {
      ...ChronologyModalComponent.config,
      data: {
        stationId: getStationId(this.activatedRoute.snapshot.params),
        nodeId: evt.conf.id,
      },
    });
  }
}

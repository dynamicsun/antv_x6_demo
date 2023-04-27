import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Graph, Edge } from '@antv/x6';

interface SourceRef {
  obj: string;
  port?: string;
}

type Dict<T> = { [id in string]: T };
interface StationStructure {
  title: string;
  sources: Dict<{ title: string }>;
  targets: Dict<{ title: string; input: SourceRef }>;
  nodes: Dict<{ title: string; type: string; inputs: Dict<SourceRef> }>;
}

const stationStructure: StationStructure = {
  title: 'Объект 406/19-АМ',
  sources: {
    ['src-1']: { title: 'Источник 1' },
    ['src-2']: { title: 'Источник 2' },
  },
  targets: {
    ['consumer-1']: {
      title: 'Потребитель 1',
      input: { obj: 'sep-1', port: 'product1' },
    },
    ['consumer-2']: {
      title: 'Потребитель 2',
      input: { obj: 'sep-1', port: 'product2' },
    },
  },
  nodes: {
    pump: {
      title: 'Насосная установка',
      type: 'pump-3i-1o',
      inputs: {
        i1: { obj: 'src-1' },
        i2: { obj: 'src-2' },
        i3: { obj: 'tank', port: 'p1' },
      },
    },
    tank: {
      title: 'Резервуар К-4',
      type: 'tank-1i-1o',
      inputs: { i1: { obj: 'sep-1', port: 'remains' } },
    },
    ['sep-1']: {
      title: 'Сепаратор С-8',
      type: 'sep-1i-2o-1rem',
      inputs: {
        i1: { obj: 'pump' },
      },
    },
  },
};
class StructureScheme {
  constructor(private readonly graph: Graph) {}
  readonly _edges: Edge.Metadata[] = [];
  setup(stationStructure: StationStructure) {
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
    inputs: Dict<SourceRef>;
  }) {
    this.graph.addNode({
      id: conf.id,
      // label: conf.title, // Напрямую не используется. Может пригодиться для тултипов
      shape: 'station-structure-' + conf.type,
      data: { ngArguments: { conf } },
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
export class StationStructureGraphComponent implements AfterViewInit {
  @ViewChild('graphContainer', { static: true })
  graphContainerRef!: ElementRef<HTMLDivElement>;

  @ViewChild('customNodeTemplate', { static: true })
  customNodeTemplateRef!: TemplateRef<any>;
  ngAfterViewInit(): void {
    console.log('initialization');
    const graph = new Graph({
      container: this.graphContainerRef.nativeElement,
      grid: true,
      connecting: { router: 'orth' },
    });
    const scheme = new StructureScheme(graph);
    scheme.setup(stationStructure);

    const source = graph.addNode({
      // x: 300,
      // y: 40,
      // width: 80,
      // height: 40,
      label: 'Hello',
      // shape: SHAPE,
      data: { ngArguments: { value: 19.78 } },
    });

    const target = graph.addNode({
      // x: 420,
      // y: 180,
      width: 80,
      height: 40,
      ports: [{ id: 'p-1' }],
      label: 'World',
    });

    graph.addEdge({
      source: source,
      target,
      sourcePort: 'p-1',
      targetPort: 'p-1',
    });
  }
}

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Graph } from '@antv/x6';
import { register } from '@antv/x6-angular-shape';

@Component({
  selector: 'app-station-structure-graph',
  templateUrl: './station-structure-graph.component.html',
  styleUrls: ['./station-structure-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationStructureGraphComponent implements AfterContentInit {
  constructor(private readonly injector: Injector) {}
  @ViewChild('graphContainer', { static: true })
  graphContainerRef!: ElementRef<HTMLDivElement>;

  @ViewChild('customNodeTemplate', { static: true })
  customNodeTemplateRef!: TemplateRef<any>;
  ngAfterContentInit(): void {
    const SHAPE = 'custom-node-1';
    register({
      content: this.customNodeTemplateRef,
      shape: SHAPE,
      width: 120,
      height: 30,
      injector: this.injector,
    });
    const graph = new Graph({
      container: this.graphContainerRef.nativeElement,
      grid: true,
    });

    const source = graph.addNode({
      x: 300,
      y: 40,
      width: 80,
      height: 40,
      label: 'Hello',
      shape: SHAPE,
      data: { ngArguments:{ value: 19.78 } },
    });

    const target = graph.addNode({
      x: 420,
      y: 180,
      width: 80,
      height: 40,
      label: 'World',
    });

    graph.addEdge({
      source,
      target,
    });
  }
}

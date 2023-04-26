import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Graph } from '@antv/x6';

@Component({
  selector: 'app-station-structure-graph',
  templateUrl: './station-structure-graph.component.html',
  styleUrls: ['./station-structure-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationStructureGraphComponent implements AfterContentInit {
  @ViewChild('graphContainer', { static: true })
  graphContainerRef!: ElementRef<HTMLDivElement>;

  ngAfterContentInit(): void {
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

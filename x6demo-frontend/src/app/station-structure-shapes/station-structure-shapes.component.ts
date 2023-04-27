import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Injector,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ShapeDefinitionConf } from './shape-definition.directive';


const c = (v: ShapeDefinitionConf)=>v;
@Component({
  selector: 'app-station-structure-shapes',
  templateUrl: './station-structure-shapes.component.html',
  styleUrls: ['./station-structure-shapes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationStructureShapesComponent {
  constructor(private readonly injector: Injector) {}

  readonly conf = {
    source: c({shape: 'station-structure-source',}),
    target: c({shape: 'station-structure-target',}),
    pump3i1o: c({shape: 'station-structure-pump-3i-1o',}),
    tank1i1o: c({shape: 'station-structure-tank-1i-1o',}),
    sep1i2o1: c({shape: 'station-structure-sep-1i-2o-1rem',}),
  }

}

/*
source
target
pump-3i-1o,
tank-1i-1o,
sep-1i-2o-1rem,


const SHAPE = 'custom-node-1';
register({
  content: this.customNodeTemplateRef,
  shape: SHAPE,
  width: 120,
  height: 30,
  injector: this.injector,
  ports: [{ id: 'p-1' }],
});
*/

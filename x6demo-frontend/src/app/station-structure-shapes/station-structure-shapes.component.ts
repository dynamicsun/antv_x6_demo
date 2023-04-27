import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShapeDefinitionConf } from './shape-definition.directive';
import { PortManager } from '@antv/x6/lib/model/port';

const c = (v: ShapeDefinitionConf) => v;
const defSize = {
  width: 100,
  height: 180,
};

const absPortGroup: PortManager.GroupMetadata = {
  position: 'absolute',
  attrs: { circle: { r: 6 } },
};
@Component({
  selector: 'app-station-structure-shapes',
  templateUrl: './station-structure-shapes.component.html',
  styleUrls: ['./station-structure-shapes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationStructureShapesComponent {
  readonly conf = {
    source: c({
      shape: 'station-structure-source',
      width: 120,
      height: 30,
      ports: {
        groups: { g: absPortGroup },
        items: [{ id: 'main', group: 'g', args: { x: '100%', y: '50%' } }],
      },
    }),
    target: c({
      shape: 'station-structure-target',
      width: 150,
      height: 30,
      ports: {
        groups: { g: absPortGroup },
        items: [{ id: 'i1', group: 'g', args: { x: 0, y: '50%' } }],
      },
    }),
    pump3i1o: c({
      shape: 'station-structure-pump-3i-1o',
      ...defSize,
      ports: [{ id: 'i1' }, { id: 'i2' }, { id: 'i3' }, { id: 'main' }],
    }),
    tank1i1o: c({
      shape: 'station-structure-tank-1i-1o',
      width: 320,
      height: 180,
      ports: {
        groups: { g: absPortGroup },
        items: [
          { id: 'i1', args: { x: 0, y: 165 }, group: 'g' },
          { id: 'main', args: { x: '100%', y: 165 }, group: 'g'  },
        ],
      },
    }),
    sep1i2o1: c({
      shape: 'station-structure-sep-1i-2o-1rem',
      ...defSize,
      ports: [
        { id: 'i1' },
        { id: 'product1' },
        { id: 'product2' },
        { id: 'remains' },
      ],
    }),
  };
}

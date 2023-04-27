import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShapeDefinitionConf } from './shape-definition.directive';
import { PortManager } from '@antv/x6/lib/model/port';

const c = (v: ShapeDefinitionConf) => v;

const absPortGroup: PortManager.GroupMetadata = {
  position: 'absolute',
  attrs: { circle: { r: 3 } },
};
function ports(
  ...items: { id: string; x: string | number; y: string | number }[]
) {
  return {
    groups: { g: absPortGroup },
    items: items.map((item) => ({
      id: item.id,
      args: { x: item.x, y: item.y },
      group: 'g',
    })),
  };
}
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
      width: 160,
      height: 30,
      ports: ports({ id: 'main', x: '100%', y: '50%' }),
    }),
    target: c({
      shape: 'station-structure-target',
      width: 160,
      height: 30,
      ports: ports({ id: 'i1', x: 0, y: '50%' }),
    }),
    pump3i1o: c({
      shape: 'station-structure-pump-3i-1o',
      width: 280,
      height: 200,
      ports: ports(
        { id: 'i1', x: 0, y: '10%' },
        { id: 'i2', x: 0, y: '50%' },
        { id: 'i3', x: 0, y: '90%' },
        { id: 'main', x: '100%', y: '50%' }
      ),
    }),
    tank1i1o: c({
      shape: 'station-structure-tank-1i-1o',
      width: 320,
      height: 180,
      ports: ports(
        { id: 'i1', x: 0, y: 165 },
        { id: 'main', x: '100%', y: 165 }
      ),
    }),
    sep1i2o1rem: c({
      shape: 'station-structure-sep-1i-2o-1rem',
      width: 260,
      height: 200,
      ports: ports(
        { id: 'i1', x: 0, y: 57 },
        { id: 'product1', x: '100%', y: 57 },
        { id: 'product2', x: 46, y: '100%' },
        { id: 'remains', x: 170, y: '100%' }
      ),
    }),
  };

  handleView(el: any) {
    console.log(el);
  }
}

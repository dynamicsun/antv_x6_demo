import { Shape } from '@antv/x6';

export function applyX6Configuration() {
  Shape.Edge.config({
    attrs: {
      line: {
        stroke: '#CCC',
      },
    },
  });
}

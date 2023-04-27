/* tslint:disable */
/* eslint-disable */
import { Point } from './point';
import { StationStructureNodeModel } from './station-structure-node-model';
import { StationStructureSourceModel } from './station-structure-source-model';
import { StationStructureTargetModel } from './station-structure-target-model';
export interface StationStructureModel {
  layout?: {
[key: string]: Point;
};
  nodes: {
[key: string]: StationStructureNodeModel;
};
  sources: {
[key: string]: StationStructureSourceModel;
};
  targets: {
[key: string]: StationStructureTargetModel;
};
  title: string;
}

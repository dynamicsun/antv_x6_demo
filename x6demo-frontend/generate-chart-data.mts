import {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from 'fs';
import { join } from 'path';
import {
  NodeLoadingTimeline,
  NodeLoadingTimelinePoint,
  StationStructureModel,
} from './src/app/api/models';
import { Random } from 'random';

const STATIONS_DIR = 'src/assets/data/api/station';
const dirs = readdirSync(STATIONS_DIR);

// "mkdir -p"
function mkdirp(...pathTokens: string[]) {
  let path = '';
  for (const token of pathTokens) {
    path = join(path, token);
    if (!existsSync(path)) {
      mkdirSync(path);
    }
  }
}

const random = new Random();
const mult = random.normal(1, 0.1);
const additive = random.normal(0, 10);
const outliers = random.poisson(0.1);

for (const dir of dirs) {
  const json = readFileSync(join(STATIONS_DIR, dir, 'structure'), 'utf-8');
  const stationStructure = JSON.parse(json) as StationStructureModel;

  const nodes = Object.entries({
    ...stationStructure.sources,
    ...stationStructure.targets,
    ...stationStructure.nodes,
  }).map(([id, v]) => ({ id, title: v.title }));

  for (const node of nodes) {
    const nodeDir = [STATIONS_DIR, dir, 'node', node.id];
    mkdirp(...nodeDir);

    const points: NodeLoadingTimelinePoint[] = [];

    let d = new Date();
    d.setDate(d.getDate() - 10);
    for (let i = 0; i < 100; i++) {
      let v = (Math.sin((i * Math.PI) / 20) + i / 10) * 100;
      v = v * mult() + additive() + outliers();
      v = points.push({
        t: d.toISOString().replace('T', ' ').substring(0, 19),
        v,
      });
      d.setSeconds(d.getSeconds() + 120);
    }

    const timeline: NodeLoadingTimeline = {
      stationTitle: stationStructure.title,
      nodeTitle: node.title,
      points,
    };
    writeFileSync(join(...nodeDir, 'loading'), JSON.stringify(timeline), {
      encoding: 'utf-8',
    });
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationStructureGraphComponent } from './station-structure-graph/station-structure-graph.component';
import { EmptyPageComponent } from './empty-page/empty-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EmptyPageComponent,
  },
  {
    path: 'stations/:stationId',
    component: StationStructureGraphComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

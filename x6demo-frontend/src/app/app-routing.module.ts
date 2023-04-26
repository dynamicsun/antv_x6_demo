import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationStructureGraphComponent } from './station-structure-graph/station-structure-graph.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'object-1',
  },
  {
    path: 'object-1',
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

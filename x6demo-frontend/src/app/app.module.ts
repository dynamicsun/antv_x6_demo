import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StationStructureGraphComponent } from './station-structure-graph/station-structure-graph.component';
import { HeaderComponent } from './header/header.component';
import {
  StationStructureShapesComponent,
  ShapeDefinitionDirective,
} from './station-structure-shapes';

@NgModule({
  declarations: [
    AppComponent,
    StationStructureGraphComponent,
    HeaderComponent,
    StationStructureShapesComponent,
    ShapeDefinitionDirective,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

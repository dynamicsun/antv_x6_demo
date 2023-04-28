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
import { ApiModule } from './api/api.module';
import { HttpClientModule } from '@angular/common/http';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChronologyModule } from './chronology';
@NgModule({
  declarations: [
    AppComponent,
    StationStructureGraphComponent,
    HeaderComponent,
    StationStructureShapesComponent,
    ShapeDefinitionDirective,
    EmptyPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: '/assets/data' }),
    BrowserAnimationsModule,
    ChronologyModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

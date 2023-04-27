/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { StationListItem } from '../models/station-list-item';
import { StationStructureModel } from '../models/station-structure-model';

@Injectable({
  providedIn: 'root',
})
export class StationsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getStationStructure
   */
  static readonly GetStationStructurePath = '/api/station/{stationId}/structure';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStructure()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStructure$Response(params: {
    stationId: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<StationStructureModel>> {

    const rb = new RequestBuilder(this.rootUrl, StationsService.GetStationStructurePath, 'get');
    if (params) {
      rb.path('stationId', params.stationId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StationStructureModel>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStructure$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStructure(params: {
    stationId: number;
  },
  context?: HttpContext

): Observable<StationStructureModel> {

    return this.getStructure$Response(params,context).pipe(
      map((r: StrictHttpResponse<StationStructureModel>) => r.body as StationStructureModel)
    );
  }

  /**
   * Path part for operation getStationsList
   */
  static readonly GetStationsListPath = '/api/stations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list()` instead.
   *
   * This method doesn't expect any request body.
   */
  list$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<StationListItem>>> {

    const rb = new RequestBuilder(this.rootUrl, StationsService.GetStationsListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<StationListItem>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `list$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list(params?: {
  },
  context?: HttpContext

): Observable<Array<StationListItem>> {

    return this.list$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<StationListItem>>) => r.body as Array<StationListItem>)
    );
  }

}

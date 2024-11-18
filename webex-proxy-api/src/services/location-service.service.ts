import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {WebexV1ApiDataSource} from '../datasources';
import { ItemsResponseWithMissingIds } from '../lib';
import { Location } from '../schema';

export interface LocationService {
  getLocations(
    id?: string,
    max?: number,
    name?: string,
    orgId?: string,
  ): Promise<ItemsResponseWithMissingIds<Location>>;

  getLocation(locationId: string): Promise<Location>
}

export class LocationServiceProvider implements Provider<LocationService> {
  constructor(
    // WebexV1Api must match the name property in the datasource json file
    @inject('datasources.WebexV1Api')
    protected dataSource: WebexV1ApiDataSource = new WebexV1ApiDataSource(),
  ) {}

  value(): Promise<LocationService> {
    return getService(this.dataSource);
  }
}

import { inject, Provider } from '@loopback/core';
import { getService } from '@loopback/service-proxy';
import { WebexV1ApiDataSource } from '../datasources';
import { ItemsResponse } from '../lib';
import { Person } from '../schema';

export interface PeopleService {
  getPeople(
    email?: string,
    displayName?: string,
    id?: string,
    orgId?: string,
    roles?: string,
    callingData?: boolean,
    locationId?: string,
    max?: number,
  ): Promise<ItemsResponse<Person>>;

  getPerson(
    userId: string,
    callingData?: boolean,
  ): Promise<Person>;
}

export class PeopleServiceProvider implements Provider<PeopleService> {
  constructor(
    @inject('datasources.WebexV1Api')
    protected dataSource: WebexV1ApiDataSource = new WebexV1ApiDataSource(),
  ) {}

  value(): Promise<PeopleService> {
    return getService(this.dataSource);
  }
}

import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {WebexAnalyticsV1ApiDataSource} from '../datasources';
import { ItemsResponse } from '../lib';
import { CdrEntry } from '../schema';

export interface CdrService {
  getCdrEntries(
    startTime: string,
    endTime: string,
    locations?: string,
    max?: number,
  ): Promise<ItemsResponse<CdrEntry>>;
}

export class CdrServiceProvider implements Provider<CdrService> {
  constructor(
    // WebexAnalyticsV1Api must match the name property in the datasource json file
    @inject('datasources.WebexAnalyticsV1Api')
    protected dataSource: WebexAnalyticsV1ApiDataSource = new WebexAnalyticsV1ApiDataSource(),
  ) {}

  value(): Promise<CdrService> {
    return getService(this.dataSource);
  }
}

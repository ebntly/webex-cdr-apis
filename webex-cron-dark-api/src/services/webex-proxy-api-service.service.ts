import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {WebexProxyApiDataSource} from '../datasources';
import type { CdrQuerySpecType, RecordingObjectQuerySpecType, CdrEntry, RecordingObject } from 'webex-proxy-api/dist/schema';

export interface WebexProxyApiService {
  cdrControllerGetEntries(params: CdrQuerySpecType): Promise<{body: CdrEntry[]}>;
  recordingControllerGetRecordings(params: RecordingObjectQuerySpecType): Promise<{body: RecordingObject[]}>;  
}

export class WebexProxyApiServiceProvider implements Provider<WebexProxyApiService> {
  constructor(
    // WebexProxyApi must match the name property in the datasource json file
    @inject('datasources.WebexProxyApi')
    protected dataSource: WebexProxyApiDataSource = new WebexProxyApiDataSource(),
  ) {}

  value(): Promise<WebexProxyApiService> {
    return getService(this.dataSource);
  }
}

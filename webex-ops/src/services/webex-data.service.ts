import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {WebexDataDataSource} from '../datasources';
import { Filter, Where } from '@loopback/repository';
import { CdrEntry, ConvergedRecording } from 'webex-data/dist/models';
import { RecordingObjectDetail } from 'webex-proxy-api/dist/schema';

export interface WebexData {
  cdrControllerCount(filter?: Where<CdrEntry>): Promise<{body: {count: number}}>;
  cdrControllerFind(filter?: Filter<CdrEntry>): Promise<{body: CdrEntry[]}>;
  recordingControllerCount(filter?: Where<ConvergedRecording>): Promise<{body: {count: number}}>;
  recordingControllerFind(filter?: Filter<ConvergedRecording>): Promise<{body: ConvergedRecording[]}>;
  recordingControllerFindById(id: string): Promise<{body: RecordingObjectDetail}>;
}

export class WebexDataProvider implements Provider<WebexData> {
  constructor(
    // WebexData must match the name property in the datasource json file
    @inject('datasources.WebexData')
    protected dataSource: WebexDataDataSource = new WebexDataDataSource(),
  ) {}

  value(): Promise<WebexData> {
    return getService(this.dataSource);
  }
}

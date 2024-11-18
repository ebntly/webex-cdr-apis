import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {WebexV1ApiDataSource} from '../datasources';
import { ItemsResponse } from '../lib';
import { RecordingObject, RecordingObjectDetail } from '../schema';

export interface RecordingService {
  getRecordings(
    from?: string,
    to?: string,
    status?: string,
    serviceType?: string,
    format?: string,
    ownerId?: string,
    ownerEmail?: string,
    ownerType?: string,
    storageRegion?: string,
    locationId?: string,
    max?: number,
  ): Promise<ItemsResponse<RecordingObject>>;
  getRecording(
    recordingId: string,
  ): Promise<RecordingObjectDetail>;
}

export class RecordingServiceProvider implements Provider<RecordingService> {
  constructor(
    @inject('datasources.WebexV1Api')
    protected dataSource: WebexV1ApiDataSource = new WebexV1ApiDataSource(),
  ) {}

  value(): Promise<RecordingService> {
    return getService(this.dataSource);
  }
}

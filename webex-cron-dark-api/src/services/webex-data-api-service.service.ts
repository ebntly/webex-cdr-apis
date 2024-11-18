import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {WebexDataApiDataSource} from '../datasources';
import { CdrEntry, ConvergedRecording } from 'webex-data/dist/models';
import { Entity } from '@loopback/repository';

export interface WebexDataApiService {
  cdrControllerCreate(cdrEntry: Omit<CdrEntry, keyof Entity | 'id'>): Promise<Omit<CdrEntry, keyof Entity>>;
  recordingControllerCreate(recording: Omit<ConvergedRecording, keyof Entity | 'id'>): Promise<Omit<ConvergedRecording, keyof Entity>>;
}

export class WebexDataApiServiceProvider implements Provider<WebexDataApiService> {
  constructor(
    // CdrDataApi must match the name property in the datasource json file
    @inject('datasources.WebexDataApi')
    protected dataSource: WebexDataApiDataSource = new WebexDataApiDataSource(),
  ) {}

  value(): Promise<WebexDataApiService> {
    return getService(this.dataSource);
  }
}

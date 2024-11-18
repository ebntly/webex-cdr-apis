import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {CronDataApiDataSource} from '../datasources';
import { Filter } from '@loopback/repository';
import { CronJob, CronLog } from 'webex-cron-dark-api/dist/models';

export interface CronData {
  cronJobTrackingControllerFind(filter?: Filter<CronJob>): Promise<{body: CronJob[]}>;
  cronJobTrackingControllerFindById(id: string): Promise<{body: CronJob}>;
  cronJobCronLogControllerFind(id: string, filter?: Filter<CronLog>): Promise<{body: CronLog[]}>;
}

export class CronDataProvider implements Provider<CronData> {
  constructor(
    // CronDataApi must match the name property in the datasource json file
    @inject('datasources.CronDataApi')
    protected dataSource: CronDataApiDataSource = new CronDataApiDataSource(),
  ) {}

  value(): Promise<CronData> {
    return getService(this.dataSource);
  }
}

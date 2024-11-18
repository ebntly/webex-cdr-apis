import {Entity, model, property, hasMany} from '@loopback/repository';
import {CronLog} from './cron-log.model';

@model()
export class CronJob extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  lastRun: string;

  @property({
    type: 'date',
    required: true,
  })
  lastSuccess: string;

  @hasMany(() => CronLog)
  cronLogs: CronLog[];

  constructor(data?: Partial<CronJob>) {
    super(data);
  }
}

export interface CronJobRelations {
  // describe navigational properties here
}

export type CronJobWithRelations = CronJob & CronJobRelations;

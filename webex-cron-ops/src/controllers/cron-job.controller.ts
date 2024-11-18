// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import { CronData } from '../services';
import { get, getModelSchemaRef, param, response } from '@loopback/rest';
import { Filter } from '@loopback/repository';
import { CronLog, CronJob } from 'webex-cron-dark-api/dist/models';


export class CronJobController {
  constructor(
    @inject('services.CronData') protected cronData: CronData,
  ) {}

  @get('/cron-job/list')
  @response(200, {
    description: 'List of cron jobs',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CronJob)
        },
      },
    },
  })
  async list(): Promise<CronJob[]> {
    const resp = await this.cronData.cronJobTrackingControllerFind({order: ['name ASC']});

    return resp.body;
  }

  @get('/cron-job/{id}')
  @response(200, {
    description: 'Cron job by id',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CronJob)
      },
    },
  })
  async findById(
    @param.path.string('id') id: string
  ): Promise<CronJob> {
    const resp = await this.cronData.cronJobTrackingControllerFindById(id);

    return resp.body;
  }

  @get('/cron-job/{id}/logs')
  @response(200, {
    description: 'Cron job logs by job id',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CronLog)
        },
      },
    },
  })
  async logs(
    @param.path.string('id') id: string,
    @param.query.string('filter') filter?: Filter<CronLog>
  ): Promise<CronLog[]> {
    const resp = await this.cronData.cronJobCronLogControllerFind(id, filter);

    return resp.body;
  }
}

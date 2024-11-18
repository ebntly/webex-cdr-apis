import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  CronJob,
  CronLog,
} from '../models';
import {CronJobRepository} from '../repositories';

export class CronJobCronLogController {
  constructor(
    @repository(CronJobRepository) protected cronJobRepository: CronJobRepository,
  ) { }

  @get('/cron-jobs/{id}/cron-logs', {
    responses: {
      '200': {
        description: 'Array of CronJob has many CronLog',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CronLog)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CronLog>,
  ): Promise<CronLog[]> {
    return this.cronJobRepository.cronLogs(id).find(filter);
  }

  @post('/cron-jobs/{id}/cron-logs', {
    responses: {
      '200': {
        description: 'CronJob model instance',
        content: {'application/json': {schema: getModelSchemaRef(CronLog)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof CronJob.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CronLog, {
            title: 'NewCronLogInCronJob',
            exclude: ['id'],
            optional: ['cronJobId']
          }),
        },
      },
    }) cronLog: Omit<CronLog, 'id'>,
  ): Promise<CronLog> {
    return this.cronJobRepository.cronLogs(id).create(cronLog);
  }

  @patch('/cron-jobs/{id}/cron-logs', {
    responses: {
      '200': {
        description: 'CronJob.CronLog PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CronLog, {partial: true}),
        },
      },
    })
    cronLog: Partial<CronLog>,
    @param.query.object('where', getWhereSchemaFor(CronLog)) where?: Where<CronLog>,
  ): Promise<Count> {
    return this.cronJobRepository.cronLogs(id).patch(cronLog, where);
  }

  @del('/cron-jobs/{id}/cron-logs', {
    responses: {
      '200': {
        description: 'CronJob.CronLog DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CronLog)) where?: Where<CronLog>,
  ): Promise<Count> {
    return this.cronJobRepository.cronLogs(id).delete(where);
  }
}

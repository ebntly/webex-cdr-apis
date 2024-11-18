import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CronLog} from '../models';
import {CronLogRepository} from '../repositories';

export class CronLogController {
  constructor(
    @repository(CronLogRepository)
    public cronLogRepository : CronLogRepository,
  ) {}

  @post('/cron-logs')
  @response(200, {
    description: 'CronLog model instance',
    content: {'application/json': {schema: getModelSchemaRef(CronLog)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CronLog, {
            title: 'NewCronLog',
            exclude: ['id'],
          }),
        },
      },
    })
    cronLog: Omit<CronLog, 'id'>,
  ): Promise<CronLog> {
    return this.cronLogRepository.create(cronLog);
  }

  @get('/cron-logs/count')
  @response(200, {
    description: 'CronLog model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CronLog) where?: Where<CronLog>,
  ): Promise<Count> {
    return this.cronLogRepository.count(where);
  }

  @get('/cron-logs')
  @response(200, {
    description: 'Array of CronLog model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CronLog, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CronLog) filter?: Filter<CronLog>,
  ): Promise<CronLog[]> {
    return this.cronLogRepository.find(filter);
  }

  @patch('/cron-logs')
  @response(200, {
    description: 'CronLog PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CronLog, {partial: true}),
        },
      },
    })
    cronLog: CronLog,
    @param.where(CronLog) where?: Where<CronLog>,
  ): Promise<Count> {
    return this.cronLogRepository.updateAll(cronLog, where);
  }

  @get('/cron-logs/{id}')
  @response(200, {
    description: 'CronLog model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CronLog, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CronLog, {exclude: 'where'}) filter?: FilterExcludingWhere<CronLog>
  ): Promise<CronLog> {
    return this.cronLogRepository.findById(id, filter);
  }

  @patch('/cron-logs/{id}')
  @response(204, {
    description: 'CronLog PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CronLog, {partial: true}),
        },
      },
    })
    cronLog: CronLog,
  ): Promise<void> {
    await this.cronLogRepository.updateById(id, cronLog);
  }

  @put('/cron-logs/{id}')
  @response(204, {
    description: 'CronLog PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cronLog: CronLog,
  ): Promise<void> {
    await this.cronLogRepository.replaceById(id, cronLog);
  }

  @del('/cron-logs/{id}')
  @response(204, {
    description: 'CronLog DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cronLogRepository.deleteById(id);
  }
}

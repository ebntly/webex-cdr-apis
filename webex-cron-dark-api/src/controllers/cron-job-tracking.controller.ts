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
import {CronJob} from '../models';
import {CronJobRepository} from '../repositories';

export class CronJobTrackingController {
  constructor(
    @repository(CronJobRepository)
    public cronJobRepository : CronJobRepository,
  ) {}

  @post('/cron-jobs')
  @response(200, {
    description: 'CronJob model instance',
    content: {'application/json': {schema: getModelSchemaRef(CronJob)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CronJob, {
            title: 'NewCronJob',
            exclude: ['id'],
          }),
        },
      },
    })
    cronJob: Omit<CronJob, 'id'>,
  ): Promise<CronJob> {
    return this.cronJobRepository.create(cronJob);
  }

  @get('/cron-jobs/count')
  @response(200, {
    description: 'CronJob model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CronJob) where?: Where<CronJob>,
  ): Promise<Count> {
    return this.cronJobRepository.count(where);
  }

  @get('/cron-jobs')
  @response(200, {
    description: 'Array of CronJob model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CronJob, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CronJob) filter?: Filter<CronJob>,
  ): Promise<CronJob[]> {
    return this.cronJobRepository.find(filter);
  }

  @patch('/cron-jobs')
  @response(200, {
    description: 'CronJob PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CronJob, {partial: true}),
        },
      },
    })
    cronJob: CronJob,
    @param.where(CronJob) where?: Where<CronJob>,
  ): Promise<Count> {
    return this.cronJobRepository.updateAll(cronJob, where);
  }

  @get('/cron-jobs/{id}')
  @response(200, {
    description: 'CronJob model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CronJob, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CronJob, {exclude: 'where'}) filter?: FilterExcludingWhere<CronJob>
  ): Promise<CronJob> {
    return this.cronJobRepository.findById(id, filter);
  }

  @patch('/cron-jobs/{id}')
  @response(204, {
    description: 'CronJob PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CronJob, {partial: true}),
        },
      },
    })
    cronJob: CronJob,
  ): Promise<void> {
    await this.cronJobRepository.updateById(id, cronJob);
  }

  @put('/cron-jobs/{id}')
  @response(204, {
    description: 'CronJob PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cronJob: CronJob,
  ): Promise<void> {
    await this.cronJobRepository.replaceById(id, cronJob);
  }

  @del('/cron-jobs/{id}')
  @response(204, {
    description: 'CronJob DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cronJobRepository.deleteById(id);
  }
}

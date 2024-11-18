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
import {CdrEntry} from '../models';
import {CdrEntryRepository} from '../repositories';

export class CdrController {
  constructor(
    @repository(CdrEntryRepository)
    public cdrEntryRepository : CdrEntryRepository,
  ) {}

  @post('/cdr-entries')
  @response(200, {
    description: 'CdrEntry model instance',
    content: {'application/json': {schema: getModelSchemaRef(CdrEntry)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CdrEntry, {
            title: 'NewCdrEntry',
            exclude: ['id'],
          }),
        },
      },
    })
    cdrEntry: Omit<CdrEntry, 'id'>,
  ): Promise<CdrEntry> {
    return this.cdrEntryRepository.create(cdrEntry);
  }

  @get('/cdr-entries/count')
  @response(200, {
    description: 'CdrEntry model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CdrEntry) where?: Where<CdrEntry>,
  ): Promise<Count> {
    return this.cdrEntryRepository.count(where);
  }

  @get('/cdr-entries')
  @response(200, {
    description: 'Array of CdrEntry model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CdrEntry, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CdrEntry) filter?: Filter<CdrEntry>,
  ): Promise<CdrEntry[]> {
    return this.cdrEntryRepository.find(filter);
  }

  @patch('/cdr-entries')
  @response(200, {
    description: 'CdrEntry PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CdrEntry, {partial: true}),
        },
      },
    })
    cdrEntry: CdrEntry,
    @param.where(CdrEntry) where?: Where<CdrEntry>,
  ): Promise<Count> {
    return this.cdrEntryRepository.updateAll(cdrEntry, where);
  }

  @get('/cdr-entries/{id}')
  @response(200, {
    description: 'CdrEntry model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CdrEntry, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CdrEntry, {exclude: 'where'}) filter?: FilterExcludingWhere<CdrEntry>
  ): Promise<CdrEntry> {
    return this.cdrEntryRepository.findById(id, filter);
  }

  @patch('/cdr-entries/{id}')
  @response(204, {
    description: 'CdrEntry PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CdrEntry, {partial: true}),
        },
      },
    })
    cdrEntry: CdrEntry,
  ): Promise<void> {
    await this.cdrEntryRepository.updateById(id, cdrEntry);
  }

  @put('/cdr-entries/{id}')
  @response(204, {
    description: 'CdrEntry PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cdrEntry: CdrEntry,
  ): Promise<void> {
    await this.cdrEntryRepository.replaceById(id, cdrEntry);
  }

  @del('/cdr-entries/{id}')
  @response(204, {
    description: 'CdrEntry DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cdrEntryRepository.deleteById(id);
  }
}

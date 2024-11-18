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
import {ConvergedRecording} from '../models';
import {ConvergedRecordingRepository} from '../repositories';

export class RecordingController {
  constructor(
    @repository(ConvergedRecordingRepository)
    public convergedRecordingRepository : ConvergedRecordingRepository,
  ) {}

  @post('/recordings')
  @response(200, {
    description: 'ConvergedRecording model instance',
    content: {'application/json': {schema: getModelSchemaRef(ConvergedRecording)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConvergedRecording, {
            title: 'NewConvergedRecording',
            exclude: ['id'],
          }),
        },
      },
    })
    convergedRecording: Omit<ConvergedRecording, 'id'>,
  ): Promise<ConvergedRecording> {
    return this.convergedRecordingRepository.create(convergedRecording);
  }

  @get('/recordings/count')
  @response(200, {
    description: 'ConvergedRecording model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ConvergedRecording) where?: Where<ConvergedRecording>,
  ): Promise<Count> {
    return this.convergedRecordingRepository.count(where);
  }

  @get('/recordings')
  @response(200, {
    description: 'Array of ConvergedRecording model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ConvergedRecording, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ConvergedRecording) filter?: Filter<ConvergedRecording>,
  ): Promise<ConvergedRecording[]> {
    return this.convergedRecordingRepository.find(filter);
  }

  @patch('/recordings')
  @response(200, {
    description: 'ConvergedRecording PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConvergedRecording, {partial: true}),
        },
      },
    })
    convergedRecording: ConvergedRecording,
    @param.where(ConvergedRecording) where?: Where<ConvergedRecording>,
  ): Promise<Count> {
    return this.convergedRecordingRepository.updateAll(convergedRecording, where);
  }

  @get('/recordings/{id}')
  @response(200, {
    description: 'ConvergedRecording model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ConvergedRecording, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ConvergedRecording, {exclude: 'where'}) filter?: FilterExcludingWhere<ConvergedRecording>
  ): Promise<ConvergedRecording> {
    return this.convergedRecordingRepository.findById(id, filter);
  }

  @patch('/recordings/{id}')
  @response(204, {
    description: 'ConvergedRecording PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConvergedRecording, {partial: true}),
        },
      },
    })
    convergedRecording: ConvergedRecording,
  ): Promise<void> {
    await this.convergedRecordingRepository.updateById(id, convergedRecording);
  }

  @put('/recordings/{id}')
  @response(204, {
    description: 'ConvergedRecording PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() convergedRecording: ConvergedRecording,
  ): Promise<void> {
    await this.convergedRecordingRepository.replaceById(id, convergedRecording);
  }

  @del('/recordings/{id}')
  @response(204, {
    description: 'ConvergedRecording DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.convergedRecordingRepository.deleteById(id);
  }
}

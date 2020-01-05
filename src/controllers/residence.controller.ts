import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Residence} from '../models';
import {ResidenceRepository} from '../repositories';

export class ResidenceController {
  constructor(
    @repository(ResidenceRepository)
    public residenceRepository: ResidenceRepository,
  ) {}

  @post('/residences', {
    responses: {
      '200': {
        description: 'Residence model instance',
        content: {'application/json': {schema: getModelSchemaRef(Residence)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Residence, {
            title: 'NewResidence',
            exclude: ['id'],
          }),
        },
      },
    })
    residence: Omit<Residence, 'id'>,
  ): Promise<Residence> {
    console.log('create resident ' + residence);
    return this.residenceRepository.create(residence);
  }

  @get('/residences/count', {
    responses: {
      '200': {
        description: 'Residence model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Residence))
    where?: Where<Residence>,
  ): Promise<Count> {
    return this.residenceRepository.count(where);
  }

  @get('/residences', {
    responses: {
      '200': {
        description: 'Array of Residence model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Residence, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Residence))
    filter?: Filter<Residence>,
  ): Promise<Residence[]> {
    return this.residenceRepository.find(filter);
  }

  @patch('/residences', {
    responses: {
      '200': {
        description: 'Residence PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Residence, {partial: true}),
        },
      },
    })
    residence: Residence,
    @param.query.object('where', getWhereSchemaFor(Residence))
    where?: Where<Residence>,
  ): Promise<Count> {
    return this.residenceRepository.updateAll(residence, where);
  }

  @get('/residences/{id}', {
    responses: {
      '200': {
        description: 'Residence model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Residence, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Residence))
    filter?: Filter<Residence>,
  ): Promise<Residence> {
    return this.residenceRepository.findById(id, filter);
  }

  @patch('/residences/{id}', {
    responses: {
      '204': {
        description: 'Residence PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Residence, {partial: true}),
        },
      },
    })
    residence: Residence,
  ): Promise<void> {
    await this.residenceRepository.updateById(id, residence);
  }

  @put('/residences/{id}', {
    responses: {
      '204': {
        description: 'Residence PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() residence: Residence,
  ): Promise<void> {
    await this.residenceRepository.replaceById(id, residence);
  }

  @del('/residences/{id}', {
    responses: {
      '204': {
        description: 'Residence DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.residenceRepository.deleteById(id);
  }
}

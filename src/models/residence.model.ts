import {Entity, model, property} from '@loopback/repository';
@model()
export class Residence extends Entity {
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
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  image_url?: string;

  @property({
    type: 'string',
  })
  house_rules?: string;

  @property({
    type: 'string',
  })
  cancellation_rules?: string;

  constructor(data?: Partial<Residence>) {
    super(data);
  }
}

export interface ResidenceRelations {
  // describe navigational properties here
}

export type ResidenceWithRelations = Residence & ResidenceRelations;

import {Entity, model, property} from '@loopback/repository';

@model()
export class CronLog extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  timestamp?: Date;

  @property({
    type: 'number',
    required: true,
  })
  facility: number;

  @property({
    type: 'number',
    required: true,
  })
  severity: number;

  @property({
    type: 'string',
    required: true,
  })
  message: string;

  @property({
    type: 'object',
  })
  data?: object;

  @property({
    type: 'string',
  })
  cronJobId?: string;

  constructor(data?: Partial<CronLog>) {
    super(data);
  }
}

export interface CronLogRelations {
  // describe navigational properties here
}

export type CronLogWithRelations = CronLog & CronLogRelations;

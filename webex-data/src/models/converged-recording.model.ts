import {Entity, model, property} from '@loopback/repository';

@model()
export class ConvergedRecording extends Entity {
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
  reportId: string;

  @property({
    type: 'string',
    required: true,
  })
  topic: string;

  @property({
    type: 'date',
    required: true,
  })
  createdTime: string;

  @property({
    type: 'date',
    required: true,
  })
  recordedTime: string;

  @property({
    type: 'string',
    required: true,
  })
  format: string;

  @property({
    type: 'string',
    required: true,
  })
  serviceType: string;

  @property({
    type: 'number',
    required: true,
  })
  duration: number;

  @property({
    type: 'number',
    required: true,
  })
  bytes: number;

  @property({
    type: 'string',
    required: true,
  })
  ownerId: string;

  @property({
    type: 'string',
    required: true,
  })
  ownerType: string;

  @property({
    type: 'string',
    required: true,
  })
  storageRegion: string;

  @property({
    type: 'string',
    required: true,
  })
  locationId: string;

  @property({
    type: 'string',
    required: true,
  })
  callSessionId: string;


  constructor(data?: Partial<ConvergedRecording>) {
    super(data);
  }
}

export interface ConvergedRecordingRelations {
  // describe navigational properties here
}

export type ConvergedRecordingWithRelations = ConvergedRecording & ConvergedRecordingRelations;

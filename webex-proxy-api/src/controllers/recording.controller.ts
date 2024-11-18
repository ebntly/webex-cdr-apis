
import {inject} from "@loopback/core";
import {get, param, response} from "@loopback/rest";
import {RecordingService} from "../services";
import { type RecordingObject, RecordingObjectSchema, RecordingObjectQuerySpec, type RecordingObjectDetail, RecordingObjectDetailSchema } from "../schema";

const {
  format,
  from,
  locationId,
  max,
  ownerEmail,
  ownerId,
  ownerType,
  serviceType,
  status,
  storageRegion,
  to,
  topic
} = RecordingObjectQuerySpec
export class RecordingController {
  constructor (
    @inject( 'services.RecordingService' ) protected recSvc: RecordingService ) { }


  @get( 'recordings' )
  @response( 200, {
    description: 'Array of Recording model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          title: 'RecordingObject',
          description: 'List recordings for admin or compliance officer. You can specify a date range, and the maximum number of recordings to return. List recordings for admin or compliance officer. You can specify a date range, and the maximum number of recordings to return. The list returned is sorted in descending order by the date and time that the recordings were created.',
          items: RecordingObjectSchema.schema
        },
      },
    },
  } )
  async getRecordings (
    @param.query.string('format', format) format?: string,
    @param.query.dateTime('from', from) from?: Date,
    @param.query.string('locationId', locationId) locationId?: string,
    @param.query.number('max', max) max?: number,
    @param.query.string('ownerEmail', ownerEmail) ownerEmail?: string,
    @param.query.string('ownerId', ownerId) ownerId?: string,
    @param.query.string('ownerType', ownerType) ownerType?: string,
    @param.query.string('serviceType', serviceType) serviceType?: string,
    @param.query.string('status', status) status?: string,
    @param.query.string('storageRegion', storageRegion) storageRegion?: string,
    @param.query.dateTime('to', to) to?: Date,
    @param.query.string('topic', topic) topic?: string,
  ): Promise<RecordingObject[]> {
    const toString = to ? to.toISOString() : to;
    const fromString = from ? from.toISOString() : from;

    const recordings = await this.recSvc.getRecordings( fromString, toString, status, serviceType, format, ownerId, ownerEmail, ownerType, storageRegion, locationId, max );

    return recordings.items;
  }

  @get( 'recordings/{recordingId}' )
  @response( 200, {
    description: 'WxRecordingDetail model instance',
    content: {
      'application/json': {
        schema: RecordingObjectDetailSchema.schema
      },
    },
  } )
  async getRecording (
    @param.path.string( 'recordingId' ) recordingId: string,
  ): Promise<RecordingObjectDetail> {
    return this.recSvc.getRecording( recordingId );
  }
}

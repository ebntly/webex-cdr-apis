import { RecordingObject } from 'webex-proxy-api/dist/schema';
import { ConvergedRecording } from 'webex-data/dist/models';
import { Entity } from '@loopback/repository';

type Map = Record<keyof Omit<ConvergedRecording, keyof Entity | "id">, keyof RecordingObject>;

const REC_MAP: Map = {
  bytes: 'sizeBytes',
  callSessionId: 'serviceData',
  createdTime: 'createTime',
  duration: 'durationSeconds',
  format: 'format',
  locationId: 'serviceData',
  ownerId: 'ownerId',
  ownerType: 'ownerType',
  recordedTime: 'timeRecorded',
  reportId: 'id',
  serviceType: 'serviceType',
  storageRegion: 'storageRegion',
  topic: 'topic',  
};

export function mapRecordingEntry(entry: RecordingObject): Omit<ConvergedRecording, keyof Entity | "id"> {
  return {
    bytes: entry[REC_MAP.bytes] as number,
    callSessionId: (entry[REC_MAP.callSessionId] as any).callSessionId as string,
    createdTime: entry[REC_MAP.createdTime] as string,
    duration: entry[REC_MAP.duration] as number,
    format: entry[REC_MAP.format] as string,
    locationId: (entry[REC_MAP.locationId] as any).locationId as string,
    ownerId: entry[REC_MAP.ownerId] as string,
    ownerType: entry[REC_MAP.ownerType] as string,
    recordedTime: entry[REC_MAP.recordedTime] as string,
    reportId: entry[REC_MAP.reportId] as string,
    serviceType: entry[REC_MAP.serviceType] as string,
    storageRegion: entry[REC_MAP.storageRegion] as string,
    topic: entry[REC_MAP.topic] as string,
  };
}

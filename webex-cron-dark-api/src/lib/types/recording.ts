export interface Recording {
  reportId: string;
  topic: string;
  createdTime: string;
  recordedTime: string;
  format: string;
  serviceType: string;
  duration: number;
  bytes: number;
  ownerId: string;
  ownerType: string;
  storageRegion: string;
  locationId: string;
  callSessionId: string;
}

export type RecordingWithId = Recording & { id: string };

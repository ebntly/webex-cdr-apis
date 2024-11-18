
export type WxRecordingFormat = 'MP3';

export type WxRecordingServiceType = 'calling';

export type WxRecordingStatus = 'available' | 'deleted';

export type WxRecordingOwnerType = 'user' | 'place' | 'virtualLine';

export interface WxRecordingServiceData {
  locationId: string;
  callSessionId: string;
}

export interface WxRecording {
  id: string;
  topic: string;
  createTime: string;
  timeRecorded: string;
  format: WxRecordingFormat;
  serviceType: WxRecordingServiceType;
  durationSeconds: number;
  sizeBytes: number;
  status: WxRecordingStatus;
  ownerId: string;
  ownerType: WxRecordingOwnerType;
  storageRegion: string;
  serviceData: WxRecordingServiceData;
}

export interface WxRecordingLinks {
  audioDownloadLink: string;
  transcriptDownloadLink?: string;
  expiration: string;
}

export interface WxRecordingDetail extends WxRecording{
  temporaryDirectDownloadLinks: WxRecordingLinks;
}

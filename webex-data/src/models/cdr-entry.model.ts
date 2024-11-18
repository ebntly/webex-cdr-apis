import {Entity, model, property} from '@loopback/repository';

@model()
export class CdrEntry extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  answerIndicator?: string;

  @property({
    type: 'date',
  })
  answerTime?: string;

  @property({
    type: 'string',    
  })
  answered?: string;

  @property({
    type: 'string'
  })
  authCode?: string;

  @property({
    type: 'string',
  })
  callId?: string;

  @property({
    type: 'string',    
  })
  callOutcome?: string;

  @property({
    type: 'string',
  })
  callOutcomeReason?: string;

  @property({
    type: 'date',
  })
  callTransferTime?: string;

  @property({
    type: 'string',
  })
  callType?: string;

  @property({
    type: 'string',    
  })
  calledLineId?: string;

  @property({
    type: 'string',    
  })
  calledNumber?: string;

  @property({
    type: 'string',    
  })
  callingLineId?: string;

  @property({
    type: 'string',    
  })
  callingNumber?: string;

  @property({
    type: 'string',    
  })
  clientType?: string;

  @property({
    type: 'string',
  })
  clientVersion?: string;

  @property({
    type: 'string',    
  })
  correlationId?: string;

  @property({
    type: 'string',
  })
  departmentId?: string;

  @property({
    type: 'string',
  })
  deviceMac?: string;

  @property({
    type: 'string',    
  })
  direction?: string;

  @property({
    type: 'number',    
  })
  duration?: number;

  @property({
    type: 'string',    
  })
  finalLocalSessionId?: string;

  @property({
    type: 'string',
  })
  finalRemoteSessionId?: string;

  @property({
    type: 'string',
  })
  inboundTrunk?: string;

  @property({
    type: 'string',
  })
  intlCountry?: string;

  @property({
    type: 'string',    
  })
  localCallId?: string;

  @property({
    type: 'string',    
  })
  localSessionId?: string;

  @property({
    type: 'string',    
  })
  location?: string;

  @property({
    type: 'string',
  })
  model?: string;

  @property({
    type: 'string',
  })
  networkCallId?: string;

  @property({
    type: 'string',    
  })
  orgUuid?: string;

  @property({
    type: 'string',
  })
  originalReason?: string;

  @property({
    type: 'string',    
  })
  osType?: string;

  @property({
    type: 'string',
  })
  outboundTrunk?: string;

  @property({
    type: 'string',
  })
  pstnEntity?: string;

  @property({
    type: 'string',
  })
  pstnProviderId?: string;

  @property({
    type: 'string',
  })
  pstnProviderName?: string;

  @property({
    type: 'string',
  })
  pstnOrgId?: string;

  @property({
    type: 'string',    
  })
  redirectReason?: string;

  @property({
    type: 'string',    
  })
  redirectingNumber?: string;

  @property({
    type: 'string',
  })
  relatedCallId?: string;

  @property({
    type: 'string',
  })
  relatedReason?: string;

  @property({
    type: 'date',    
  })
  releaseTime: string;

  @property({
    type: 'string',    
  })
  releasingParty?: string;

  @property({
    type: 'string',    
  })
  remoteCallId?: string;

  @property({
    type: 'string',    
  })
  remoteSessionId?: string;

  @property({
    type: 'string',       
  })
  reportId?: string;

  @property({
    type: 'date',    
  })
  reportTime?: string;

  @property({
    type: 'number',    
  })
  ringDuration?: number;

  @property({
    type: 'string',    
  })
  siteMainNumber?: string;

  @property({
    type: 'string',    
  })
  siteUuid?: string;

  @property({
    type: 'date',    
  })
  startTime?: string;

  @property({
    type: 'string',
  })
  subClientType?: string;

  @property({
    type: 'string',
  })
  transferRelatedCallId?: string;

  @property({
    type: 'string',    
  })
  userNumber?: string;

  @property({
    type: 'string',    
  })
  userType?: string;

  @property({
    type: 'string',    
  })
  userUuid?: string;

  constructor(data?: Partial<CdrEntry>) {
    super(data);
  }
}

export interface CdrEntryRelations {
  // describe navigational properties here
}

export type CdrEntryWithRelations = CdrEntry & CdrEntryRelations;

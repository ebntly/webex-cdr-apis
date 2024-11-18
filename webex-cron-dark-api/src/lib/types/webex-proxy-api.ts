export type WxCDRAnswerIndicator = "Yes" | "No" | "Yes-PostRedirection";
export type WxCDRCallOutcome = "Success" | "Failure" | "Refusal";
export type WxCDRCallType = 
  | "SIP_MEETING"
  | "SIP_INTERNATIONAL"
  | "SIP_SHORTCODE"
  | "SIP_INBOUND"
  | "UNKNOWN"
  | "SIP_EMERGENCY"
  | "SIP_PREMIUM"
  | "SIP_ENTERPRISE"
  | "SIP_TOLLFREE"
  | "SIP_NATIONAL"
  | "SIP_MOBILE";

export type WxCDRClientType = 
  | "SIP"
  | "WXC_CLIENT"
  | "WXC_THIRD_PARTY"
  | "TEAMS_WXC_CLIENT"
  | "WXC_DEVICE"
  | "WXC_SIP_GW";

export type WxCDRDirection = "ORIGINATING" | "TERMINATING";

export type WxCDROriginalReason =
  | "Unconditional"
  | "NoAnswer"
  | "Deflection"
  | "TimeOfDay"
  | "UserBusy"
  | "FollowMe"
  | "CallQueue"
  | "HuntGroup"
  | "Unavailable"
  | "Unrecognized"
  | "Unknown"
  | `ExplicitId${number}`
  | "ImplicitId";

export type WxCDRRedirectionReason = 
  | "Unconditional"
  | "NoAnswer"
  | "Deflection"
  | "TimeOfDay"
  | "UserBusy"
  | "FollowMe"
  | "CallQueue"
  | "HuntGroup"
  | "Unavailable"
  | "Unrecognized"
  | "Unknown"
  | `ExplicitId${number}`
  | "ImplicitId";

export type WxCDRRelatedReason =
  | "ConsultativeTransfer"
  | "CallForwardSelective"
  | "CallForwardAlways"
  | "CallForwardNoAnswer"
  | "CallQueue"
  | "HuntGroup"
  | "CallPickup"
  | "CalllPark"
  | "CallParkRetrieve"
  | "Deflection"
  | "FaxDeposit"
  | "PushNotificationRetrieval"
  | "BargeIn"
  | "VoiceXMLScriptTermination"
  | "AnywhereLocation"
  | "AnywherePortal"
  | "Unrecognized"
  | "CallForwardBusy"
  | "CallForwardNotReachable"
  | "CallRetrieve"
  | "CallRecording"
  | "DirectedCallPickup"
  | "Executive"
  | "ExecutiveAssistantInitiateCall"
  | "ExecutiveAssistantDivert"
  | "ExecutiveForward"
  | "ExecutiveAssistantCallPush"
  | "Remote Office"
  | "RoutePoint"
  | "SequentialRing"
  | "SimultaneousRingPersonal"
  | "CCMonitoringBI";

export type WxCDRReleasingParty = "Local" | "Remote" | "Unknown";

export type WxCDRUserType = 
  | "AutomatedAttendantVideo"
  | "Anchor"
  | "BroadworksAnywhere"
  | "VoiceMailRetrieval"
  | "LocalGateway"
  | "HuntGroup"
  | "GroupPaging"
  | "User"
  | "VoiceMailGroup"
  | "CallCenterStandard"
  | "VoiceXML"
  | "RoutePoint"
  | "Place"
  | "VirtualLine";

export type WxCDREntry = {
  "Answer indicator": WxCDRAnswerIndicator;
  "Answer time": string;
  "Answered": string;
  "Authorization code": string;
  "Call ID": string;
  "Call outcome reason": string;
  "Call outcome": WxCDRCallOutcome;
  "Call transfer time": string;
  "Call type": WxCDRCallType;
  "Called line ID": string
  "Called number": string;
  "Calling number": string;
  "Calling line ID": string;
  "Client type": WxCDRClientType;
  "Client version": string;
  "Correlation ID": string;
  "Department ID": string;
  "Device MAC": string;
  "Dialed digits": string;
  "Direction": WxCDRDirection;
  "Duration": number;
  "External customer ID": string;
  "Final local SessionID": string;
  "Final remote SessionID": string;
  "Inbound trunk": string;
  "International country": string;
  "Local call ID": string;
  "Local SessionID": string;
  "Location": string;
  "Model": string;
  "Network call ID": string;
  "Org UUID": string;
  "Original reason": WxCDROriginalReason;
  "OS type": string;
  "Outbound trunk": string;
  "PSTN legal entity": string;
  "PSTN provider ID": string;
  "PSTN vendor name": string;
  "PSTN vendor org ID": string;
  "Redirect reason": WxCDRRedirectionReason;
  "Redirecting number": string;
  "Related call ID": string;
  "Related reason": WxCDRRelatedReason;
  "Release time": string;
  "Releasing party": WxCDRReleasingParty;
  "Remote call ID": string;
  "Remote SessionID": string;
  "Report group": string;
  "Report ID": string;
  "Report time": string;
  "Ring duration": number;
  "Site main number": string;
  "Site timezone": string;
  "Site UUID": string;
  "Start time": string;
  "Sub client type": "MOBILE_NETWORK" | "";
  "Transfer related call ID": string;
  "User ID": string;
  "User number": string;
  "User type": WxCDRUserType;
  "User UUID": string;
} 


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

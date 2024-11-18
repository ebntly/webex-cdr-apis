import 'zod-openapi/extend';
import { z } from 'zod';
import { createSchema } from 'zod-openapi';

const CdrEntry = z.object({  
  "Answer indicator": z.enum(['Yes', 'No', 'Yes-PostRedirection']).openapi({
    description: 'Whether the call leg was answered after a redirection.'
  }),
  "Answer time": z.string().datetime().openapi({
    description: 'The time the call was answered. Time is in UTC.',
  }),
  "Answered": z.string().openapi({
    description: 'Whether the call leg was answered. For example, in a hunt group case, some legs will be unanswered, and one will be answered.'
  }),
  "Authorization code": z.string().openapi({
    description: 'The authorization code admin created for a location or site for users to use. Collected by the Account/Authorization Codes or Enhanced Outgoing Calling Plan services.'
  }),
  "Call ID": z.string().openapi({
    description: 'SIP Call ID used to identify the call. You can share the Call ID with Cisco TAC to help them pinpoint a call if necessary.'
  }),
  "Call outcome reason": z.string().openapi({
    description: 'Additional information about the Call outcome returned.'
  }),
  "Call outcome": z.enum(['Success', 'Failure', 'Refusal']).openapi({
    description: 'Identifies whether the call was set up or disconnected normally.'
  }),
  "Call transfer time": z.string().datetime().openapi({
    description: 'Indicates the time at which the call transfer service was invoked during the call. The invocation time is shown using the UTC/GMT time zone format.'
  }),
  "Call type": z.string().openapi({
    description: 'Type of call.'
  }),
  "Called line ID": z.string().openapi({
    description: 'For incoming calls, the calling line ID of the user. For outgoing calls, it\'s the calling line ID of the called party.'
  }),
  "Called number": z.string().openapi({
    description: 'For incoming calls, the telephone number of the user. For outgoing calls, it\'s the telephone number of the called party.'
  }),
  "Calling line ID": z.string().openapi({
    description: 'For incoming calls, the calling line ID of the calling party. For outgoing calls, it\'s the calling line ID of the user.'
  }),
  "Calling number": z.string().openapi({
    description: 'For incoming calls, the telephone number of the calling party. For outgoing calls, it\'s the telephone number of the user.'
  }),
  "Client type": z.string().openapi({
    description: 'The type of client that the user (creating this record) is using to make or receive the call.'
  }),
  "Client version": z.string().openapi({
    description: 'The version of the client that the user (creating this record) is using to make or receive the call.'
  }),
  "Correlation ID": z.string().openapi({
    description: 'Correlation ID to tie together multiple call legs of the same call session.'
  }),
  "Department ID": z.string().openapi({
    description: 'A unique identifier for the user\'s department name.'
  }),
  "Device MAC": z.string().openapi({
    description: 'The MAC address of the device, if known.'
  }),
  "Dialed digits": z.string().openapi({
    description: 'The keypad digits as dialed by the user, before pre-translations.'
  }),
  "Direction": z.enum(['ORIGINATING', 'TERMINATING']).openapi({
    description: 'Whether the call was inbound or outbound.'
  }),
  "Duration": z.number({coerce: true}).openapi({
    description: 'The length of the call in seconds.'
  }),
  "Final local SessionID": z.string().openapi({
    description: 'Each call consists of four UUIDs known as Local Session ID, Final Local Session ID, Remote Session ID and Final Remote Session ID. The Final Local Session ID has the value of the Local Session ID at the end of the call.'
  }),
  "Final remote SessionID": z.string().openapi({
    description: 'Each call consists of four UUIDs known as Local Session ID, Final Local Session ID, Remote Session ID and Final Remote Session ID. The Final Remote Session ID has the value of the Remote Session ID at the end of the call.'
  }),
  "Inbound trunk": z.string().openapi({
    description: 'Inbound trunk may be presented in Originating and Terminating records.'
  }),
  "International country": z.string().openapi({
    description: 'The country code of the dialed number. This is only populated for international calls.'
  }),
  "Local call ID": z.string().openapi({
    description: 'A unique identifier that is used to correlate CDRs and call legs with each other.'
  }),
  "Local SessionID": z.string().openapi({
    description: 'Each call consists of four UUIDs known as Local Session ID, Final Local Session ID, Remote Session ID and Final Remote Session ID. The Local SessionID is generated from the Originating user agent.'
  }),
  "Location": z.string().openapi({
    description: 'Location of the report.'
  }),
  "Model": z.string().openapi({
    description: 'The device model type the user is using to make or receive the call.'
  }),
  "Network call ID": z.string().openapi({
    description: 'A unique identifier that shows if other CDRs are in the same call leg. Two CDRs belong in the same call leg if they have the same Network call ID.'
  }),
  "Org UUID": z.string().openapi({
    description: 'A unique identifier for the organization that made the call. This is a unique identifier across Cisco.'
  }),
  "Original reason": z.enum([
    'Unconditional',
    'NoAnswer', 
    'Deflection',
    'TimeOfDay',
    'UserBusy',
    'FollowMe',
    'CallQueue',
    'HuntGroup',
    'Unavailable',
    'Unrecognized',
    'Unknown',
    'ImplicitId'
  ]).or(z.string().regex(/ExplicitId[\d+]/)).openapi({
    description: 'Call redirection reason for the original called number. '
  }),
  "OS type": z.string().openapi({
    description: 'The operating system that the app was running on, if available.'
  }),
  "Outbound trunk": z.string().openapi({
    description: "Outbound trunk may be presented in Originating and Terminating records."
  }),
  "PSTN legal entity": z.string().openapi({
    description: 'This field shows the regulated business entity registered to provide PSTN service in a particular country.'
  }),
  "PSTN provider ID": z.string().openapi({
    description: 'This field represents an immutable UUID, as defined by Cisco, for a PSTN provider partner. It uniquely identifies the entity that has provided PSTN service in that country.'
  }),
  "PSTN vendor name": z.string().openapi({
    description: 'Displays the name of the vendor from which one has purchased PSTN service for a specific country. '
  }),
  "PSTN vendor org ID": z.string().openapi({
    description: 'This field displays the organization\'s Universal Unique Identifier (UUID) for Cisco Calling Plans, which is unique across various regions.'
  }),
  "Redirect reason": z.enum([
    'Unconditional',
    'NoAnswer', 
    'Deflection',
    'TimeOfDay',
    'UserBusy',
    'FollowMe',
    'CallQueue',
    'HuntGroup',
    'Unavailable',
    'Unrecognized',
    'Unknown',
    'ImplicitId'
  ]).or(z.string().regex(/ExplicitId[\d+]/)).openapi({
    description: 'Call redirection reason for the redirecting number. '
  }),
  "Redirecting number": z.string().openapi({
    description: 'When the call has been redirected one or more times, this field reports the last redirecting number. Identifies who last redirected the call.'
  }),
  "Related call ID": z.string().openapi({
    description: 'Call identifier of a different call that was created by this call because of a service activation. The value is the same as the Local call ID field of the related call. You can use this field to correlate multiple call legs connected through other services.'
  }),
  "Related reason": z.enum([
    'ConsultativeTransfer',
    'CallForwardSelective',
    'CallForwardAlways',
    'CallForwardNoAnswer',
    'CallQueue',
    'HuntGroup',
    'CallPickup',
    'CalllPark',
    'CallParkRetrieve',
    'Deflection',
    'FaxDeposit',
    'PushNotificationRetrieval',
    'BargeIn',
    'VoiceXMLScriptTermination',
    'AnywhereLocation',
    'AnywherePortal',
    'Unrecognized',
    'CallForwardBusy',
    'CallForwardNotReachable',
    'CallRetrieve',
    'CallRecording',
    'DirectedCallPickup',
    'Executive',
    'ExecutiveAssistantInitiateCall',
    'ExecutiveAssistantDivert',
    'ExecutiveForward',
    'ExecutiveAssistantCallPush',
    'Remote Office',
    'RoutePoint',
    'SequentialRing',
    'SimultaneousRingPersonal',
    'CCMonitoringBI'
  ]).openapi({
    description: 'Indicates a trigger that led to a change in the call presence. The trigger could be for this particular call or redirected via a different call.'
  }),
  "Release time": z.string().datetime().openapi({
    description: 'The time the call was finished, in UTC.'
  }),
  "Releasing party": z.enum(['Local', 'Remote', "Unknown"]).openapi({
    description: 'Indicates which party released the call first.'
  }),
  "Remote call ID": z.string().openapi({
    description: 'A unique identifier that is used to correlate CDRs and call legs with each other. This ID is used in conjunction with Local call ID to identity the local CDR of a call leg.'
  }),
  "Remote SessionID": z.string().openapi({
    description: 'Each call consists of four UUIDs known as Local Session ID, Final Local Session ID, Remote Session ID and Final Remote Session ID. The Remote SessionID is generated from the Terminating user agent.'
  }),
  "Report ID": z.string().openapi({
    description: 'A unique ID for this particular record. This can be used when processing records to aid in deduplication.'
  }),
  "Report time": z.string().datetime().openapi({
    description: 'The time this report was created. Time is in UTC.'
  }),
  "Ring duration": z.number({coerce: true}).openapi({
    description: 'The length of ringing before the call was answered or timed out, in seconds.'
  }),
  "Route group": z.string().openapi({
    description: 'If present, this field\'s only reported in Originating records. Route group identifies the route group used for outbound calls routed via a route group to Premises-based PSTN or an on-prem deployment integrated with Webex Calling (dial plan or unknown extension).'
  }),
  "Site main number": z.string().openapi({
    description: 'The main number for the user\'s site where the call was made or received.'
  }),
  "Site timezone": z.string().openapi({
    description: 'Site timezone is the offset in minutes from UTC time of the user\'s timezone.'
  }),
  "Site UUID": z.string().openapi({
    description: 'A unique identifier for the site associated with the call.'
  }),
  "Start time": z.string().datetime().openapi(({
    description: 'This is the start time of the call, the answer time may be slightly after this. Time is in UTC.'
  })),
  "Sub client type": z.string().openapi({
    description: 'If the call is TO or FROM a mobile phone using Webex Go, the Client type will show SIP, and Sub client type will show MOBILE_NETWORK.'
  }),
  "Transfer related call ID": z.string().openapi({
    description: 'Call identifier of a different call that was involved in the transfer. You can share this ID with Cisco TAC to help them pinpoint parties who were involved in the call transfer.'
  }),
  "User number": z.string().openapi({
    description: 'Represents the E.164 number of the user generating a CDR. If the user has no number assigned to them, then their extension will be displayed instead.'
  }),
  "User type": z.enum([
    'AutomatedAttendantVideo',
    'Anchor',
    'BroadworksAnywhere',
    'VoiceMailRetrieval',
    'LocalGateway',
    'HuntGroup',
    'GroupPaging',
    'User',
    'VoiceMailGroup',
    'CallCenterStandard',
    'VoiceXML',
    'RoutePoint',
    'Place',
    'VirtualLine',
  ]).openapi({
    description: 'The type of user (user or workspace) that made or received the call.'
  }),
  "User UUID": z.string().openapi({
    description: 'A unique identifier for the user associated with the call.'
  }),
  "User": z.string().openapi({
    description: 'The user who made or received the call.'
  }),
}).openapi({
  description: 'Provides Webex Calling Detailed Call History data for your organization.Results can be filtered with the startTime, endTime and locations request parameters. The startTime and endTime parameters specify the start and end of the time period for the Detailed Call History reports you wish to collect. The API will return all reports that were created between startTime and endTime.'
});

export const CdrEntrySchema = createSchema(CdrEntry);
export type CdrEntry = z.infer<typeof CdrEntry>;

export const CdrQuerySpec = {
  startTime: z.string().datetime().openapi({
    description: 'Time of the first report you wish to collect. (Report time is the time the call finished). Note: The specified time must be between 5 minutes ago and 48 hours ago, and be formatted as YYYY-MM-DDTHH:MM:SS.mmmZ.'
  }),
  endTime: z.string().datetime().openapi({
    description: 'Time of the last report you wish to collect. (Report time is the time the call finished). Note: The specified time should be later than startTime but no later than 48 hours, and be formatted as YYYY-MM-DDTHH:MM:SS.mmmZ.'
  }),
  locations: z.string().openapi({
    description: 'Name of the location (as shown in Control Hub). Up to 10 comma-separated locations can be provided. Allows you to query reports by location.'
  }),
  max: z.number({coerce: true}).openapi({
    description: 'Limit the maximum number of reports per page of the response. The range is 1 to 500. When the API has more reports to return than the max value, the API response will be paginated. Follow the next link contained in the “Link” header within a response to request the next page of results. If there is no next link, all reports for the selected time range have been collected. API requests for the next pages can be requested immediately and do not count towards API rate limiting.'
  })
} as const;

export type CdrQuerySpecType = {
  [K in keyof typeof CdrQuerySpec]?: z.infer<typeof CdrQuerySpec[K]>;
};

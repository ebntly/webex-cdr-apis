import 'zod-openapi/extend';
import { z } from 'zod';
import { createSchema } from 'zod-openapi';

export const RecordingObject = z.object({
  id: z.string().openapi({
    description: 'A unique identifier for the recording.'
  }),
  topic: z.string().openapi({
    description: 'The recording\'s topic.'
  }),
  createTime: z.string().datetime().openapi({
    description: 'The date and time recording was created in ISO 8601 compliant format.'
  }),
  timeRecorded: z.string().datetime().openapi({
    description: 'The date and time recording started in ISO 8601 compliant format.'
  }),
  format: z.enum(['MP3']).openapi({
    description: 'Recording file format is MP3.'
  }),
  serviceType: z.enum(['calling']).openapi({
    description: 'Recording service type is Webex Call.'
  }),
  durationSeconds: z.number({coerce: true}).openapi({
    description: 'The duration of the recording, in seconds.'
  }),
  sizeBytes: z.number({coerce: true}).openapi({
    description: 'The size of the recording file, in bytes.'
  }),
  status: z.enum(['available', 'deleted']).openapi({
    description: 'Whether the recording is available or has been moved to the recycling bin.'
  }),
  ownerId: z.string().openapi({
    description: 'Webex UUID for recording owner/host.'
  }),
  ownerEmail: z.string().openapi({
    description: 'Webex email for recording owner/host.'
  }),
  ownerType: z.enum(['user', 'place', 'virtualLine']).openapi({
    description: 'The type of owner.'
  }),
  storageRegion: z.string().openapi({
    description: 'Storage location for recording within Webex datacenters.'
  }),
  serviceData: z.object({
    locationId: z.string().openapi({
      description: 'Webex calling location for recording user.'
    }),
    callSessionId: z.string().openapi({
      description: 'Call ID for which recording was done.'
    })
  }).openapi({
    description: 'Fields relevant to each service Type.'
  })
});

const RecordingObjectDetail = RecordingObject.extend({
  temporaryDirectDownloadLinks: z.object({
    audioDownloadLink: z.string().url().openapi({
      description: 'The download link for recording audio file without HTML page rendering in browser or HTTP redirect. Expires 3 hours after the API request.'
    }),
    transcriptDownloadLink: z.string().url().openapi({
      description: 'The download link for recording transcript file without HTML page rendering in browser or HTTP redirect. Expires 3 hours after the API request.'
    }),
    expiration: z.string().datetime().openapi({
      description: 'The date and time when recordingDownloadLink, audioDownloadLink, and transcriptDownloadLink expire in ISO 8601 compliant format.'
    })
  })
});

export const RecordingObjectSchema = createSchema(RecordingObject);
export type RecordingObject = z.infer<typeof RecordingObject>;

export const RecordingObjectDetailSchema = createSchema(RecordingObjectDetail);

export type RecordingObjectDetail = z.infer<typeof RecordingObjectDetail>;

export const RecordingObjectDetailSpec = {
  recordingId: z.string().openapi({
    description: 'A unique identifier for the recording.'
  })
};

export type RecordingObjectDetailSpec = {
  [K in keyof typeof RecordingObjectDetailSpec]: z.infer<typeof RecordingObjectDetailSpec[K]>;
};

export const RecordingObjectQuerySpec = {
  max: z.number({coerce: true}).openapi({
    description: 'Maximum number of recordings to return in a single page. max must be equal to or greater than 1 and equal to or less than 100.',
    minimum: 1,
    maximum: 100,
    default: 10,
  }),
  from: z.string().datetime().openapi({
    description: 'Starting date and time (inclusive) for recordings to return, in any ISO 8601 compliant format. from cannot be after to. The interval between from and to must be within 30 days. If only `to` is specified, the default `from` value is 7 days before `to`; if no `to` or `from` is specified, the default `from` value is 7 days before the current date and time.'
  }),
  to: z.string().datetime().openapi({
    description: 'Ending date and time (exclusive) for List recordings to return, in any ISO 8601 compliant format. to cannot be before from. The interval between from and to must be within 30 days. If `from` is specified, the default value is 7 days after `from`; if `from` is not specified, the default value is the current date and time.'
  }),
  status: z.enum(['available', 'deleted']).openapi({
    description: 'Recording\'s status. If not specified or available, retrieves recordings that are available. Otherwise, if specified as deleted, retrieves recordings that have been moved into the recycle bin.',
    default: 'available'
  }),
  serviceType: z.string().openapi({
    description: 'Recording\'s service-type. If this item is specified, the API filters recordings by service-type. Valid values are calling.'
  }),
  format: z.enum(['MP3']).openapi({
    description: 'Recording\'s file format. If specified, the API filters recordings by format. Valid values are MP3.'
  }),
  ownerId: z.string().openapi({
    description: 'Webex user Id to fetch recordings for a particular user.'
  }),
  ownerEmail: z.string().openapi({
    description: 'Webex email address to fetch recordings for a particular user.'
  }),
  ownerType: z.enum(['user', 'place', 'virtualLine']).openapi({
    description: 'Recording based on type of user.'
  }),
  storageRegion: z.string().openapi({
    description: 'Recording stored in certain Webex locations.'
  }),
  locationId: z.string().openapi({
    description: 'Fetch recordings for users in a particular Webex Calling location (as configured in Control Hub).'
  }),
  topic: z.string().openapi({
    description: 'Recording\'s topic. If specified, the API filters recordings by topic in a case-insensitive manner.'
  })
};

export type RecordingObjectQuerySpecType = {
  [K in keyof typeof RecordingObjectQuerySpec]?: z.infer<typeof RecordingObjectQuerySpec[K]>;
};
import 'zod-openapi/extend';
import { z } from 'zod';
import { createSchema } from 'zod-openapi';

const Address = z.object({
  address1: z.string().openapi({
    description: 'Address 1'
  }),
  address2: z.string().openapi({
    description: 'Address 2'
  }),
  city: z.string().openapi({
    description: 'City'
  }),
  state: z.string().openapi({
    description: 'State code'
  }),
  postalCode: z.string().openapi({
    description: 'ZIP/Postal Code'
  }),
  country: z.string().openapi({
    description: 'ISO-3166 2-Letter Country Code.'
  })
}).openapi({
  ref: 'address'
});

const Location = z.object({
  id: z.string().openapi({
    description: 'A unique identifier for the location.', 
  }),
  name: z.string().openapi({
    description: 'The name of the location.'
  }),
  orgId: z.string().openapi({
    description: 'The ID of the organization to which this location belongs.'
  }),
  timeZone: z.string().openapi({
    description: 'Time zone associated with this location.'
  }),
  address: Address.openapi({
    description: 'The address of the location.'
  }),
  latitude: z.string().openapi({
    description: 'Latitude'
  }),
  longitude: z.string().openapi({
    description: 'Longitude'
  }),
  notes: z.string().openapi({
    description: 'Notes'
  }),
}).openapi({
  title: 'Location',
  description: 'A location in the organization'
});

export const LocationSchema = createSchema(Location);
export type Location = z.infer<typeof Location>;

export const LocationQuerySpec = {
  name: z.string().openapi({
    description: 'List locations whose name contains this string (case-insensitive).'
  }),
  id: z.string().openapi({
    description: 'List locations by ID.'
  }),
  orgId: z.string().openapi({
    description: 'List locations in this organization.'
  }),
  max: z.number().openapi({
    description: 'Limit the maximum number of location in the response.'
  }),
};

export type LocationQuerySpecType = {
  [K in keyof typeof LocationQuerySpec]?: z.infer<typeof LocationQuerySpec[K]>;
};
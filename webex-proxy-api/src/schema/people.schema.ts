import 'zod-openapi/extend';
import { z } from 'zod';
import { createSchema } from 'zod-openapi';

const PhoneNumberType = z.enum(['work', 'work_extension', 'mobile', 'fax']).openapi({
  description: 'The type of phone number',
});

const PhoneNumber = z.object({
  type: PhoneNumberType,
  value: z.string().openapi({
    description: 'The phone number.',
  }),
  primary: z.boolean().openapi({
    description: 'Primary number for the person.',
  }),
});

const Address = z.object({
  type: z.string().openapi({
    description: 'The type of address.',
  }),
  country: z.string().openapi({
    description: 'The user\'s country.',
  }),
  region: z.string().openapi({
    description: 'The user\'s region, often state.',
  }),
  streetAddress: z.string().openapi({
    description: 'The user\'s street.',
  }),
  postalCode: z.string().openapi({
    description: 'The user\'s postal or zip code.',
  })
});

const SipAddress = z.object({
  type: z.enum(['personal-room', 'enterprise', 'cloud-calling']).openapi({
    description: 'The type of SIP address.',
  }),
  value: z.string().openapi({
    description: 'The SIP address.',
  }),
  primary: z.boolean().openapi({
    description: 'Primary SIP address for the person.',
  }),
});

const Person = z.object({
  id: z.string().openapi({
    description: 'A unique identifier for the person.',
  }),
  emails: z.array(z.string().email()).openapi({
    description: 'The email addresses of the person.',
  }),
  phoneNumbers: z.array(PhoneNumber).openapi({
    description: 'Phone numbers for the person.',
  }),
  extension: z.string().openapi({
    description: 'The Webex Calling extension for the person. Only applies to a person with a Webex Calling license.',
  }),
  locationId: z.string().openapi({
    description: 'The ID of the location for this person retrieved from BroadCloud.',
  }),
  displayName: z.string().openapi({
    description: 'The full name of the person.',
  }),
  nickName: z.string().openapi({
    description: 'The nickname of the person if configured. If no nickname is configured for the person, this field will not be present.',
  }),
  firstName: z.string().openapi({
    description: 'The first name of the person.',
  }),
  lastName: z.string().openapi({
    description: 'The last name of the person.',
  }),
  avatar: z.string().url().openapi({
    description: 'The URL to the person\'s avatar in PNG format.',
  }),
  ordId: z.string().openapi({
    description: 'The ID of the organization to which this person belongs.',
  }),
  roles: z.array(z.string()).openapi({
    description: 'An array of role strings representing the roles to which this admin user belongs.',
  }),
  licenses: z.array(z.string()).openapi({
    description: 'An array of license strings allocated to this person.',
  }),
  department: z.string().openapi({
    description: 'The business department the user belongs to.',
  }),
  manager: z.string().openapi({
    description: 'A manager identifier.',
  }),
  managerId: z.string().openapi({
    description: 'Person ID of the manager.',
  }),
  title: z.string().openapi({
    description: 'The person\'s title.',
  }),
  addresses: z.array(Address).openapi({
    description: 'A person\'s addresses.',

  }),
  created: z.string().datetime().openapi({
    description: 'The date and time the person was created.',
  }),
  lastModified: z.string().datetime().openapi({
    description: 'The date and time the person was last changed.',
  }),
  lastActivity: z.string().datetime().openapi({
    description: 'The date and time of the person\'s last activity within Webex. This will only be returned for people within your organization or an organization you manage.',
  }),
  siteUrls: z.array(z.string().url()).openapi({
    description: 'One or several site names where this user has a role (host or attendee).',
  }),
  sipAddresses: z.array(SipAddress).openapi({
    description: 'The user\'s SIP addresses. Read-only.',
  }),
  xmppFederationJid: z.string().openapi({
    description: 'Identifier for intra-domain federation with other XMPP based messenger systems.'
  }),
  status: z.enum([
    'active',
    'call',
    'DoNotDisturb',
    'inactive',
    'meeting',
    'OutOfOffice',
    'pending',
    'presenting',
    'unknown'
  ]).openapi({
    description: 'The current presence status of the person. This will only be returned for people within your organization or an organization you manage.',
  }),
  invitePending: z.boolean().openapi({
    description: 'Whether or not an invite is pending for the user to complete account activation. This property is only returned if the authenticated user is an admin user for the person\'s organization.',
  }),
  loginEnabled: z.boolean().openapi({
    description: 'Whether or not the user is allowed to use Webex. This property is only returned if the authenticated user is an admin user for the person\'s organization.',
  }),
  type: z.enum(['person', 'bot', 'appuser']).openapi({
    description: 'The type of person account, such as person or bot.',
  }),
  userName: z.string().openapi({
    description: 'Undocumented username'
  })
}).openapi({
  title: 'Person',
  description: 'A person in your organization.',
});

export const PersonSchema = createSchema(Person);
export type Person = z.infer<typeof Person>;

export const PersonQuerySpec = {
  email: z.string().email().openapi({
    description: 'List people with this email address.',
  }),
  displayName: z.string().openapi({
    description: 'List people whose name starts with this string.',
  }),
  id: z.string().openapi({
    description: 'List people by ID. Accepts up to 85 person IDs separated by commas.',
  }),
  orgId: z.string().openapi({
    description: 'List people in this organization.',
  }),
  roles: z.string().openapi({
    description: 'List of roleIds separated by commas.',
  }),
  callingData: z.boolean().openapi({
    description: 'Include Webex Calling user details in the response.',
  }),
  locationId: z.string().openapi({
    description: 'List people present in this location.',
  }),
  max: z.number().openapi({
    description: 'Limit the maximum number of people in the response. If callingData=true, then max will not be more than 100. If locationId is specified then max will not be more than 50.',
  })
} as const;

export type PersonQuerySpecType = {
  [K in keyof typeof PersonQuerySpec]?: z.infer<typeof PersonQuerySpec[K]>;
};
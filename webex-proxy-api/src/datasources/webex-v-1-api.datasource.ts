import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const webexAccessToken = process.env.WEBEX_CLIENT_ACCESS_TOKEN;

const config = {
  name: "WebexV1Api",
  connector: "rest",
  baseURL: "https://webexapis.com/v1",
  crud: false,
  options: {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${webexAccessToken}`
    }
  },
  operations: [
    {
      template: {
        method: "GET",
        url: "https://webexapis.com/v1/adminAudit/events?orgId={!orgId}&from={!from}&to={!to}&actorId={actorId}&actorOrgId={actorOrgId}&targetId={targetId}&categories={categories}",
        query: {
          orgId: "{orgId}",
          from: "{from}",
          to: "{to}",
          actorId: "{actorId}",
          actorOrgId: "{actorOrgId}",
          targetId: "{targetId}",
          categories: "{categories}"
        },
        responsePath: "$.items"
      },
      functions: {
        getEvents: ["orgId", "from", "to", "actorId", "actorOrgId", "targetId", "categories"]
      }
    },
    {
      template: {
        method: "GET",
        url: "https://webexapis.com/v1/admin/convergedRecordings",
        query: {
          from: "{from}",
          to: "{to}",
          status: "{status}",
          serviceType: "{serviceType}",
          format: "{format}",
          ownerId: "{ownerId}",
          ownerEmail: "{ownerEmail}",
          ownerType: "{ownerType}",
          storageRegion: "{storageRegion}",
          locationId: "{locationId}",
          max: "{max}"
        }
      },
      functions: {
        getRecordings: ['from', 'to', 'status', 'serviceType', 'format', 'ownerId', 'ownerEmail', 'ownerType', 'storageRegion', 'locationId', 'max']
      }
    },
    {
      template: {
        method: "GET",
        url: "https://webexapis.com/v1/convergedRecordings/{!recordingId}",
        responsePath: "$",
      },
      functions: {
        getRecording: ['recordingId']
      }
    },
    {
      template: {
        method: "GET",
        url: "https://webexapis.com/v1/people",
        query: {
          email: '{email}',
          displayName: '{displayName}',
          id: '{id}',
          orgId: '{orgId}',
          roles: '{roles}',
          callingData: '{callingData}',
          locationId: '{locationId}',
          max: '{max}',
        }
      },
      functions: {
        getPeople: [ 'email', 'displayName', 'id', 'orgId', 'roles', 'callingData', 'locationId', 'max']
      }
    },
    {
      template: {
        method: "GET",
        url: "https://webexapis.com/v1/people/{!personId}",
        query: {
          callingData: '{callingData}'
        }
      },
      functions: {
        getPerson: ['personId', 'callingData']
      }
    },
    {
      template: {
        method: "GET",
        url: "https://webexapis.com/v1/locations",
        query: {
          name: '{name}',
          id: '{id}',
          orgId: '{orgId}',
          max: '{max}',
        }
      },
      functions: {
        getLocations: [ 'id', 'max', 'name', 'orgId']
      }
    },
    {
      template: {
        method: "GET",
        url: "https://webexapis.com/v1/locations/{!locationId}",
      },
      functions: {
        getLocation: ['locationId']
      }
    },
  ]
}

@lifeCycleObserver('datasource')
export class WebexV1ApiDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'WebexV1Api';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.WebexV1Api', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

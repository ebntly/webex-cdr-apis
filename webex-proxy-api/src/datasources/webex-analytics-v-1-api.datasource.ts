import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const webexAccessToken = process.env.WEBEX_CLIENT_ACCESS_TOKEN;

const config = {
  name: "WebexAnalyticsV1Api",
  connector: "rest",
  baseURL: "https://analytics.webexapis.com/v1",
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
        url: "https://analytics.webexapis.com/v1/cdr_feed",
        query: {
          startTime: "{!startTime}",
          endTime: "{!endTime}",
          locations: "{locations}",
          max: "{max}"
        }
      },
      functions: {
        getCdrEntries: ["startTime", "endTime", "locations", "max"]
      }
    }
  ]
}

@lifeCycleObserver('datasource')
export class WebexAnalyticsV1ApiDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'WebexAnalyticsV1Api';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.WebexAnalyticsV1Api', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

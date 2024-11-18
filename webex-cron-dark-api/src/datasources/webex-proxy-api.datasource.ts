import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const {
  WEBEX_PROXY_API_HOST: HOST,
  WEBEX_PROXY_API_PORT: PORT
} = process.env;

const config = {
  name: 'WebexProxyApi',
  connector: 'openapi',
  spec: `http://${HOST}:${PORT}/openapi.json`,
  validate: false,
  positional: false
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class WebexProxyApiDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'WebexProxyApi';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.WebexProxyApi', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

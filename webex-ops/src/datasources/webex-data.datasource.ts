import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const {
  WEBEX_DATA_API_HOST: HOST,
  WEBEX_DATA_API_PORT: PORT,
} = process.env;

const config = {
  name: 'WebexData',
  connector: 'openapi',
  spec: `http://${HOST}:${PORT}/openapi.json`,
  validate: true,
  positional: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class WebexDataDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'WebexData';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.WebexData', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

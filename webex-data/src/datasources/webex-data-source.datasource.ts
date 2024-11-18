import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'WebexDataSource',
  connector: 'mongodb',
  url: '',
  host: 'rr-radius',
  port: 0,
  user: '',
  password: '',
  database: 'webex-data',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class WebexDataSourceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'WebexDataSource';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.WebexDataSource', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

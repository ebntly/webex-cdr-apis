import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'CronJob',
  connector: 'mongodb',
  url: '',
  host: 'rr-radius',
  port: 0,
  user: '',
  password: '',
  database: 'webex-cron',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CronJobDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'CronJob';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.CronJob', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

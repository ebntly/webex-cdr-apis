import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import 'dotenv/config';

const {
  CRON_API_HOST: HOST,
  CRON_API_PORT: PORT,
} = process.env;

const config = {
  name: 'CronDataApi',
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
export class CronDataApiDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'CronDataApi';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.CronDataApi', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

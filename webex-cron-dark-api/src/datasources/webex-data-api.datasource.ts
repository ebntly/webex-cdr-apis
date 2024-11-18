import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const {
  CDR_DATA_HOST: HOST,
  CDR_DATA_PORT: PORT
} = process.env;

const config = {
  name: 'WebexDataApi',
  connector: 'openapi',
  spec: `http://${HOST}:${PORT}/openapi.json`,
  validate: false,
  positional: true
};

@lifeCycleObserver('datasource')
export class WebexDataApiDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'WebexDataApi';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.WebexDataApi', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

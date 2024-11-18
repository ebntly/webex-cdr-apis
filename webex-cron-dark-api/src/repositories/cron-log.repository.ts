import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CronJobDataSource} from '../datasources';
import {CronLog, CronLogRelations} from '../models';

export class CronLogRepository extends DefaultCrudRepository<
  CronLog,
  typeof CronLog.prototype.id,
  CronLogRelations
> {
  constructor(
    @inject('datasources.CronJob') dataSource: CronJobDataSource,
  ) {
    super(CronLog, dataSource);
  }
}

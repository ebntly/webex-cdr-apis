import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CronJobDataSource} from '../datasources';
import {CronJob, CronJobRelations, CronLog} from '../models';
import {CronLogRepository} from './cron-log.repository';

export class CronJobRepository extends DefaultCrudRepository<
  CronJob,
  typeof CronJob.prototype.id,
  CronJobRelations
> {

  public readonly cronLogs: HasManyRepositoryFactory<CronLog, typeof CronJob.prototype.id>;

  constructor(
    @inject('datasources.CronJob') dataSource: CronJobDataSource, @repository.getter('CronLogRepository') protected cronLogRepositoryGetter: Getter<CronLogRepository>,
  ) {
    super(CronJob, dataSource);
    this.cronLogs = this.createHasManyRepositoryFactoryFor('cronLogs', cronLogRepositoryGetter,);
    this.registerInclusionResolver('cronLogs', this.cronLogs.inclusionResolver);
  }
}

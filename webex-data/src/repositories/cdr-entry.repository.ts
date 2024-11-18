import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {WebexDataSourceDataSource} from '../datasources';
import {CdrEntry, CdrEntryRelations} from '../models';

export class CdrEntryRepository extends DefaultCrudRepository<
  CdrEntry,
  typeof CdrEntry.prototype.id,
  CdrEntryRelations
> {
  constructor(
    @inject('datasources.WebexDataSource') dataSource: WebexDataSourceDataSource,
  ) {
    super(CdrEntry, dataSource);
  }
}

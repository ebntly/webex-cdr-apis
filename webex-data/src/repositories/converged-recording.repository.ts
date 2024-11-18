import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {WebexDataSourceDataSource} from '../datasources';
import {ConvergedRecording, ConvergedRecordingRelations} from '../models';

export class ConvergedRecordingRepository extends DefaultCrudRepository<
  ConvergedRecording,
  typeof ConvergedRecording.prototype.id,
  ConvergedRecordingRelations
> {
  constructor(
    @inject('datasources.WebexDataSource') dataSource: WebexDataSourceDataSource,
  ) {
    super(ConvergedRecording, dataSource);
  }
}

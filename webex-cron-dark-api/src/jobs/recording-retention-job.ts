import { inject, createBindingFromClass, service } from '@loopback/core';
import { cronJob, CronJob } from '@loopback/cron';
import { CronJobRepository, CronLogRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { WebexProxyApiService, WebexDataApiService } from '../services';
import { mapRecordingEntry } from '../lib';

@cronJob()
export class RecordingRetentionJob extends CronJob {
  constructor(
    @inject('services.WebexProxyApiService') protected proxySvc: WebexProxyApiService,
    @inject('services.WebexDataApiService') protected dataSvc: WebexDataApiService,
    @repository('CronJobRepository') protected cronJobRepo: CronJobRepository,
    @repository('CronLogRepository') protected cronLogRepo: CronLogRepository,
  ) {
    super({
      name: 'recording-retention-job',
      cronTime: '*/5 * * * *',
      onTick: async () => {
        await this.tick();
      },
      start: true,
    });
  }

  async tick() {
    const now = new Date();

    let recJob = await this.cronJobRepo.findOne({where: {name: this.name}});

    const endTime = new Date(+now - (6 * 60 * 1000));
    const startTime = new Date(+endTime - (5 * 60 * 1000));

    if (!recJob) {
      recJob = await this.cronJobRepo.create({name: this.name, lastSuccess: startTime.toISOString(), lastRun: startTime.toISOString()});
    }

    const from = new Date(recJob.lastSuccess || recJob.lastRun).toISOString();
    const to = endTime.toISOString();

    try {
      const wxRecordingResp = await this.proxySvc.recordingControllerGetRecordings({from, to, max: 100});
      const wxRecordings = wxRecordingResp.body;

      await this.cronLogRepo.create({
        cronJobId: recJob.id,
        facility: 9,
        severity: 6,
        message: `Fetched Recordings`,
        data: {
          count: wxRecordings.length,
          from,
          to,
        }
      });

      let failures = 0;

      for (const recording of wxRecordings) {
        const mapped = mapRecordingEntry(recording);
        
        try {
          await this.dataSvc.recordingControllerCreate(mapped);
        } catch (e) {

          failures++;

          await this.cronLogRepo.create({
            cronJobId: recJob.id,
            facility: 9,
            severity: 3,
            message: `Error creating CDR entry: ${e.message}`,
            data: {
              error: e.response?.data,
            }
          });
        }
      }
      
      await this.cronLogRepo.create({
        cronJobId: recJob.id,
        facility: 9,
        severity: 6,
        message: `Created ${wxRecordings.length - failures} recordings`,
        data: {
          failures,
        }
      });

      if (failures !== wxRecordings.length) {
        await this.cronJobRepo.updateById(recJob.id, {lastSuccess: endTime.toISOString()});
      }
    } catch (e) {
      if(e.response?.status === 404) {
        await this.cronLogRepo.create({
          cronJobId: recJob.id,
          facility: 9,
          severity: 6,
          message: `No recordings found`,
          data: {
            from,
            to,
          }
        });

        await this.cronJobRepo.updateById(recJob.id, {lastSuccess: endTime.toISOString()});

        return;
      }
      await this.cronLogRepo.create({
        cronJobId: recJob.id,
        facility: 9,
        severity: 3,
        message: `Error fetching recordings: ${e.message}`,
        data: {
          error: e.response?.data,
        }
      });
    }

    await this.cronJobRepo.updateById(recJob.id, {lastRun: endTime.toISOString()});
  }
}

export const RecordingRetentionJobBinding = createBindingFromClass(RecordingRetentionJob);

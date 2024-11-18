import { inject, createBindingFromClass, service } from '@loopback/core';
import { cronJob, CronJob } from '@loopback/cron';
import { CronJobRepository, CronLogRepository } from '../repositories';
import { mapCdrEntry } from '../lib';
import { repository } from '@loopback/repository';
import { WebexProxyApiService, WebexDataApiService } from '../services';

@cronJob()
export class CdrRetentionJob extends CronJob {
  constructor(
    @inject('services.WebexProxyApiService') protected proxySvc: WebexProxyApiService,
    @inject('services.WebexDataApiService') protected dataSvc: WebexDataApiService,
    @repository('CronJobRepository') protected cronJobRepo: CronJobRepository,
    @repository('CronLogRepository') protected cronLogRepo: CronLogRepository,
  ) {
    super({
      name: 'cdr-retention-job',
      cronTime: '*/5 * * * *',
      onTick: async () => {
        await this.tick();
      },
      start: true,
    });
  }

  async tick() {
    const now = new Date();

    let cdrJob = await this.cronJobRepo.findOne({where: {name: this.name}});

    const endTime = new Date(+now - (6 * 60 * 1000));
    const startTime = new Date(+endTime - (5 * 60 * 1000));

    if (!cdrJob) {
      cdrJob = await this.cronJobRepo.create({name: this.name, lastSuccess: startTime.toISOString(), lastRun: startTime.toISOString()});
    }
    
    const from = new Date(cdrJob.lastSuccess || cdrJob.lastRun).toISOString();
    const to = endTime.toISOString();

    try {
      const wxCdrResp = await this.proxySvc.cdrControllerGetEntries({startTime: from, endTime: to});
      const wxCdrEntries = wxCdrResp.body;

      await this.cronLogRepo.create({
        cronJobId: cdrJob.id,
        facility: 9,
        severity: 6,
        message: `Fetched CDR Entries`,
        data: {
          count: wxCdrEntries.length,
          from,
          to,
        }
      });

      let failures = 0;

      for (const cdr of wxCdrEntries) {
        const mapped = mapCdrEntry(cdr);
        try {
          await this.dataSvc.cdrControllerCreate(mapped);
        } catch (e) {
          failures++;

          await this.cronLogRepo.create({
            cronJobId: cdrJob.id,
            facility: 9,
            severity: 3,
            message: `Error creating CDR entry`,
            data: {
              error: e.response?.data,
            }
          });
        }
      }

      await this.cronLogRepo.create({
        cronJobId: cdrJob.id,
        facility: 9,
        severity: 6,
        message: `Created ${wxCdrEntries.length - failures} CDR Entries`,
        data: {
          failures,
        }
      });

      if (failures !== wxCdrEntries.length) {
        await this.cronJobRepo.updateById(cdrJob.id, {lastSuccess: endTime.toISOString()});
      }
    } catch (e) {
      if(e.response?.status === 404) {
        await this.cronLogRepo.create({
          cronJobId: cdrJob.id,
          facility: 9,
          severity: 6,
          message: `No CDR Entries found`,
          data: {
            from,
            to
          }
        });

        await this.cronJobRepo.updateById(cdrJob.id, {lastSuccess: endTime.toISOString()});

        return;
      }

      await this.cronLogRepo.create({
        cronJobId: cdrJob.id,
        facility: 9,
        severity: 3,
        message: `Error fetching CDR entries`,
        data: {
          error: e.response?.data,
        }
      });
    }

    await this.cronJobRepo.updateById(cdrJob.id, {lastRun: endTime.toISOString()});
  }
}

export const CdrRetentionJobBinding = createBindingFromClass(CdrRetentionJob);

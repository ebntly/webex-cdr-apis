import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import { CdrRetentionJobBinding } from './jobs/cdr-retention-job';
import { RecordingRetentionJobBinding } from './jobs/recording-retention-job';
import { CronComponent } from '@loopback/cron';
import { HealthBindings, HealthComponent, HealthTags } from '@loopback/health';
import { liveCheck, CronJobTrackingHealthCheck, WebexDataApiHealthCheck, WebexProxyApiHealthCheck } from './health';

export {ApplicationConfig};

export class WebexCronDarkApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    this.component(CronComponent);
    this.add(CdrRetentionJobBinding);
    this.add(RecordingRetentionJobBinding);
    this.configure(HealthBindings.COMPONENT).to({
      healthPath: '/health',
      openApiSpec: true,
    });
    this.bind('health.LiveCheck').to(liveCheck).tag(HealthTags.LIVE_CHECK);
    this.bind('health.db.CronJobTracking').toProvider(CronJobTrackingHealthCheck).tag(HealthTags.READY_CHECK);
    this.bind('health.deps.WebexDataApi').toProvider(WebexDataApiHealthCheck).tag(HealthTags.READY_CHECK);
    this.bind('health.deps.WebexProxyApi').toProvider(WebexProxyApiHealthCheck).tag(HealthTags.READY_CHECK);
    this.component(HealthComponent);
  }
}

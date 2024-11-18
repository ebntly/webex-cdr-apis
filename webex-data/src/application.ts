import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import { HealthBindings, HealthComponent, HealthTags } from '@loopback/health';
import path from 'path';
import {MySequence} from './sequence';
import { liveCheck, WebexDataHealthCheck } from './health';

export {ApplicationConfig};

export class CdrDataApplication extends BootMixin(
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
    this.configure(HealthBindings.COMPONENT).to({
      healthPath: '/health',
      openApiSpec: true,
    });
    this.component(HealthComponent);
    this.bind('health.LiveCheck').to(liveCheck).tag(HealthTags.LIVE_CHECK);
    this.bind('health.db.WebexData').toProvider(WebexDataHealthCheck).tag(HealthTags.READY_CHECK);
  }
}

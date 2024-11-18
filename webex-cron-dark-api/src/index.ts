import 'dotenv/config';
import { CronBindings } from '@loopback/cron';
export * from './application';
import {ApplicationConfig, WebexCronDarkApiApplication} from './application';
import { liveCheck, CronJobTrackingHealthCheck, WebexDataApiHealthCheck, WebexProxyApiHealthCheck } from './health';


export async function main(options: ApplicationConfig = {}) {
  const app = new WebexCronDarkApiApplication(options);

  await app.boot();
  await app.start();
  const {
    WEBEX_PROXY_API_HOST,
    WEBEX_PROXY_API_PORT,
    CDR_DATA_HOST,
    CDR_DATA_PORT,
  } = process.env;

  if (!WEBEX_PROXY_API_HOST || !WEBEX_PROXY_API_PORT || !CDR_DATA_HOST || !CDR_DATA_PORT) {
    console.error('Missing required environment variables',`
    ${WEBEX_PROXY_API_HOST ? '✔' : '❌'} WEBEX_PROXY_API_HOST
    ${WEBEX_PROXY_API_PORT ? '✔' : '❌'} WEBEX_PROXY_API_PORT
    ${CDR_DATA_HOST ? '✔' : '❌'} CDR_DATA_HOST
    ${CDR_DATA_PORT ? '✔' : '❌'} CDR_DATA_PORT
`);
    process.exit(1);
  }

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);
  const component = await app.get(CronBindings.COMPONENT);
  await component.start();

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST || '127.0.0.1',
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}

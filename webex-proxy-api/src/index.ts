import 'dotenv/config';
import { ApplicationConfig, WebexProxyApiApplication } from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new WebexProxyApiApplication(options);
  await app.boot();
  await app.start();

  const {
    WEBEX_ORG_ID,
    WEBEX_CLIENT_ID,
    WEBEX_CLIENT_ACCESS_TOKEN,
    WEBEX_CLIENT_REFRESH_TOKEN,
  } = process.env;
  
  if (!WEBEX_ORG_ID || !WEBEX_CLIENT_ID || !WEBEX_CLIENT_ACCESS_TOKEN || !WEBEX_CLIENT_REFRESH_TOKEN) {
    console.error('Missing required environment variables',`
    ${WEBEX_ORG_ID ? '✔' : '❌'} WEBEX_ORG_ID
    ${WEBEX_CLIENT_ID ? '✔' : '❌'} WEBEX_CLIENT_ID
    ${WEBEX_CLIENT_ACCESS_TOKEN ? '✔' : '❌'} WEBEX_CLIENT_ACCESS_TOKEN
    ${WEBEX_CLIENT_REFRESH_TOKEN ? '✔' : '❌'} WEBEX_CLIENT_REFRESH_TOKEN
`);
    process.exit(1);
  }

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

export const config = {

}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3133),
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

import { inject, Provider } from "@loopback/core";
import { ReadyCheck } from "@loopback/health";
import { CronJobTrackingDataSource, WebexDataApiDataSource, WebexProxyApiDataSource } from "./datasources";

export const liveCheck = () => new Promise((resolve, reject) => setTimeout(() => {
  resolve('Live check passed');
}, 10));

export class CronJobTrackingHealthCheck implements Provider<ReadyCheck>{
  constructor(
    @inject('datasources.CronJobTracking') protected cronJob: CronJobTrackingDataSource = new CronJobTrackingDataSource(),
  ) {}

  value() {
    return () => this.cronJob.ping();
  }
}

export class WebexDataApiHealthCheck implements Provider<ReadyCheck>{
  constructor(
    @inject('datasources.WebexDataApi') protected webexData: WebexDataApiDataSource = new WebexDataApiDataSource(),
  ) {}

  value() {
    return () => this.webexData.ping();
  }
}

export class WebexProxyApiHealthCheck implements Provider<ReadyCheck>{
  constructor(
    @inject('datasources.WebexProxyApi') protected webexProxy: WebexProxyApiDataSource = new WebexProxyApiDataSource(),
  ) {}

  value() {
    return () => this.webexProxy.ping(); 
  }
}
import { inject, Provider } from "@loopback/core";
import { ReadyCheck } from "@loopback/health";
import { WebexAnalyticsV1ApiDataSource, WebexV1ApiDataSource } from "./datasources";

export const liveCheck = () => new Promise((resolve, reject) => setTimeout(() => {
  resolve('Live check passed');
}, 10));

export class WebexV1ApiHealthCheck implements Provider<ReadyCheck>{
  constructor(
    @inject('datasources.WebexV1Api') protected webexApi: WebexV1ApiDataSource = new WebexV1ApiDataSource(),
  ) {}

  value() {
    return () => this.webexApi.ping();
  }
}

export class WebexAnalyticsV1ApiHealthCheck implements Provider<ReadyCheck>{
  constructor(
    @inject('datasources.WebexAnalyticsV1Api') protected webexApi: WebexAnalyticsV1ApiDataSource = new WebexAnalyticsV1ApiDataSource(),
  ) {}

  value() {
    return () => this.webexApi.ping();
  }
}
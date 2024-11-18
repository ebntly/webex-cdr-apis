import { inject, Provider } from "@loopback/core";
import { ReadyCheck } from "@loopback/health";
import { WebexDataSourceDataSource } from "./datasources";

export const liveCheck = () => new Promise((resolve, reject) => setTimeout(() => {
  resolve('Live check passed');
}, 10));

export class WebexDataHealthCheck implements Provider<ReadyCheck>{
  constructor(
    @inject('datasources.WebexDataSource') protected webexData: WebexDataSourceDataSource = new WebexDataSourceDataSource(),
  ) {}

  value() {
    return () => this.webexData.ping();
  }
}

import { inject, Provider } from "@loopback/core";
import { ReadyCheck } from "@loopback/health";
import { CronDataApiDataSource } from "./datasources";

export const liveCheck = () => new Promise((resolve, reject) => setTimeout(() => {
  resolve('Live check passed');
}, 10));

export class CronApiHealthCheck implements Provider<ReadyCheck>{
  constructor(
    @inject('datasources.CronDataApi') protected cronApi: CronDataApiDataSource = new CronDataApiDataSource(),
  ) {}

  value() {
    return () => this.cronApi.ping();
  }
}

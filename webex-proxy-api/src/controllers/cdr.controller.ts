
import { get, param, response } from "@loopback/rest";
import { inject } from "@loopback/core";
import { CdrService } from "../services";
import { type CdrEntry, CdrEntrySchema, CdrQuerySpec } from "../schema";

const {
  startTime,
  endTime,
  locations,
  max,
} = CdrQuerySpec;
export class CdrController {
  constructor(
    @inject('services.CdrService') protected cdrSvc: CdrService) {}

  @get('cdr-entries')
  @response(200, {
    description: 'Get Detailed Call History',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: CdrEntrySchema.schema
        }
      }
    }
  })
  async getEntries(
    @param.query.dateTime('startTime', startTime) startTime: Date,
    @param.query.dateTime('endTime', endTime) endTime: Date,
    @param.query.string('locations', locations) locations?: string,
    @param.query.number('max', max) max?: number,
  ): Promise<CdrEntry[]> {
    const startTimeString = startTime.toISOString();
    const endTimeString = endTime.toISOString();

    const result = await this.cdrSvc.getCdrEntries(startTimeString, endTimeString, locations, max);

    return result.items;
  }
}

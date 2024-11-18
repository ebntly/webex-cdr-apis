import {inject} from '@loopback/core';
import { WebexData } from '../services';
import { get, param, patch, response } from '@loopback/rest';
import { buildTimeline } from '../lib/build-timeline';
import { Timeline } from '../lib/types';
import { ConvergedRecording} from 'webex-data/dist/models'


export class TraceController {
  constructor(
    @inject('services.WebexData') protected webexData: WebexData,
  ) {}

  @get('/trace/{corrId}')
  @response(200, {
    description: 'Trace by correlation id'
  })
  async trace(
    @param.path.string('corrId') corrId: string,
  ): Promise<{recordings: ConvergedRecording[], timeline: Timeline[]}> {
    const recResp = await this.webexData.recordingControllerFind({where: {callSessionId: corrId}});
    const recordings = recResp.body;
    const cdrResp = await this.webexData.cdrControllerFind({where: {correlationId: corrId}});
    const cdrEntries = cdrResp.body;
    const timeline = buildTimeline(cdrEntries);

    return {
      recordings,
      timeline,
    }
  }
}

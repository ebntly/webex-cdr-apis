import {inject} from '@loopback/core';
import { WebexData } from '../services';
import { get, param, patch, response } from '@loopback/rest';
import { Filter, Order, Where } from '@loopback/repository';
import { Page } from '../lib/types';
import { ConvergedRecording } from 'webex-data/dist/models';
import { RecordingObjectDetail} from 'webex-proxy-api/dist/schema'


export class RecordingController {
  constructor(
    @inject('services.WebexData') protected webexData: WebexData,
  ) {}

  @get('/recording/list/{size}/{page}')
  @response(200, {

  })
  async recordingList(
    @param.path.number('size') size: number,
    @param.path.number('page') page: number,
    @param.query.object('where') where?: Where<ConvergedRecording>,
    @param.query.object('order') orderObj: Partial<Order<ConvergedRecording>> = {createdTime: 'DESC'},
  ): Promise<Page<ConvergedRecording>> {
    if (size < 10) size = 10;
    if (size > 250) size = 250;
    if (page < 0) page = 0;
    
    const order = Object.keys(orderObj).map((key) => `${key} ${orderObj[key as keyof typeof orderObj]}`)
    const countResp = await this.webexData.recordingControllerCount(where);
    const total = countResp.body.count;
    const pageCount = Math.floor(total / size);
    page = page > pageCount ? pageCount : page;
    const skipOffset = size * page;

    const resp = await this.webexData.recordingControllerFind({where, limit: size, offset: skipOffset, order});
    const recordings = resp.body;

    const prev = skipOffset > 0 ? page - 1 : undefined;
    const next = skipOffset + size <= total ? page + 1 : undefined;

    return {pages: {total: pageCount + 1, size, current: page, next, prev}, data: recordings, total};
  }

  @get('/recording/{id}')
  @response(200, {

  })
  async recordingById(
    @param.path.string('id') id: string,
  ): Promise<RecordingObjectDetail> {
    const resp = await this.webexData.recordingControllerFindById(id);

    return resp.body;
  }

  // @patch('/recording/{id}')
  // @response(204, {

  // })
  // async renameRecording(
  //   @param.path.string('id') id: string,    
  // ): Promise<object> {
  //   return this.webexData.recordingControllerFindById();
  // }
}

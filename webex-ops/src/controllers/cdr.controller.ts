import {inject} from '@loopback/core';
import { WebexData } from '../services';
import { get, param, response } from '@loopback/rest';
import { Filter, Order, Where } from '@loopback/repository';
import { Page } from '../lib/types';
import { CdrEntry} from 'webex-data/dist/models';

export class CdrController {
  constructor(
    @inject('services.WebexData') protected webexData: WebexData,
  ) {}

  @get('/cdr/list/{size}/{page}')
  @response(200, {
    description: 'List of CDR entries',
  })
  async cdrList(
    @param.path.number('size') size: number,
    @param.path.number('page') page: number,
    @param.query.object('where') where?: Where<CdrEntry>,
    @param.query.object('order') orderObj: Partial<Order<CdrEntry>> = {reportTime: 'DESC'},
  ): Promise<Page<CdrEntry>> {
    if (size < 10) size = 10;
    if (size > 250) size = 250;
    if (page < 0) page = 0;
    
    const countResp = await this.webexData.cdrControllerCount(where);

    const order = Object.keys(orderObj).map((key) => `${key} ${orderObj[key as keyof typeof orderObj]}`)
    const total = countResp.body.count;
    const pageCount = Math.floor(total / size);
    page = page > pageCount ? pageCount : page;
    const skipOffset = size * page;

    const resp = await this.webexData.cdrControllerFind({where, limit: size, offset: skipOffset, order});
    const cdrEntries = resp.body;

    const prev = skipOffset > 0 ? page - 1 : undefined;
    const next = skipOffset + size <= total ? page + 1 : undefined;

    return {pages: {total: pageCount + 1, size, current: page, next, prev}, data: cdrEntries, total};
  }

  @get('/cdr/calling/{callingNumber}/{size}/{page}')
  @response(200, {

  })
  async cdrCalling(
    @param.path.string('callingNumber') callingNumber: string,
    @param.path.number('size') size: number,
    @param.path.number('page') page: number,
    @param.query.object('where') where: Where<CdrEntry>,
    @param.query.object('order') orderObj: Partial<Order<CdrEntry>> = {reportTime: 'DESC'},
  ): Promise<Page<CdrEntry>> {
    if (size < 10) size = 10;
    if (size > 250) size = 250;
    if (page < 0) page = 0;

    const order = Object.keys(orderObj).map((key) => `${key} ${orderObj[key as keyof typeof orderObj]}`)
    const filter = {...where, callingNumber: {like: callingNumber}};    
    const countResp = await this.webexData.cdrControllerCount(filter);
    const total = countResp.body.count;
    const pageCount = Math.floor(total / size);
    page = page > pageCount ? pageCount : page;
    const skipOffset = size * page;

    const resp = await this.webexData.cdrControllerFind({where: filter, limit: size, offset: skipOffset, order});
    const cdrEntries = resp.body;

    const prev = skipOffset > 0 ? page - 1 : undefined;
    const next = skipOffset + size <= total ? page + 1 : undefined;

    return {pages: {total: pageCount + 1, size, current: page, next, prev}, data: cdrEntries, total};
  }

  @get('/cdr/called/{calledNumber}/{size}/{page}')
  @response(200, {

  })
  async cdrCalled(
    @param.path.string('calledNumber') calledNumber: string,
    @param.path.number('size') size: number,
    @param.path.number('page') page: number,
    @param.query.object('where') where: Where<CdrEntry>,
    @param.query.object('order') orderObj: Partial<Order<CdrEntry>> = {reportTime: 'DESC'},
  ): Promise<object> {
    if (size < 10) size = 10;
    if (size > 250) size = 250;
    if (page < 0) page = 0;
    
    const order = Object.keys(orderObj).map((key) => `${key} ${orderObj[key as keyof typeof orderObj]}`)
    const filter = {...where, calledNumber: {like: calledNumber}};    
    const countResp = await this.webexData.cdrControllerCount(filter);
    const total = countResp.body.count;
    const pageCount = Math.floor(total / size);
    page = page > pageCount ? pageCount : page;
    const skipOffset = size * page;

    const resp = await this.webexData.cdrControllerFind({where: filter, limit: size, offset: skipOffset, order});
    const cdrEntries = resp.body;

    const prev = skipOffset > 0 ? page - 1 : undefined;
    const next = skipOffset + size <= total ? page + 1 : undefined;

    return {pages: {total: pageCount + 1, size, current: page, next, prev}, data: cdrEntries, total};
  }

  @get('/cdr/number/{number}/{size}/{page}')
  @response(200, {

  })
  async cdrNumber(
    @param.path.string('number') number: string,
    @param.path.number('size') size: number,
    @param.path.number('page') page: number,
    @param.query.object('where') where: Where<CdrEntry>,
  ): Promise<object> {
    if (size < 10) size = 10;
    if (size > 250) size = 250;
    if (page < 0) page = 0;

    const filter = {...where, or: [{callingNumber: {like: number}}, {calledNumber: {like: number}}]};    
    const countResp = await this.webexData.cdrControllerCount(filter);
    const total = countResp.body.count;
    const pageCount = Math.floor(total / size);
    page = page > pageCount ? pageCount : page;
    const skipOffset = size * page;

    const resp = await this.webexData.cdrControllerFind({where: filter, limit: size, offset: skipOffset});
    const cdrEntries = resp.body;

    const prev = skipOffset > 0 ? page - 1 : undefined;
    const next = skipOffset + size <= total ? page + 1 : undefined;

    return {pages: {total: pageCount + 1, size, current: page, next, prev}, data: cdrEntries, total};
  }
}

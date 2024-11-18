import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {WebexV1ApiDataSource} from '../datasources';
import { WxAdminAuditEvent } from '../lib';

export interface AdminAuditService {
  getEvents(
    accessToken: string,
    orgId: string,
    from: string,
    to: string,
    actorId?: string,
    actorOrgId?: string,
    targetId?: string,
    categories?: {[key: string]: boolean},
  ): Promise<WxAdminAuditEvent[]>;
}

export class AdminAuditServiceProvider implements Provider<AdminAuditService> {
  constructor(
    // WebexV1Api must match the name property in the datasource json file
    @inject('datasources.WebexV1Api')
    protected dataSource: WebexV1ApiDataSource = new WebexV1ApiDataSource(),
  ) {}

  value(): Promise<AdminAuditService> {
    return getService(this.dataSource);
  }
}

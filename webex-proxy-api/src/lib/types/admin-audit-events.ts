export interface WxAdminAuditEntry {
  actionText: string;
  actorEmail: string;
  actorId: string;
  actorIp: string;
  actorName: string;
  actorOrgId: string;
  actorOrgName: string;
  actorUserAgent: string;
  adminRoles: string[];
  created: string;
  eventCategory: string;
  eventDescription: string;
  id: string;
  targetId: string;
  targetName: string;
  targetOrgId: string;
  targetOrgName: string;
  targetType: string;
  trackingId: string;
}

export interface WxAdminAuditEvent {
  data: WxAdminAuditEntry;
}

export type AuditAction = 
  | 'approve_kyc'
  | 'reject_kyc'
  | 'resolve_ticket'
  | 'assign_ticket'
  | 'change_status'
  | 'deploy_app'
  | 'stop_deployment';

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  role: string;
  action: AuditAction;
  entityType: 'kyc' | 'support' | 'deployment';
  entityId: string;
  entityName: string;
  details: string;
  ipAddress: string;
}

export type Role = 'admin' | 'kyc_reviewer' | 'support_agent' | 'viewer' | 'devops';

export type Permission = 
  | 'view_kyc'
  | 'approve_kyc'
  | 'reject_kyc'
  | 'view_support'
  | 'resolve_tickets'
  | 'assign_tickets'
  | 'view_all_tickets'
  | 'view_deployments'
  | 'deploy_applications'
  | 'view_audit_logs'
  | 'admin_access';

export interface RolePermissions {
  [key: string]: Permission[];
}

export const rolePermissions: RolePermissions = {
  admin: [
    'view_kyc',
    'approve_kyc',
    'reject_kyc',
    'view_support',
    'resolve_tickets',
    'assign_tickets',
    'view_all_tickets',
    'view_deployments',
    'deploy_applications',
    'view_audit_logs',
    'admin_access',
  ],
  kyc_reviewer: [
    'view_kyc',
    'approve_kyc',
    'reject_kyc',
  ],
  support_agent: [
    'view_support',
    'resolve_tickets',
    'assign_tickets',
  ],
  devops: [
    'view_deployments',
    'deploy_applications',
  ],
  viewer: [
    'view_kyc',
    'view_support',
  ],
};

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}
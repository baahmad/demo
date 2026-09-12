'use client';

import { Role, Permission, rolePermissions } from '@/types/rbac';

export class RBAC {
  static hasPermission(role: Role, permission: Permission): boolean {
    const permissions = rolePermissions[role] || [];
    return permissions.includes(permission);
  }

  static hasAnyPermission(role: Role, permissions: Permission[]): boolean {
    return permissions.some(permission => this.hasPermission(role, permission));
  }

  static hasAllPermissions(role: Role, permissions: Permission[]): boolean {
    return permissions.every(permission => this.hasPermission(role, permission));
  }

  static getPermissions(role: Role): Permission[] {
    return rolePermissions[role] || [];
  }
}
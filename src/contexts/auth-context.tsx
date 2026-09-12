'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Role, User } from '@/types/rbac';
import { AuditLog } from '@/types/audit';

interface AuthContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  switchRole: (role: Role) => void;
  auditLogs: AuditLog[];
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp' | 'ipAddress'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoUsers: Record<Role, User> = {
  admin: {
    id: 'admin-001',
    name: 'Admin User',
    email: 'admin@fintech.com',
    role: 'admin',
  },
  kyc_reviewer: {
    id: 'kyc-001',
    name: 'KYC Reviewer',
    email: 'kyc.reviewer@fintech.com',
    role: 'kyc_reviewer',
  },
  support_agent: {
    id: 'support-001',
    name: 'Support Agent',
    email: 'support.agent@fintech.com',
    role: 'support_agent',
  },
  devops: {
    id: 'devops-001',
    name: 'DevOps Engineer',
    email: 'devops@fintech.com',
    role: 'devops',
  },
  viewer: {
    id: 'viewer-001',
    name: 'Viewer User',
    email: 'viewer@fintech.com',
    role: 'viewer',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(demoUsers.admin);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const switchRole = (role: Role) => {
    setCurrentUser(demoUsers[role]);
  };

  const addAuditLog = (log: Omit<AuditLog, 'id' | 'timestamp' | 'ipAddress'>) => {
    const newLog: AuditLog = {
      ...log,
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.1.' + Math.floor(Math.random() * 255),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, switchRole, auditLogs, addAuditLog }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
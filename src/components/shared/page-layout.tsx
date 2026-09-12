'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { RoleSwitcher } from './role-switcher';
import { useAuth } from '@/contexts/auth-context';
import { RBAC } from '@/lib/rbac';
import { Permission } from '@/types/rbac';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  currentApp: 'kyc' | 'support' | 'deployments' | 'audit';
  requiredPermission?: Permission;
}

export function PageLayout({ children, title, currentApp, requiredPermission }: PageLayoutProps) {
  const { currentUser } = useAuth();

  // Check if user has required permission
  if (requiredPermission && !RBAC.hasPermission(currentUser.role, requiredPermission)) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-slate-400">
            You don't have permission to access this page. Current role: {currentUser.role.replace('_', ' ')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-black/50 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
                Internal Tooling
              </Link>
              <div className="ml-8 flex space-x-4">
                {RBAC.hasPermission(currentUser.role, 'view_kyc') && (
                  <Link
                    href="/kyc"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentApp === 'kyc'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'text-gray-400 hover:bg-gray-900/50 hover:text-gray-300'
                    }`}
                  >
                    KYC Review
                  </Link>
                )}
                {RBAC.hasPermission(currentUser.role, 'view_support') && (
                  <Link
                    href="/support"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentApp === 'support'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : 'text-gray-400 hover:bg-gray-900/50 hover:text-gray-300'
                    }`}
                  >
                    Support Tickets
                  </Link>
                )}
                {RBAC.hasPermission(currentUser.role, 'view_deployments') && (
                  <Link
                    href="/deployments"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentApp === 'deployments'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                        : 'text-gray-400 hover:bg-gray-900/50 hover:text-gray-300'
                    }`}
                  >
                    Deployments
                  </Link>
                )}
                {RBAC.hasPermission(currentUser.role, 'view_audit_logs') && (
                  <Link
                    href="/audit"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentApp === 'audit'
                        ? 'bg-red-500/10 text-red-400 border-red-500/30'
                        : 'text-gray-400 hover:bg-gray-900/50 hover:text-gray-300'
                    }`}
                  >
                    Audit Logs
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <RoleSwitcher />
              <span className="text-sm text-gray-400">Demo Environment</span>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">
            {title}
          </h1>
        </div>
        {children}
      </main>
    </div>
  );
}
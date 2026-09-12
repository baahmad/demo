'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RoleSwitcher } from '@/components/shared/role-switcher';
import { useAuth } from '@/contexts/auth-context';
import { RBAC } from '@/lib/rbac';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-black/50 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
                Internal Tooling
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <RoleSwitcher />
              <span className="text-sm text-gray-400">Demo Environment</span>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Internal Tooling Platform
          </h1>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {RBAC.hasPermission(currentUser.role, 'view_kyc') && (
            <Link href="/kyc">
              <Card className="bg-gray-900/50 border border-gray-800 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer group">
                <CardHeader>
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg mb-3 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <CardTitle className="text-white group-hover:text-emerald-400 transition-colors">KYC Review Queue</CardTitle>
                  <CardDescription className="text-gray-400">
                    Review and approve customer identity verification documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-400 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                      <span>PDF document navigation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                      <span>Risk-based prioritization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                      <span>Approval workflow</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
          {RBAC.hasPermission(currentUser.role, 'view_support') && (
            <Link href="/support">
              <Card className="bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer group">
                <CardHeader>
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg mb-3 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-400 transition-colors">Support Ticketing</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage customer support requests and inquiries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-400 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      <span>Priority-based routing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      <span>Message threading</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      <span>Category management</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
          {RBAC.hasPermission(currentUser.role, 'view_deployments') && (
            <Link href="/deployments">
              <Card className="bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer group">
                <CardHeader>
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg mb-3 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <CardTitle className="text-white group-hover:text-purple-400 transition-colors">Deployment Management</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage application deployments across environments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-400 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                      <span>Multi-environment support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                      <span>Version tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                      <span>Deployment workflow</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
          {RBAC.hasPermission(currentUser.role, 'view_audit_logs') && (
            <Link href="/audit">
              <Card className="bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/10 cursor-pointer group">
                <CardHeader>
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg mb-3 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 012-2V3a2 2 0 012 2h10a2 2 0 012-2V5a2 2 0 012-2h-2M9 5v9m0 0 9 0M4 1h16M4 1v9m0 0 9-5a2 2 0 01-2-2V5a2 2 0 012-2m-2 1a2 2 0 00-2 2V5a2 2 0 002 2" />
                    </svg>
                  </div>
                  <CardTitle className="text-white group-hover:text-red-400 transition-colors">Audit Logs</CardTitle>
                  <CardDescription className="text-gray-400">
                    Track all actions and changes across the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-400 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      <span>Action tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      <span>User accountability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      <span>Compliance logs</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
        
        {!RBAC.hasPermission(currentUser.role, 'view_kyc') && !RBAC.hasPermission(currentUser.role, 'view_support') && !RBAC.hasPermission(currentUser.role, 'view_deployments') && (
          <div className="text-center mt-8">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-2">Limited Access</h3>
              <p className="text-gray-400">
                Your current role ({currentUser.role.replace('_', ' ')}) has limited access. 
                Switch to a different role to see more features.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
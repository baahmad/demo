'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { AuditTable } from '@/components/audit/audit-table';
import { mockAuditLogs } from '@/lib/mock-data';
import { useAuth } from '@/contexts/auth-context';

export default function AuditPage() {
  const { auditLogs } = useAuth();
  const allLogs = [...auditLogs, ...mockAuditLogs];

  return (
    <PageLayout title="Audit Logs" currentApp="audit">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <span className="text-sm text-gray-400">
              {allLogs.length} total actions
            </span>
            <span className="text-sm text-gray-400">
              {allLogs.filter(l => l.entityType === 'kyc').length} KYC actions
            </span>
            <span className="text-sm text-gray-400">
              {allLogs.filter(l => l.entityType === 'support').length} Support actions
            </span>
            <span className="text-sm text-gray-400">
              {allLogs.filter(l => l.entityType === 'deployment').length} Deployment actions
            </span>
          </div>
        </div>
        <AuditTable logs={allLogs} />
      </div>
    </PageLayout>
  );
}

'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/shared/page-layout';
import { DeploymentTable } from '@/components/deployment/deployment-table';
import { mockDeployments } from '@/lib/mock-data';
import { Environment } from '@/types/deployment';

export default function DeploymentsPage() {
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment | 'all'>('all');

  const filteredDeployments = mockDeployments.filter(deployment => {
    if (selectedEnvironment !== 'all' && deployment.environment !== selectedEnvironment) return false;
    return true;
  });

  return (
    <PageLayout title="Deployment Management" currentApp="deployments">
      <div className="space-y-6">
        {/* Environment Filter */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <span className="text-sm text-gray-400">
              {filteredDeployments.filter(d => d.status === 'running').length} running
            </span>
            <span className="text-sm text-gray-400">
              {filteredDeployments.filter(d => d.status === 'deploying').length} deploying
            </span>
            <span className="text-sm text-gray-400">
              {filteredDeployments.filter(d => d.status === 'failed').length} failed
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {selectedEnvironment === 'all' ? 'All Environments' : selectedEnvironment.charAt(0).toUpperCase() + selectedEnvironment.slice(1)}
          </div>
        </div>

        <DeploymentTable deployments={filteredDeployments} />
      </div>
    </PageLayout>
  );
}
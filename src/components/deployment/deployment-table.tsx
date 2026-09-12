'use client';

import { Deployment } from '@/types/deployment';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { environmentConfigs } from '@/lib/mock-data';

interface DeploymentTableProps {
  deployments: Deployment[];
}

export function DeploymentTable({ deployments }: DeploymentTableProps) {
  const getStatusColor = (status: Deployment['status']) => {
    switch (status) {
      case 'running':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'deploying':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'stopped':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  // Group deployments by environment
  const groupedDeployments = environmentConfigs.map(env => ({
    ...env,
    deployments: deployments.filter(d => d.environment === env.name)
  }));

  return (
    <div className="space-y-6">
      {groupedDeployments.map((envGroup) => (
        <Card key={envGroup.name} className="bg-gray-900/50 border border-gray-800">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-white">
                <Badge className="bg-gray-700 text-gray-300 border-gray-600">{envGroup.displayName}</Badge>
                <span className="text-sm text-gray-400">{envGroup.url}</span>
              </CardTitle>
              <div className="text-sm text-gray-400">
                {envGroup.deployments.filter(d => d.status === 'running').length} running
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {envGroup.deployments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No deployments in this environment
              </div>
            ) : (
              <div className="space-y-3">
                {envGroup.deployments.map((deployment) => (
                  <div
                    key={deployment.id}
                    className="flex items-center justify-between p-4 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-white">{deployment.appName}</span>
                        <Badge className={getStatusColor(deployment.status)} variant="outline">
                          {deployment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="font-mono text-purple-300">{deployment.version}</span>
                        <span>Deployed: {new Date(deployment.deployedAt).toLocaleDateString()}</span>
                        <span>by {deployment.deployedBy}</span>
                        <span className="font-mono text-xs text-gray-500">{deployment.commitHash}</span>
                      </div>
                      {deployment.description && (
                        <div className="text-sm text-gray-500 mt-1">{deployment.description}</div>
                      )}
                    </div>
                    <Link href={`/deployments/${deployment.id}`}>
                      <Button size="sm" className="bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20">
                        Details
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
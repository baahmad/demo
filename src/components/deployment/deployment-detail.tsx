'use client';

import { useState } from 'react';
import { Deployment } from '@/types/deployment';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VersionPreview } from './version-preview';
import { useAuth } from '@/contexts/auth-context';
import { RBAC } from '@/lib/rbac';
import { environmentConfigs, mockDeployments } from '@/lib/mock-data';
import { getAppVersions } from '@/lib/versions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AuditLog } from '@/types/audit';

interface DeploymentDetailProps {
  deployment: Deployment;
}

export function DeploymentDetail({ deployment }: DeploymentDetailProps) {
  const { currentUser, addAuditLog } = useAuth();
  const [selectedVersion, setSelectedVersion] = useState('');
  const [showLogs, setShowLogs] = useState(false);
  const canDeploy = RBAC.hasPermission(currentUser.role, 'deploy_applications');

  const envConfig = environmentConfigs.find(e => e.name === deployment.environment);
  const availableVersions = getAppVersions(deployment.appName);
  const selectedVersionData = availableVersions.find(v => v.version === selectedVersion);
  const status = deployment.status;

  const handleRedeploy = () => {
    if (canDeploy) {
      addAuditLog({
        userId: currentUser.id,
        userName: currentUser.name,
        role: currentUser.role,
        action: 'deploy_app',
        entityType: 'deployment',
        entityId: deployment.id,
        entityName: `${deployment.appName} ${deployment.version}`,
        details: `Redeployed ${deployment.version} to ${envConfig?.displayName}`,
      });
      alert(`Redeploying ${deployment.version} to ${envConfig?.displayName}`);
    }
  };

  const handleStop = () => {
    if (canDeploy) {
      addAuditLog({
        userId: currentUser.id,
        userName: currentUser.name,
        role: currentUser.role,
        action: 'stop_deployment',
        entityType: 'deployment',
        entityId: deployment.id,
        entityName: `${deployment.appName} ${deployment.version}`,
        details: `Stopped deployment ${deployment.id}`,
      });
      alert(`Stopping deployment ${deployment.id}`);
    }
  };

  const handleDeployVersion = () => {
    if (canDeploy && selectedVersion && envConfig) {
      alert(`Deploying ${selectedVersion} of ${deployment.appName} to ${envConfig.displayName}`);
      setSelectedVersion('');
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Deployment Information Card */}
      <Card className="bg-gray-900/50 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Deployment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300">App Name</label>
              <div className="text-lg font-semibold text-white">{deployment.appName}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Environment</label>
              <div>
                <Badge className="bg-gray-700 text-gray-300 border-gray-600">
                  {envConfig?.displayName}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Current Version</label>
              <div className="text-lg font-mono text-purple-300">{deployment.version}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Status</label>
              <div>
                <Badge className={getStatusColor(status)} variant="outline">
                  {status}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Deployed At</label>
              <div className="text-lg text-white">
                {new Date(deployment.deployedAt).toLocaleString()}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Deployed By</label>
              <div className="text-lg text-white">{deployment.deployedBy}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Commit Hash</label>
              <div className="text-lg font-mono text-gray-400">{deployment.commitHash}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Environment URL</label>
              <div className="text-lg">
                <a href={envConfig?.url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
                  {envConfig?.url}
                </a>
              </div>
            </div>
          </div>
          
          {deployment.description && (
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Description
              </label>
              <div className="bg-gray-800/50 p-4 rounded-md text-sm text-gray-400">
                {deployment.description}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Version Selection Card */}
      <Card className="bg-gray-900/50 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Select Version to Deploy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Available Versions
              </label>
              <select 
                value={selectedVersion} 
                onChange={(e) => setSelectedVersion(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white"
              >
                <option value="">Select version</option>
                {availableVersions.map((version) => (
                  <option key={version.version} value={version.version}>
                    {version.version} - {version.style}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedVersionData && (
              <VersionPreview version={selectedVersionData} appName={deployment.appName} />
            )}
            
            <Button
              onClick={handleDeployVersion}
              disabled={!canDeploy || status === 'deploying' || selectedVersion === deployment.version}
              className="w-full bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20"
            >
              {canDeploy ? `Deploy ${selectedVersion} to ${envConfig?.displayName}` : 'Deploy (No Permission)'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Environment Status Card */}
      <Card className="bg-gray-900/50 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Environment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {environmentConfigs.map((env) => {
              const envDeployment = mockDeployments.find(
                d => d.appName === deployment.appName && d.environment === env.name
              );
              const versionToDisplay = envDeployment?.version || 'Not deployed';
              const isCurrentEnv = env.name === deployment.environment;
              
              return (
                <div
                  key={env.name}
                  className={`flex items-center justify-between p-3 rounded-md ${
                    isCurrentEnv ? 'bg-purple-500/10 border-2 border-purple-500/30' : 'bg-gray-800/50 border border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Badge className="bg-gray-700 text-gray-300 border-gray-600">{env.displayName}</Badge>
                    <span className="font-mono text-sm text-purple-300">{versionToDisplay}</span>
                  </div>
                  {isCurrentEnv && (
                    <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/30">Current</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Deployment Actions */}
      <Card className="bg-gray-900/50 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Deployment Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              onClick={handleRedeploy}
              disabled={!canDeploy || status === 'deploying'}
              className="bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20"
            >
              {canDeploy ? 'Redeploy Current' : 'Redeploy (No Permission)'}
            </Button>
            <Button
              onClick={handleStop}
              variant="outline"
              disabled={!canDeploy || status === 'stopped'}
              className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
            >
              {canDeploy ? 'Stop Deployment' : 'Stop (No Permission)'}
            </Button>
            <Button
              onClick={() => setShowLogs(true)}
              variant="outline"
              disabled={status === 'stopped'}
              className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
            >
              View Logs
            </Button>
          </div>
          {!canDeploy && (
            <p className="text-sm text-gray-500 mt-2">
              Your role ({currentUser.role.replace('_', ' ')}) doesn't have permission to deploy applications.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Logs Dialog */}
      <Dialog open={showLogs} onOpenChange={setShowLogs}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Deployment Logs</DialogTitle>
            <div className="text-sm text-gray-400">
              {deployment.appName} - {deployment.version} - {envConfig?.displayName}
            </div>
          </DialogHeader>
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 font-mono text-xs max-h-96 overflow-y-auto">
            <div className="space-y-1">
              <div className="text-gray-500">2024-01-15 10:23:45 [INFO] Starting deployment...</div>
              <div className="text-gray-500">2024-01-15 10:23:46 [INFO] Pulling image: {deployment.appName}:{deployment.version}</div>
              <div className="text-gray-500">2024-01-15 10:23:48 [INFO] Image pulled successfully</div>
              <div className="text-gray-500">2024-01-15 10:23:49 [INFO] Updating deployment config</div>
              <div className="text-gray-500">2024-01-15 10:23:50 [INFO] Applying Kubernetes manifests</div>
              <div className="text-gray-500">2024-01-15 10:23:51 [INFO] Creating deployment: {deployment.appName}-{deployment.environment}</div>
              <div className="text-gray-500">2024-01-15 10:23:52 [INFO] Configuring service: {deployment.appName}-service</div>
              <div className="text-gray-500">2024-01-15 10:23:53 [INFO] Setting up ingress rules</div>
              <div className="text-gray-500">2024-01-15 10:23:54 [INFO] Configuring environment variables</div>
              <div className="text-gray-500">2024-01-15 10:23:55 [INFO] Starting pods (replicas: 3)</div>
              <div className="text-gray-500">2024-01-15 10:23:56 [INFO] Pod {deployment.appName}-{deployment.environment}-7f8b9c4d-x2kqp created</div>
              <div className="text-gray-500">2024-01-15 10:23:57 [INFO] Pod {deployment.appName}-{deployment.environment}-8a3c5e6f-y3jqr created</div>
              <div className="text-gray-500">2024-01-15 10:23:58 [INFO] Pod {deployment.appName}-{deployment.environment}-9b4d6f7g-z4kps created</div>
              <div className="text-gray-500">2024-01-15 10:23:59 [INFO] All pods running successfully</div>
              <div className="text-gray-500">2024-01-15 10:24:00 [INFO] Health check passed</div>
              <div className="text-green-400">2024-01-15 10:24:01 [SUCCESS] Deployment completed successfully</div>
              <div className="text-gray-500">2024-01-15 10:24:02 [INFO] Deployment status: {deployment.status}</div>
              <div className="text-gray-500">2024-01-15 10:24:03 [INFO] Commit: {deployment.commitHash}</div>
              <div className="text-gray-500">2024-01-15 10:24:04 [INFO] Deployed by: {deployment.deployedBy}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
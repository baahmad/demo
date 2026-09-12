export type Environment = 'testing' | 'staging' | 'production';

export interface Deployment {
  id: string;
  appName: string;
  environment: Environment;
  version: string;
  status: 'running' | 'deploying' | 'failed' | 'stopped';
  deployedAt: string;
  deployedBy: string;
  commitHash: string;
  description?: string;
}

export interface EnvironmentConfig {
  name: Environment;
  displayName: string;
  color: string;
  url: string;
}
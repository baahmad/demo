export interface AppVersion {
  version: string;
  style: 'modern' | 'classic' | 'minimal';
  features: string[];
  description: string;
}

export const appVersions: Record<string, AppVersion[]> = {
  'KYC Review Queue': [
    {
      version: 'v2.4.1',
      style: 'modern',
      features: ['PDF navigation', 'Risk scoring', 'Approval workflow'],
      description: 'Modern interface with PDF document navigation and advanced risk scoring',
    },
    {
      version: 'v2.5.0',
      style: 'classic',
      features: ['Basic PDF viewer', 'Manual review', 'Simple approvals'],
      description: 'Classic interface with standard PDF viewing and manual review process',
    },
    {
      version: 'v2.6.0-dev',
      style: 'minimal',
      features: ['Essential reviews', 'Quick actions', 'Streamlined workflow'],
      description: 'Minimal interface focused on speed and essential review actions',
    },
  ],
  'Support Ticketing': [
    {
      version: 'v1.8.3',
      style: 'modern',
      features: ['Message threading', 'Priority routing', 'Category management'],
      description: 'Modern interface with threaded conversations and smart routing',
    },
    {
      version: 'v1.9.0',
      style: 'classic',
      features: ['Basic messaging', 'Ticket assignment', 'Status tracking'],
      description: 'Classic interface with standard ticket management features',
    },
    {
      version: 'v1.10.0-dev',
      style: 'minimal',
      features: ['Quick responses', 'Essential actions', 'Fast resolution'],
      description: 'Minimal interface optimized for rapid ticket resolution',
    },
  ],
};

export const styleClasses = {
  modern: {
    container: 'bg-white rounded-lg shadow-lg',
    header: 'bg-gradient-to-r from-blue-600 to-blue-800 text-white',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
    table: 'border-collapse w-full',
  },
  classic: {
    container: 'bg-gray-100 border-2 border-gray-300 rounded',
    header: 'bg-gray-800 text-white',
    button: 'bg-gray-700 hover:bg-gray-800 text-white',
    table: 'border-collapse w-full border border-gray-300',
  },
  minimal: {
    container: 'bg-white border border-gray-200 rounded',
    header: 'bg-gray-50 text-gray-900 border-b',
    button: 'bg-gray-900 hover:bg-gray-800 text-white',
    table: 'border-collapse w-full',
  },
};

export function getAppVersions(appName: string): AppVersion[] {
  return appVersions[appName] || [];
}
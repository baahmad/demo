'use client';

import { useAuth } from '@/contexts/auth-context';
import { Role } from '@/types/rbac';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function RoleSwitcher() {
  const { currentUser, switchRole } = useAuth();

  const roles: { value: Role; label: string }[] = [
    { value: 'admin', label: 'Admin' },
    { value: 'kyc_reviewer', label: 'KYC Reviewer' },
    { value: 'support_agent', label: 'Support Agent' },
    { value: 'devops', label: 'DevOps' },
    { value: 'viewer', label: 'Viewer' },
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="text-sm">
        <span className="text-gray-400">Current Role:</span>
        <span className="ml-2 font-medium text-white">{currentUser.role.replace('_', ' ')}</span>
      </div>
      <Select
        value={currentUser.role}
        onValueChange={(value) => switchRole(value as Role)}
      >
        <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
          <SelectValue placeholder="Switch role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              {role.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
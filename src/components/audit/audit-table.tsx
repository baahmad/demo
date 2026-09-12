'use client';

import { AuditLog } from '@/types/audit';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface AuditTableProps {
  logs: AuditLog[];
}

export function AuditTable({ logs }: AuditTableProps) {
  const getActionColor = (action: AuditLog['action']) => {
    switch (action) {
      case 'approve_kyc':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'reject_kyc':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'resolve_ticket':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'assign_ticket':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'change_status':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'deploy_app':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'stop_deployment':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getEntityTypeColor = (entityType: AuditLog['entityType']) => {
    switch (entityType) {
      case 'kyc':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'support':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'deployment':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700">
            <TableHead className="text-white/90">Timestamp</TableHead>
            <TableHead className="text-white/90">User</TableHead>
            <TableHead className="text-white/90">Role</TableHead>
            <TableHead className="text-white/90">Action</TableHead>
            <TableHead className="text-white/90">Entity Type</TableHead>
            <TableHead className="text-white/90">Entity</TableHead>
            <TableHead className="text-white/90">Details</TableHead>
            <TableHead className="text-white/90">IP Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id} className="border-gray-700 hover:bg-gray-800/50 transition-colors">
              <TableCell className="text-white">
                <div className="text-sm">{new Date(log.timestamp).toLocaleString()}</div>
              </TableCell>
              <TableCell className="text-white">
                <div>
                  <div className="font-medium">{log.userName}</div>
                  <div className="text-sm text-gray-400">{log.userId}</div>
                </div>
              </TableCell>
              <TableCell className="text-white">
                <Badge className="bg-gray-700 text-gray-300 border-gray-600" variant="outline">
                  {log.role.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getActionColor(log.action)} variant="outline">
                  {log.action.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getEntityTypeColor(log.entityType)} variant="outline">
                  {log.entityType}
                </Badge>
              </TableCell>
              <TableCell className="text-white">
                <div>
                  <div className="font-medium">{log.entityName}</div>
                  <div className="text-sm text-gray-400">{log.entityId}</div>
                </div>
              </TableCell>
              <TableCell className="text-white text-sm">{log.details}</TableCell>
              <TableCell className="text-white font-mono text-sm text-gray-400">{log.ipAddress}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

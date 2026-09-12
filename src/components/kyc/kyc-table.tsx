'use client';

import { KYCRecord } from '@/types/kyc';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { RBAC } from '@/lib/rbac';

interface KYCTableProps {
  records: KYCRecord[];
}

export function KYCTable({ records }: KYCTableProps) {
  const { currentUser } = useAuth();
  const canReview = RBAC.hasPermission(currentUser.role, 'approve_kyc') || 
                    RBAC.hasPermission(currentUser.role, 'reject_kyc');

  // Filter out approved records
  const filteredRecords = records.filter(record => record.status !== 'approved');

  const getStatusColor = (status: KYCRecord['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'approved':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'reviewing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: KYCRecord['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-400 font-semibold';
    if (score >= 40) return 'text-yellow-400 font-semibold';
    return 'text-green-400 font-semibold';
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700">
            <TableHead className="text-white/90">Applicant</TableHead>
            <TableHead className="text-white/90">Risk Score</TableHead>
            <TableHead className="text-white/90">Document Type</TableHead>
            <TableHead className="text-white/90">Country</TableHead>
            <TableHead className="text-white/90">Status</TableHead>
            <TableHead className="text-white/90">Priority</TableHead>
            <TableHead className="text-white/90">Submitted</TableHead>
            {canReview && <TableHead className="text-white/90">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRecords.map((record) => (
            <TableRow key={record.id} className="border-gray-700 hover:bg-gray-800/50 transition-colors">
              <TableCell className="text-white">
                <div>
                  <div className="font-medium">{record.userName}</div>
                  <div className="text-sm text-gray-400">{record.email}</div>
                </div>
              </TableCell>
              <TableCell>
                <span className={getRiskScoreColor(record.riskScore)}>
                  {record.riskScore}
                </span>
              </TableCell>
              <TableCell className="text-white capitalize">{record.documentType.replace('_', ' ')}</TableCell>
              <TableCell className="text-white">{record.country}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(record.status)} variant="outline">
                  {record.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(record.priority)} variant="outline">
                  {record.priority}
                </Badge>
              </TableCell>
              <TableCell className="text-white">
                {new Date(record.submittedDate).toLocaleDateString()}
              </TableCell>
              {canReview && (
                <TableCell>
                  <Link href={`/kyc/${record.id}`}>
                    <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                      Review
                    </Button>
                  </Link>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
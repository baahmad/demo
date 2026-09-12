'use client';

import { useState } from 'react';
import { KYCRecord } from '@/types/kyc';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PDFViewer } from './pdf-viewer';
import { mockDocumentSections } from '@/lib/mock-data';
import { useAuth } from '@/contexts/auth-context';
import { RBAC } from '@/lib/rbac';

interface KYCDetailProps {
  record: KYCRecord;
}

export function KYCDetail({ record }: KYCDetailProps) {
  const { currentUser, addAuditLog } = useAuth();
  const [notes, setNotes] = useState(record.notes || '');
  const [status, setStatus] = useState(record.status);

  const canApprove = RBAC.hasPermission(currentUser.role, 'approve_kyc');
  const canReject = RBAC.hasPermission(currentUser.role, 'reject_kyc');

  const handleApprove = () => {
    if (canApprove) {
      setStatus('approved');
      addAuditLog({
        userId: currentUser.id,
        userName: currentUser.name,
        role: currentUser.role,
        action: 'approve_kyc',
        entityType: 'kyc',
        entityId: record.id,
        entityName: record.userName,
        details: `Approved KYC application with risk score ${record.riskScore}`,
      });
    }
  };

  const handleReject = () => {
    if (canReject) {
      setStatus('rejected');
      addAuditLog({
        userId: currentUser.id,
        userName: currentUser.name,
        role: currentUser.role,
        action: 'reject_kyc',
        entityType: 'kyc',
        entityId: record.id,
        entityName: record.userName,
        details: `Rejected KYC application - ${notes || 'No reason provided'}`,
      });
    }
  };

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
    <div className="space-y-6">
      {/* User Information Card */}
      <Card className="bg-gray-900/50 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Applicant Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300">Name</label>
              <div className="text-lg font-semibold text-white">{record.userName}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Email</label>
              <div className="text-lg text-white">{record.email}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">User ID</label>
              <div className="text-lg text-white">{record.userId}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Country</label>
              <div className="text-lg text-white">{record.country}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Risk Score</label>
              <div className={`text-lg ${getRiskScoreColor(record.riskScore)}`}>
                {record.riskScore}/100
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Document Type</label>
              <div className="text-lg capitalize text-white">{record.documentType.replace('_', ' ')}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Status</label>
              <div>
                <Badge className={getStatusColor(status)} variant="outline">{status}</Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Priority</label>
              <div>
                <Badge className={getPriorityColor(record.priority)} variant="outline">{record.priority}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PDF Viewer */}
      <PDFViewer sections={mockDocumentSections} />

      {/* Review Actions */}
      <Card className="bg-gray-900/50 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Review Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Review Notes
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this review..."
                rows={4}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleApprove}
                className="bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20"
                disabled={status === 'approved' || !canApprove}
              >
                {canApprove ? 'Approve Application' : 'Approve (Insufficient Permissions)'}
              </Button>
              <Button
                onClick={handleReject}
                variant="destructive"
                className="bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20"
                disabled={status === 'rejected' || !canReject}
              >
                {canReject ? 'Reject Application' : 'Reject (Insufficient Permissions)'}
              </Button>
              <Button
                onClick={() => setStatus('reviewing')}
                variant="outline"
                className="bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                disabled={status === 'reviewing'}
              >
                Mark for Review
              </Button>
            </div>
            {!canApprove && !canReject && (
              <p className="text-sm text-gray-500">
                Your role ({currentUser.role.replace('_', ' ')}) doesn't have permission to approve or reject KYC applications.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
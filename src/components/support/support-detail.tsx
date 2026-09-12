'use client';

import { useState } from 'react';
import { SupportTicket } from '@/types/support';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context';
import { RBAC } from '@/lib/rbac';
import Link from 'next/link';
import { mockKYCRecords } from '@/lib/mock-data';

interface SupportDetailProps {
  ticket: SupportTicket;
}

export function SupportDetail({ ticket }: SupportDetailProps) {
  const { currentUser, addAuditLog } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [status, setStatus] = useState(ticket.status);
  const [assignedTo, setAssignedTo] = useState(ticket.assignedTo || '');

  // Find the KYC record for this user
  const kycRecord = mockKYCRecords.find(r => r.userId === ticket.userId);
  const kycRecordId = kycRecord?.id;

  const canResolve = RBAC.hasPermission(currentUser.role, 'resolve_tickets');
  const canAssign = RBAC.hasPermission(currentUser.role, 'assign_tickets');
  const canViewKYC = RBAC.hasPermission(currentUser.role, 'view_kyc');

  const handleAssignChange = (value: string) => {
    setAssignedTo(value);
  };

  const handleAssignBlur = () => {
    if (canAssign && assignedTo && assignedTo !== ticket.assignedTo) {
      addAuditLog({
        userId: currentUser.id,
        userName: currentUser.name,
        role: currentUser.role,
        action: 'assign_ticket',
        entityType: 'support',
        entityId: ticket.id,
        entityName: ticket.subject,
        details: `Assigned ticket to ${assignedTo}`,
      });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      setNewMessage('');
    }
  };

  const handleStatusChange = (newStatus: SupportTicket['status']) => {
    if (newStatus === 'resolved' && !canResolve) {
      return; // Prevent resolving without permission
    }
    setStatus(newStatus);
    
    // Add audit log for status change
    if (newStatus !== status) {
      addAuditLog({
        userId: currentUser.id,
        userName: currentUser.name,
        role: currentUser.role,
        action: newStatus === 'resolved' ? 'resolve_ticket' : 'change_status',
        entityType: 'support',
        entityId: ticket.id,
        entityName: ticket.subject,
        details: `Changed status from ${status} to ${newStatus}`,
      });
    }
  };

  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'resolved':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'closed':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getCategoryColor = (category: SupportTicket['category']) => {
    switch (category) {
      case 'payment':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'technical':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'account':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'compliance':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'other':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Ticket Information Card */}
      <Card className="bg-gray-900/50 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Ticket Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300">Ticket ID</label>
              <div className="text-lg font-mono text-white">{ticket.id}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Subject</label>
              <div className="text-lg font-semibold text-white">{ticket.subject}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Customer</label>
              <div className="flex items-center gap-2">
                <div className="text-lg text-white">{ticket.userName}</div>
                {kycRecordId && canViewKYC && (
                  <Link href={`/kyc/${kycRecordId}`}>
                    <Button size="sm" variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 text-xs">
                      View KYC
                    </Button>
                  </Link>
                )}
              </div>
              <div className="text-sm text-gray-400">{ticket.email}</div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Category</label>
              <div>
                <Badge className={getCategoryColor(ticket.category)} variant="outline">
                  {ticket.category}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Status</label>
              <div>
                <Badge className={getStatusColor(status)} variant="outline">
                  {status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Priority</label>
              <div>
                <Badge className={getPriorityColor(ticket.priority)} variant="outline">
                  {ticket.priority}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Created</label>
              <div className="text-lg text-white">
                {new Date(ticket.createdDate).toLocaleString()}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Last Updated</label>
              <div className="text-lg text-white">
                {new Date(ticket.lastUpdated).toLocaleString()}
              </div>
            </div>
          </div>
          
          {ticket.description && (
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Description
              </label>
              <div className="bg-gray-800/50 p-4 rounded-md text-sm text-gray-400">
                {ticket.description}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Message Thread */}
      <Card className="bg-gray-900/50 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Conversation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4">
            {ticket.messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${message.isInternal ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[70%] ${message.isInternal ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-gray-800/50 border border-gray-700'} rounded-lg p-3`}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm text-white">{message.userName}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(message.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">{message.message}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="flex gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your response..."
                rows={3}
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button onClick={handleSendMessage} className="self-end bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20">
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Actions */}
      <Card className="bg-gray-900/50 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Ticket Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Assign To
              </label>
              <Input
                value={assignedTo}
                onChange={(e) => handleAssignChange(e.target.value)}
                onBlur={handleAssignBlur}
                placeholder="Enter agent name or ID"
                disabled={!canAssign}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              {!canAssign && (
                <p className="text-sm text-gray-500 mt-1">
                  Your role doesn't have permission to assign tickets.
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Update Status
              </label>
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={() => handleStatusChange('open')}
                  variant={status === 'open' ? 'default' : 'outline'}
                  size="sm"
                  className={status === 'open' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'}
                >
                  Open
                </Button>
                <Button
                  onClick={() => handleStatusChange('in_progress')}
                  variant={status === 'in_progress' ? 'default' : 'outline'}
                  size="sm"
                  className={status === 'in_progress' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'}
                >
                  In Progress
                </Button>
                <Button
                  onClick={() => handleStatusChange('resolved')}
                  variant={status === 'resolved' ? 'default' : 'outline'}
                  size="sm"
                  disabled={!canResolve}
                  className={status === 'resolved' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'}
                >
                  {canResolve ? 'Resolved' : 'Resolved (No Permission)'}
                </Button>
                <Button
                  onClick={() => handleStatusChange('closed')}
                  variant={status === 'closed' ? 'default' : 'outline'}
                  size="sm"
                  className={status === 'closed' ? 'bg-gray-500/10 text-gray-400 border-gray-500/30' : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'}
                >
                  Closed
                </Button>
              </div>
              {!canResolve && (
                <p className="text-sm text-gray-500 mt-2">
                  Your role ({currentUser.role.replace('_', ' ')}) doesn't have permission to resolve tickets.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
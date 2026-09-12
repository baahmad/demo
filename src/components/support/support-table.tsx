'use client';

import { SupportTicket } from '@/types/support';
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

interface SupportTableProps {
  tickets: SupportTicket[];
}

export function SupportTable({ tickets }: SupportTableProps) {
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
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700">
            <TableHead className="text-white/90">Ticket ID</TableHead>
            <TableHead className="text-white/90">Customer</TableHead>
            <TableHead className="text-white/90">Subject</TableHead>
            <TableHead className="text-white/90">Category</TableHead>
            <TableHead className="text-white/90">Status</TableHead>
            <TableHead className="text-white/90">Priority</TableHead>
            <TableHead className="text-white/90">Assigned To</TableHead>
            <TableHead className="text-white/90">Created</TableHead>
            <TableHead className="text-white/90">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id} className="border-gray-700 hover:bg-gray-800/50 transition-colors">
              <TableCell className="font-mono text-sm text-white">{ticket.id}</TableCell>
              <TableCell className="text-white">
                <div>
                  <div className="font-medium">{ticket.userName}</div>
                  <div className="text-sm text-gray-400">{ticket.email}</div>
                </div>
              </TableCell>
              <TableCell className="text-white">
                <div className="max-w-xs truncate">{ticket.subject}</div>
              </TableCell>
              <TableCell>
                <Badge className={getCategoryColor(ticket.category)} variant="outline">
                  {ticket.category}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(ticket.status)} variant="outline">
                  {ticket.status.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(ticket.priority)} variant="outline">
                  {ticket.priority}
                </Badge>
              </TableCell>
              <TableCell className="text-white">
                {ticket.assignedTo || <span className="text-gray-500">Unassigned</span>}
              </TableCell>
              <TableCell className="text-white">
                {new Date(ticket.createdDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Link href={`/support/${ticket.id}`}>
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
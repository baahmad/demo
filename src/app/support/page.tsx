import { PageLayout } from '@/components/shared/page-layout';
import { SupportTable } from '@/components/support/support-table';
import { mockSupportTickets } from '@/lib/mock-data';

export default function SupportPage() {
  return (
    <PageLayout title="Support Tickets" currentApp="support">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <span className="text-sm text-gray-400">
              {mockSupportTickets.filter(t => t.status === 'open').length} open
            </span>
            <span className="text-sm text-gray-400">
              {mockSupportTickets.filter(t => t.status === 'in_progress').length} in progress
            </span>
            <span className="text-sm text-gray-400">
              {mockSupportTickets.filter(t => t.priority === 'urgent').length} urgent
            </span>
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white">
              <option>All Status</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
            <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white">
              <option>All Priority</option>
              <option>Urgent</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white">
              <option>All Categories</option>
              <option>Account</option>
              <option>Payment</option>
              <option>Technical</option>
              <option>Compliance</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <SupportTable tickets={mockSupportTickets} />
      </div>
    </PageLayout>
  );
}
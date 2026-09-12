export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  email: string;
  subject: string;
  category: 'account' | 'payment' | 'technical' | 'compliance' | 'other';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdDate: string;
  lastUpdated: string;
  assignedTo?: string;
  description: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
  isInternal: boolean;
}
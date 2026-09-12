import { PageLayout } from '@/components/shared/page-layout';
import { SupportDetail } from '@/components/support/support-detail';
import { mockSupportTickets } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default async function SupportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ticket = mockSupportTickets.find(t => t.id === id);
  
  if (!ticket) {
    notFound();
  }

  return (
    <PageLayout title={`Ticket ${ticket.id} - ${ticket.subject}`} currentApp="support">
      <SupportDetail ticket={ticket} />
    </PageLayout>
  );
}
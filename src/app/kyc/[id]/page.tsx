import { PageLayout } from '@/components/shared/page-layout';
import { KYCDetail } from '@/components/kyc/kyc-detail';
import { mockKYCRecords } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default async function KYCDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = mockKYCRecords.find(r => r.id === id);
  
  if (!record) {
    notFound();
  }

  return (
    <PageLayout title={`KYC Review - ${record.userName}`} currentApp="kyc">
      <KYCDetail record={record} />
    </PageLayout>
  );
}
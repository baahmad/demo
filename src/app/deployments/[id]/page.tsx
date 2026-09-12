import { PageLayout } from '@/components/shared/page-layout';
import { DeploymentDetail } from '@/components/deployment/deployment-detail';
import { mockDeployments } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default async function DeploymentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deployment = mockDeployments.find(d => d.id === id);
  
  if (!deployment) {
    notFound();
  }

  return (
    <PageLayout title={`Deployment - ${deployment.appName}`} currentApp="deployments">
      <DeploymentDetail deployment={deployment} />
    </PageLayout>
  );
}
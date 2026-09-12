'use client';

import { useState, useRef } from 'react';
import { PageLayout } from '@/components/shared/page-layout';
import { KYCTable } from '@/components/kyc/kyc-table';
import { mockKYCRecords } from '@/lib/mock-data';
import { KYCRecord } from '@/types/kyc';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { RBAC } from '@/lib/rbac';

export default function KYCPage() {
  const { currentUser, addAuditLog } = useAuth();
  const [records, setRecords] = useState<KYCRecord[]>(mockKYCRecords);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canImport = RBAC.hasPermission(currentUser.role, 'admin_access');

  const handleImportCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    
    const newRecords: KYCRecord[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (values.length === headers.length && values[0].trim()) {
        const newRecord: KYCRecord = {
          id: `kyc-${Date.now()}-${i}`,
          userId: `usr-${Date.now()}-${i}`,
          userName: `${values[0].trim()} ${values[1].trim()}`,
          email: values[2].trim(),
          riskScore: parseInt(values[6]) || 30,
          status: 'pending',
          submittedDate: new Date().toISOString(),
          documentType: values[5].trim() as 'passport' | 'drivers_license' | 'national_id',
          documentStatus: 'pending',
          country: values[4].trim(),
          priority: values[5].trim() === 'passport' ? 'high' : 'medium',
        };
        newRecords.push(newRecord);
      }
    }

    setRecords([...records, ...newRecords]);
    
    addAuditLog({
      userId: currentUser.id,
      userName: currentUser.name,
      role: currentUser.role,
      action: 'change_status',
      entityType: 'kyc',
      entityId: 'import-batch',
      entityName: 'CSV Import',
      details: `Imported ${newRecords.length} customer records from CSV`,
    });

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <PageLayout title="KYC Review Queue" currentApp="kyc">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <span className="text-sm text-gray-400">
              {records.filter(r => r.status === 'pending').length} pending
            </span>
            <span className="text-sm text-gray-400">
              {records.filter(r => r.status === 'reviewing').length} in review
            </span>
          </div>
          <div className="flex gap-2">
            {canImport && (
              <>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleImportCSV}
                  className="hidden"
                  id="csv-import"
                  ref={fileInputRef}
                />
                <Button 
                  onClick={handleImportClick}
                  className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                >
                  Import CSV
                </Button>
              </>
            )}
            <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white">
              <option>All Status</option>
              <option>Pending</option>
              <option>Reviewing</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
            <select className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white">
              <option>All Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
        <KYCTable records={records} />
      </div>
    </PageLayout>
  );
}
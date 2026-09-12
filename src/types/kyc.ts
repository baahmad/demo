export interface KYCRecord {
  id: string;
  userId: string;
  userName: string;
  email: string;
  riskScore: number;
  status: 'pending' | 'approved' | 'rejected' | 'reviewing';
  submittedDate: string;
  documentType: 'passport' | 'drivers_license' | 'national_id';
  documentStatus: 'verified' | 'pending' | 'rejected';
  country: string;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface DocumentSection {
  id: string;
  title: string;
  pageNumber: number;
  description: string;
}
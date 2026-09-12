'use client';

import { useState, useRef } from 'react';
import { DocumentSection } from '@/types/kyc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PDFViewerProps {
  sections: DocumentSection[];
}

export function PDFViewer({ sections }: PDFViewerProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSectionClick = (index: number) => {
    setCurrentSection(index);
    setIsAnimating(true);
    
    // Scroll to the section
    setTimeout(() => {
      const sectionElement = sectionRefs.current[index];
      if (sectionElement && containerRef.current) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Highlight the section
        sectionElement.classList.add('ring-4', 'ring-emerald-400', 'ring-opacity-50');
        setTimeout(() => {
          sectionElement.classList.remove('ring-4', 'ring-emerald-400', 'ring-opacity-50');
        }, 2000);
      }
      setIsAnimating(false);
    }, 100);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gray-900/50 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Document Viewer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {/* Section Navigation */}
            <div className="w-64 space-y-2 flex-shrink-0">
              <h3 className="font-semibold text-sm text-gray-300 mb-3">Quick Navigation</h3>
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(index)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                    currentSection === index
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-medium ring-2 ring-emerald-500/50 transform scale-105'
                      : 'bg-gray-800/50 hover:bg-gray-800 text-gray-400 border border-gray-700'
                  }`}
                >
                  <div className="font-medium">{section.title}</div>
                  <div className="text-xs text-gray-500">Page {section.pageNumber}</div>
                </button>
              ))}
            </div>

            {/* PDF Content Area - Scrollable */}
            <div className="flex-1">
              <div 
                ref={containerRef}
                className="bg-gray-700/30 rounded-lg p-6 min-h-[600px] max-h-[700px] overflow-y-auto transition-all duration-500"
              >
                <div className="bg-gray-100 rounded shadow-2xl w-full max-w-2xl mx-auto relative overflow-hidden space-y-8 pb-8">
                  {/* Scan artifacts overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-transparent to-gray-900"></div>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] opacity-30"></div>
                  </div>
                  
                  {/* Document content - All pages */}
                  <div className="p-8 relative">
                    {/* Document Header */}
                    <div className="border-b-2 border-gray-300 pb-4 mb-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Official Document</div>
                          <div className="text-lg font-bold text-gray-800">Know Your Customer Application</div>
                          <div className="text-sm text-gray-600">Ref: KYC-2024-001234</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Date</div>
                          <div className="text-sm font-medium text-gray-700">January 15, 2024</div>
                        </div>
                      </div>
                    </div>

                    {/* Watermark */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 opacity-5 pointer-events-none">
                      <div className="text-6xl font-bold text-gray-400 border-4 border-gray-400 px-8 py-4">DRAFT</div>
                    </div>

                    <div className="space-y-6 relative">
                      {/* Section 1 */}
                      <div 
                        ref={(el) => { sectionRefs.current[0] = el; }}
                        className="pt-4"
                      >
                        <h4 className="font-bold text-base mb-4 text-gray-800 border-b border-gray-300 pb-2">1. Personal Information</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Full Name:</span>
                            <span className="text-gray-800 font-semibold">Sarah Chen Mei Ling</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Date of Birth:</span>
                            <span className="text-gray-800 font-semibold">15 March 1990</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Nationality:</span>
                            <span className="text-gray-800 font-semibold">Singaporean</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Gender:</span>
                            <span className="text-gray-800 font-semibold">Female</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Marital Status:</span>
                            <span className="text-gray-800 font-semibold">Single</span>
                          </div>
                        </div>
                      </div>

                      {/* Additional Section - Employment */}
                      <div className="pt-4">
                        <h4 className="font-bold text-base mb-4 text-gray-800 border-b border-gray-300 pb-2">Employment Information</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Employment Status:</span>
                            <span className="text-gray-800 font-semibold">Employed</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Occupation:</span>
                            <span className="text-gray-800 font-semibold">Software Engineer</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Employer:</span>
                            <span className="text-gray-800 font-semibold">TechCorp Singapore Pte Ltd</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Annual Income:</span>
                            <span className="text-gray-800 font-semibold">SGD 120,000</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Employment Duration:</span>
                            <span className="text-gray-800 font-semibold">3 years</span>
                          </div>
                        </div>
                      </div>

                      {/* Additional Section - Financial */}
                      <div className="pt-4">
                        <h4 className="font-bold text-base mb-4 text-gray-800 border-b border-gray-300 pb-2">Financial Information</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Source of Funds:</span>
                            <span className="text-gray-800 font-semibold">Employment Income</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Account Type:</span>
                            <span className="text-gray-800 font-semibold">Individual Savings</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Purpose of Account:</span>
                            <span className="text-gray-800 font-semibold">Personal Savings & Investment</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Expected Monthly Transactions:</span>
                            <span className="text-gray-800 font-semibold">20-30</span>
                          </div>
                        </div>
                      </div>

                      {/* Additional Section - Tax */}
                      <div className="pt-4">
                        <h4 className="font-bold text-base mb-4 text-gray-800 border-b border-gray-300 pb-2">Tax Information</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Tax Residence:</span>
                            <span className="text-gray-800 font-semibold">Singapore</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Tax ID Number:</span>
                            <span className="text-gray-800 font-semibold">S1234567G</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">FATCA Status:</span>
                            <span className="text-gray-800 font-semibold">Not a US Person</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">CRS Status:</span>
                            <span className="text-gray-800 font-semibold">Reportable</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Section 2 */}
                      <div 
                        ref={(el) => { sectionRefs.current[1] = el; }}
                        className="pt-4"
                      >
                        <h4 className="font-bold text-base mb-4 text-gray-800 border-b border-gray-300 pb-2">2. Address Verification</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Street Address:</span>
                            <span className="text-gray-800 font-semibold">123 Orchard Road, #15-08</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">City:</span>
                            <span className="text-gray-800 font-semibold">Singapore</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Postal Code:</span>
                            <span className="text-gray-800 font-semibold">238874</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Country:</span>
                            <span className="text-gray-800 font-semibold">Singapore</span>
                          </div>
                          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300 rounded text-xs text-yellow-800">
                            <div className="font-semibold mb-1">Proof of Address Submitted:</div>
                            <div>• Utility Bill (SP Power) - Verified ✓</div>
                            <div>• Bank Statement - Verified ✓</div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Section - Contact */}
                      <div className="pt-4">
                        <h4 className="font-bold text-base mb-4 text-gray-800 border-b border-gray-300 pb-2">Contact Information</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Primary Phone:</span>
                            <span className="text-gray-800 font-semibold">+65 8123 4567</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Secondary Phone:</span>
                            <span className="text-gray-800 font-semibold">+65 9876 5432</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Email Address:</span>
                            <span className="text-gray-800 font-semibold">sarah.chen@email.com</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Preferred Contact Method:</span>
                            <span className="text-gray-800 font-semibold">Email</span>
                          </div>
                        </div>
                      </div>

                      {/* Additional Section - Emergency */}
                      <div className="pt-4">
                        <h4 className="font-bold text-base mb-4 text-gray-800 border-b border-gray-300 pb-2">Emergency Contact</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Contact Name:</span>
                            <span className="text-gray-800 font-semibold">John Chen</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Relationship:</span>
                            <span className="text-gray-800 font-semibold">Brother</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Phone Number:</span>
                            <span className="text-gray-800 font-semibold">+65 8234 5678</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600 font-medium">Address:</span>
                            <span className="text-gray-800 font-semibold">456 Clementi Road, Singapore</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Section 3 */}
                      <div 
                        ref={(el) => { sectionRefs.current[2] = el; }}
                        className="pt-4"
                      >
                        <h4 className="font-bold text-base mb-4 text-gray-800 border-b border-gray-300 pb-2">3. Declaration & Signature</h4>
                        <div className="space-y-4 text-sm">
                          <div className="bg-gray-50 p-3 rounded border border-gray-300">
                            <div className="text-xs text-gray-600 mb-2">Declaration:</div>
                            <div className="text-gray-700 text-xs leading-relaxed">
                              I hereby declare that all information provided in this application is true and correct. I understand that any false statement may result in rejection of this application and potential legal action.
                            </div>
                          </div>
                          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                            <div>
                              <div className="text-gray-600 font-medium text-xs mb-1">Applicant Signature:</div>
                              <div className="w-48 h-12 border-b-2 border-gray-400 flex items-end justify-center">
                                <svg className="w-44 h-10 text-gray-700" viewBox="0 0 200 40" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M10,30 Q30,10 50,25 T90,20 T130,25 T170,15 T190,30" />
                                  <path d="M20,35 Q40,15 60,30 T100,25 T140,30 T180,20" opacity="0.6" />
                                </svg>
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-600 font-medium text-xs mb-1">Date:</div>
                              <div className="text-gray-800 font-semibold">15/01/2024</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-gray-600 font-medium text-xs mb-1">Photograph:</div>
                              <div className="w-20 h-24 bg-gray-300 rounded border-2 border-gray-400 flex items-center justify-center overflow-hidden">
                                <svg className="w-16 h-20 text-gray-500" viewBox="0 0 100 120" fill="currentColor">
                                  <ellipse cx="50" cy="35" rx="25" ry="28" />
                                  <path d="M10,120 Q50,70 90,120" />
                                </svg>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="inline-block p-2 bg-green-100 border border-green-400 rounded text-xs text-green-800">
                                ✓ Document Verified
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Page Footer */}
                    <div className="absolute bottom-4 left-8 right-8 flex justify-between items-center border-t border-gray-300 pt-3">
                      <div className="text-xs text-gray-500">Total Pages: 4</div>
                      <div className="text-xs text-gray-500">KYC-2024-001234</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { 
  ShieldCheckIcon, 
  UploadIcon,
  CheckIcon,
  ClockIcon,
  FileDownIcon,
  AlertCircleIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Compliance status - in a real app, this would come from the API
const complianceStatus = {
  kycStatus: "completed", // "completed", "pending", "required", "expired"
  kycLastVerified: new Date("2025-01-15"),
  kycExpiryDate: new Date("2026-01-15"),
  tierLevel: "Tier 2", // "Tier 1", "Tier 2", "Tier 3"
  tierDescription: "Enhanced verification with increased transaction limits",
  documentsRequired: [],
  documentsSubmitted: ["Passport", "Proof of Address", "Tax Declaration"],
  documentsVerified: ["Passport", "Proof of Address", "Tax Declaration"],
  highRiskActivities: false,
  nextReviewDate: new Date("2026-01-15")
};

export function ComplianceStatus() {
  // Format dates to readable format
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Get status indicator based on KYC status
  const getStatusIndicator = () => {
    switch (complianceStatus.kycStatus) {
      case 'completed':
        return (
          <div className="flex items-center text-black">
            <CheckIcon className="h-3 w-3 mr-1.5" />
            <span className="text-xs uppercase tracking-wide">Verified</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center text-black">
            <ClockIcon className="h-3 w-3 mr-1.5" />
            <span className="text-xs uppercase tracking-wide">Pending Review</span>
          </div>
        );
      case 'required':
      case 'expired':
        return (
          <div className="flex items-center text-black">
            <AlertCircleIcon className="h-3 w-3 mr-1.5" />
            <span className="text-xs uppercase tracking-wide">
              {complianceStatus.kycStatus === 'required' ? 'Verification Required' : 'Verification Expired'}
            </span>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-2.5 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-xs uppercase tracking-wide font-medium">Compliance Status</h3>
          <p className="text-[10px] text-gray-500 mt-0.5">Your account verification and KYC status</p>
        </div>
        <ShieldCheckIcon className="h-4 w-4 text-gray-700" />
      </div>
      
      <div className="p-3">
        <div className="mb-4 flex justify-between items-start">
          <div>
            <div className="text-[11px] uppercase tracking-wide font-medium mb-1">KYC Status</div>
            {getStatusIndicator()}
            <div className="text-[9px] text-gray-500 mt-0.5">
              {complianceStatus.kycStatus === 'completed' && 
                `Last verified: ${formatDate(complianceStatus.kycLastVerified)}`}
              {complianceStatus.kycStatus === 'completed' && 
                ` • Valid until: ${formatDate(complianceStatus.kycExpiryDate)}`}
            </div>
          </div>
          
          <div className="bg-black text-white px-2 py-1 text-[10px] font-medium">
            {complianceStatus.tierLevel}
          </div>
        </div>
        
        <div className="p-2.5 bg-gray-50 border border-gray-200 mb-4">
          <div className="text-[11px] uppercase tracking-wide font-medium mb-0.5">Current Tier</div>
          <div className="text-[10px] text-gray-600">{complianceStatus.tierDescription}</div>
        </div>
        
        <div className="mb-4">
          <div className="text-[11px] uppercase tracking-wide font-medium mb-1.5">Verified Documents</div>
          <ul className="space-y-1">
            {complianceStatus.documentsVerified.map((doc, index) => (
              <li key={index} className="flex items-center text-[11px]">
                <CheckIcon className="h-3 w-3 text-black mr-1.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {complianceStatus.documentsRequired.length > 0 && (
          <div className="mb-4">
            <div className="text-[11px] uppercase tracking-wide font-medium mb-1.5">Required Documents</div>
            <ul className="space-y-1">
              {complianceStatus.documentsRequired.map((doc, index) => (
                <li key={index} className="flex items-center text-[11px] text-black">
                  <AlertCircleIcon className="h-3 w-3 text-black mr-1.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-[10px] h-7 rounded-none border-black uppercase tracking-wide">
            <UploadIcon className="h-2.5 w-2.5 mr-1.5" />
            Upload Verification
          </Button>
          
          <Button variant="outline" size="sm" className="text-[10px] h-7 rounded-none border-black uppercase tracking-wide">
            <FileDownIcon className="h-2.5 w-2.5 mr-1.5" />
            Download Summary
          </Button>
        </div>
      </div>
      
      <div className="p-2.5 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-gray-500">Next review: {formatDate(complianceStatus.nextReviewDate)}</span>
          <Button variant="link" size="sm" className="text-[10px] text-black p-0 uppercase tracking-wide h-auto">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
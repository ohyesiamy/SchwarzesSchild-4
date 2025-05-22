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
          <div className="flex items-center text-green-600">
            <CheckIcon className="h-4 w-4 mr-2" />
            <span className="font-medium">Verified</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center text-amber-600">
            <ClockIcon className="h-4 w-4 mr-2" />
            <span className="font-medium">Pending Review</span>
          </div>
        );
      case 'required':
      case 'expired':
        return (
          <div className="flex items-center text-red-600">
            <AlertCircleIcon className="h-4 w-4 mr-2" />
            <span className="font-medium">
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
      <div className="p-6 border-b border-gray-200 flex items-center">
        <ShieldCheckIcon className="h-5 w-5 mr-3 text-gray-700" />
        <h3 className="text-lg font-medium">Your Compliance Status</h3>
      </div>
      
      <div className="p-6">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <div className="text-sm font-medium mb-1">KYC Status</div>
            {getStatusIndicator()}
            <div className="text-xs text-gray-500 mt-1">
              {complianceStatus.kycStatus === 'completed' && 
                `Last verified: ${formatDate(complianceStatus.kycLastVerified)}`}
              {complianceStatus.kycStatus === 'completed' && 
                ` • Valid until: ${formatDate(complianceStatus.kycExpiryDate)}`}
            </div>
          </div>
          
          <div className="bg-gray-900 text-white px-3 py-1.5 text-sm font-medium rounded-sm">
            {complianceStatus.tierLevel}
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 border border-gray-200 mb-6">
          <div className="text-sm font-medium mb-1">Current Verification Tier</div>
          <div className="text-sm text-gray-600">{complianceStatus.tierDescription}</div>
        </div>
        
        <div className="mb-6">
          <div className="text-sm font-medium mb-2">Verified Documents</div>
          <ul className="space-y-1.5">
            {complianceStatus.documentsVerified.map((doc, index) => (
              <li key={index} className="flex items-center text-sm">
                <CheckIcon className="h-4 w-4 text-green-600 mr-2" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {complianceStatus.documentsRequired.length > 0 && (
          <div className="mb-6">
            <div className="text-sm font-medium mb-2 text-red-600">Required Documents</div>
            <ul className="space-y-1.5">
              {complianceStatus.documentsRequired.map((doc, index) => (
                <li key={index} className="flex items-center text-sm text-red-600">
                  <AlertCircleIcon className="h-4 w-4 text-red-600 mr-2" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="text-xs">
            <UploadIcon className="h-3 w-3 mr-2" />
            Upload Verification
          </Button>
          
          <Button variant="outline" size="sm" className="text-xs">
            <FileDownIcon className="h-3 w-3 mr-2" />
            Download Verification Summary
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
        <div className="flex justify-between items-center">
          <span>Next compliance review: {formatDate(complianceStatus.nextReviewDate)}</span>
          <Button variant="link" size="sm" className="text-xs text-black p-0">
            Learn more about verification tiers
          </Button>
        </div>
      </div>
    </div>
  );
}
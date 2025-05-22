import { ShieldCheckIcon, BuildingIcon, TrendingUpIcon, LockIcon } from "lucide-react";

export function BankProfile() {
  return (
    <div className="bg-white border border-gray-200 p-8">
      <h3 className="text-xl font-semibold mb-6">About SCHWARZES SCHILD BANK</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <BuildingIcon className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium mb-1">Established</div>
            <div className="text-sm text-gray-600">Founded in Zürich, 2023</div>
          </div>
        </div>
        
        <div className="flex items-start">
          <ShieldCheckIcon className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium mb-1">Licensing</div>
            <div className="text-sm text-gray-600">Swiss FINMA Regulated</div>
          </div>
        </div>
        
        <div className="flex items-start">
          <LockIcon className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium mb-1">Security</div>
            <div className="text-sm text-gray-600">ISO/IEC 27001 Compliant | End-to-End Encrypted Infrastructure</div>
          </div>
        </div>
        
        <div className="flex items-start">
          <TrendingUpIcon className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium mb-1">Assets Under Management</div>
            <div className="text-sm text-gray-600">$1.4B AUM (as of Q1 2025)</div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm font-medium italic text-center">
          "Where Trust Is Sovereign."
        </p>
      </div>
    </div>
  );
}
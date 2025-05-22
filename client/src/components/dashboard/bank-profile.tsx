import { BookmarkIcon, ShieldIcon, AwardIcon } from "lucide-react";

export function BankProfile() {
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium">Schwarzes Schild Bank</h3>
      </div>
      <div className="p-6">
        <ul className="space-y-4 text-sm">
          <li className="flex items-start">
            <BookmarkIcon className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">Founded in Zürich</div>
              <div className="text-gray-600">Established 1928</div>
            </div>
          </li>
          
          <li className="flex items-start">
            <ShieldIcon className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">Swiss FINMA Regulated</div>
              <div className="text-gray-600">Highest regulatory standards</div>
            </div>
          </li>
          
          <li className="flex items-start">
            <AwardIcon className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">ISO 27001 Certified</div>
              <div className="text-gray-600">Global security compliance</div>
            </div>
          </li>
        </ul>
        
        <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-600 italic">
          Where Trust Is Sovereign
        </div>
      </div>
    </div>
  );
}
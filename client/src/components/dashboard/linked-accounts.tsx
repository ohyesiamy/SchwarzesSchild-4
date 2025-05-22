import { 
  LinkIcon, 
  PlusCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  ExternalLinkIcon,
  BuildingIcon,
  CoinsIcon,
  BarChart2Icon
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for linked accounts
const linkedAccountsData = [
  {
    id: 1,
    name: "Credit Suisse Savings",
    type: "bank",
    accountNumber: "CH93 0076 2011 6238 5295 7",
    status: "connected",
    lastSync: "Today at 10:15 AM"
  },
  {
    id: 2,
    name: "Vanguard Investment Portfolio",
    type: "investment",
    accountNumber: "PORT-872354",
    status: "connected",
    lastSync: "Yesterday at 4:30 PM"
  },
  {
    id: 3,
    name: "Bitcoin Wallet",
    type: "crypto",
    accountNumber: "bc1q84...j4ms2h",
    status: "pending",
    lastSync: "Pending approval"
  }
];

export function LinkedAccounts() {
  // Function to get the appropriate icon based on account type
  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'bank':
        return <BuildingIcon className="h-5 w-5 text-blue-600" />;
      case 'investment':
        return <BarChart2Icon className="h-5 w-5 text-green-600" />;
      case 'crypto':
        return <CoinsIcon className="h-5 w-5 text-amber-600" />;
      default:
        return <BuildingIcon className="h-5 w-5 text-blue-600" />;
    }
  };
  
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <LinkIcon className="h-5 w-5 mr-3 text-gray-700" />
          <h3 className="text-lg font-medium">External Accounts</h3>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          <PlusCircleIcon className="h-3 w-3 mr-2" />
          Link New Account
        </Button>
      </div>
      
      <div className="divide-y divide-gray-100">
        {linkedAccountsData.map((account) => (
          <div key={account.id} className="p-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1">{getAccountIcon(account.type)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium">{account.name}</h4>
                  <div className="flex items-center">
                    {account.status === "connected" ? (
                      <span className="flex items-center text-xs text-green-600">
                        <CheckCircleIcon className="h-3 w-3 mr-1" />
                        Connected
                      </span>
                    ) : (
                      <span className="flex items-center text-xs text-amber-600">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  <div className="mb-1">{account.accountNumber}</div>
                  <div className="text-xs text-gray-500">Last synced: {account.lastSync}</div>
                </div>
                
                <div className="flex space-x-3">
                  <Button variant="link" size="sm" className="text-xs p-0 h-auto text-black font-medium">
                    View Details
                    <ExternalLinkIcon className="h-3 w-3 ml-1" />
                  </Button>
                  
                  {account.status === "connected" && (
                    <Button variant="link" size="sm" className="text-xs p-0 h-auto text-gray-600 font-medium">
                      Refresh Data
                    </Button>
                  )}
                  
                  {account.status === "pending" && (
                    <Button variant="link" size="sm" className="text-xs p-0 h-auto text-gray-600 font-medium">
                      Check Status
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <span className="text-xs text-gray-500">Link external accounts to view balances and transactions in one place</span>
        <Button variant="link" size="sm" className="text-xs text-black p-0">
          Manage Connections
        </Button>
      </div>
    </div>
  );
}
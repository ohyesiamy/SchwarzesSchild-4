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
        return <BuildingIcon className="h-4 w-4 text-black" />;
      case 'investment':
        return <BarChart2Icon className="h-4 w-4 text-black" />;
      case 'crypto':
        return <CoinsIcon className="h-4 w-4 text-black" />;
      default:
        return <BuildingIcon className="h-4 w-4 text-black" />;
    }
  };
  
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-2.5 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-xs uppercase tracking-wide font-medium">External Accounts</h3>
          <p className="text-[10px] text-gray-500 mt-0.5">View accounts linked to your profile</p>
        </div>
        <Button variant="outline" size="sm" className="text-[10px] h-7 rounded-none border-black uppercase tracking-wide">
          <PlusCircleIcon className="h-2.5 w-2.5 mr-1.5" />
          Link Account
        </Button>
      </div>
      
      <div className="divide-y divide-gray-100">
        {linkedAccountsData.map((account) => (
          <div key={account.id} className="p-3">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">{getAccountIcon(account.type)}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-xs font-medium">{account.name}</h4>
                  <div className="flex items-center">
                    {account.status === "connected" ? (
                      <span className="flex items-center text-[9px] text-black">
                        <CheckCircleIcon className="h-2.5 w-2.5 mr-0.5" />
                        Connected
                      </span>
                    ) : (
                      <span className="flex items-center text-[9px] text-gray-700">
                        <ClockIcon className="h-2.5 w-2.5 mr-0.5" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-[11px] text-gray-600 mb-2">
                  <div className="mb-0.5">{account.accountNumber}</div>
                  <div className="text-[9px] text-gray-500">Last synced: {account.lastSync}</div>
                </div>
                
                <div className="flex space-x-3">
                  <Button variant="link" size="sm" className="text-[10px] p-0 h-auto text-black font-medium uppercase tracking-wide">
                    View Details
                    <ExternalLinkIcon className="h-2.5 w-2.5 ml-1" />
                  </Button>
                  
                  {account.status === "connected" && (
                    <Button variant="link" size="sm" className="text-[10px] p-0 h-auto text-gray-600 font-medium uppercase tracking-wide">
                      Refresh
                    </Button>
                  )}
                  
                  {account.status === "pending" && (
                    <Button variant="link" size="sm" className="text-[10px] p-0 h-auto text-gray-600 font-medium uppercase tracking-wide">
                      Check Status
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-2.5 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <span className="text-[9px] text-gray-500">Link external accounts to view balances and transactions in one place</span>
        <Button variant="link" size="sm" className="text-[10px] p-0 h-auto text-black uppercase tracking-wide">
          Manage
        </Button>
      </div>
    </div>
  );
}
import { 
  TrendingUpIcon, 
  TrendingDownIcon,
  BarChart3Icon,
  AlertCircleIcon 
} from "lucide-react";

// Mock investment data
const investments = [
  {
    name: "Active Managed Funds",
    value: 485600,
    change: 3.2,
    trend: "up"
  },
  {
    name: "Passive ETFs",
    value: 325450,
    change: 1.8,
    trend: "up"
  },
  {
    name: "Fixed Income Bonds",
    value: 156700,
    change: -0.5,
    trend: "down"
  },
  {
    name: "Private Equity",
    value: 98500,
    change: 4.7,
    trend: "up"
  }
];

export function InvestmentOverview() {
  const totalValue = investments.reduce((total, investment) => total + investment.value, 0);
  
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium">Investment Overview</h3>
        <BarChart3Icon className="h-5 w-5 text-gray-500" />
      </div>
      
      <div className="divide-y divide-gray-100">
        {investments.map((investment, index) => (
          <div key={index} className="p-6 flex justify-between items-center">
            <div>
              <div className="font-medium">{investment.name}</div>
              <div className="text-sm text-gray-600">
                €{investment.value.toLocaleString()}
              </div>
            </div>
            
            <div className={`flex items-center ${
              investment.trend === "up" ? "text-green-700" : "text-red-700"
            }`}>
              {investment.trend === "up" ? (
                <TrendingUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDownIcon className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm">
                {investment.trend === "up" ? "+" : ""}{investment.change.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">Total Portfolio Value</div>
            <div className="text-xl font-semibold mt-1">€{totalValue.toLocaleString()}</div>
          </div>
          
          <div className="flex items-center text-blue-700 cursor-pointer hover:underline">
            <AlertCircleIcon className="h-4 w-4 mr-1" />
            <span className="text-sm">Get Professional Advice</span>
          </div>
        </div>
      </div>
    </div>
  );
}
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
      <div className="p-2.5 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-xs uppercase tracking-wide font-medium">Investment Overview</h3>
          <p className="text-[10px] text-gray-500 mt-0.5">Performance of investment categories</p>
        </div>
        <BarChart3Icon className="h-4 w-4 text-gray-500" />
      </div>
      
      <div className="divide-y divide-gray-100">
        {investments.map((investment, index) => (
          <div key={index} className="p-3 flex justify-between items-center">
            <div>
              <div className="text-xs font-medium">{investment.name}</div>
              <div className="text-[10px] text-gray-600">
                €{investment.value.toLocaleString()}
              </div>
            </div>
            
            <div className={`flex items-center ${
              investment.trend === "up" ? "text-black" : "text-black"
            }`}>
              {investment.trend === "up" ? (
                <TrendingUpIcon className="h-3 w-3 mr-0.5" />
              ) : (
                <TrendingDownIcon className="h-3 w-3 mr-0.5" />
              )}
              <span className="text-[10px]">
                {investment.trend === "up" ? "+" : ""}{investment.change.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-2.5 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-gray-500">Total Value</div>
            <div className="text-sm font-medium mt-0.5">€{totalValue.toLocaleString()}</div>
          </div>
          
          <div className="flex items-center text-black cursor-pointer hover:underline">
            <AlertCircleIcon className="h-3 w-3 mr-0.5" />
            <span className="text-[10px] uppercase tracking-wide">Get Advice</span>
          </div>
        </div>
      </div>
    </div>
  );
}
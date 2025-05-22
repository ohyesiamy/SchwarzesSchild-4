import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

// Mock market data - in a real application, this would come from an API
const marketData = [
  { 
    pair: "EUR/USD", 
    rate: 1.0928, 
    change: 0.05, 
    status: "up" 
  },
  { 
    pair: "EUR/GBP", 
    rate: 0.8582, 
    change: -0.03, 
    status: "down" 
  },
  { 
    pair: "EUR/CHF", 
    rate: 0.9650, 
    change: 0.02, 
    status: "up" 
  },
  { 
    pair: "EUR/JPY", 
    rate: 163.25, 
    change: -0.12, 
    status: "down" 
  },
];

export function MarketSnapshot() {
  return (
    <div className="bg-white border border-gray-200">
      <div className="divide-y divide-gray-200">
        {marketData.map((item, index) => (
          <div key={index} className="p-4 flex justify-between items-center">
            <div>
              <div className="font-medium">{item.pair}</div>
              <div className="text-sm text-gray-600">
                {item.rate.toFixed(4)}
              </div>
            </div>
            
            <div className={`flex items-center ${
              item.status === "up" ? "text-green-700" : "text-red-700"
            }`}>
              {item.status === "up" ? (
                <TrendingUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDownIcon className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm">
                {item.status === "up" ? "+" : ""}{item.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500">
          Market data as of {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
}
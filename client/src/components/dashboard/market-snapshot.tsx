import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

// Mock market data with exchange rates and price changes
const marketData = [
  { 
    pair: 'EUR/USD', 
    rate: 1.0926, 
    change: 0.0012, 
    sparkline: [1.091, 1.092, 1.0915, 1.093, 1.0925, 1.0926] 
  },
  { 
    pair: 'USD/JPY', 
    rate: 156.73, 
    change: -0.31, 
    sparkline: [157.1, 157.05, 156.9, 156.85, 156.78, 156.73] 
  },
  { 
    pair: 'GBP/USD', 
    rate: 1.2538, 
    change: 0.0032, 
    sparkline: [1.251, 1.252, 1.2515, 1.253, 1.2535, 1.2538] 
  },
  { 
    pair: 'BTC/USD', 
    rate: 67253.18, 
    change: 823.45, 
    sparkline: [66500, 66700, 66850, 67000, 67150, 67253.18] 
  }
];

export function MarketSnapshot() {
  // Simple function to render a basic sparkline using div heights
  const renderSparkline = (data: number[]) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    
    return (
      <div className="flex items-end h-8 gap-px">
        {data.map((value, index) => {
          const height = range === 0 ? 50 : ((value - min) / range) * 100;
          return (
            <div 
              key={index} 
              className="bg-gray-300 w-1"
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200">
      <div className="py-4 px-6 border-b border-gray-200">
        <h3 className="text-sm font-semibold">Market at a Glance</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {marketData.map((item) => (
          <div key={item.pair} className="py-3 px-6">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-sm">{item.pair}</span>
              <div className="flex items-center">
                <span className="text-sm font-medium">{item.rate.toFixed(item.pair.includes('BTC') ? 2 : 4)}</span>
                <span 
                  className={`ml-2 text-xs flex items-center ${
                    item.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.change >= 0 ? (
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(item.change).toFixed(item.pair.includes('BTC') ? 2 : 4)}
                </span>
              </div>
            </div>
            {renderSparkline(item.sparkline)}
          </div>
        ))}
      </div>
      
      <div className="py-3 px-6 border-t border-gray-200 text-xs text-gray-500">
        Last updated: {new Date().toLocaleString()}
      </div>
    </div>
  );
}
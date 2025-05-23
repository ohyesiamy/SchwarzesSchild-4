import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

// Sample portfolio data
const portfolioData = [
  { name: "Cash & Deposits", value: 35, color: "#000000" },
  { name: "Equities", value: 25, color: "#333333" },
  { name: "Fixed Income", value: 20, color: "#666666" },
  { name: "Alternative Investments", value: 15, color: "#999999" },
  { name: "Real Estate", value: 5, color: "#CCCCCC" },
];

export function PortfolioSummary() {
  const total = portfolioData.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-2.5 border-b border-gray-200">
        <h3 className="text-xs uppercase tracking-wide font-medium">Portfolio Allocation</h3>
        <p className="text-[10px] text-gray-500 mt-0.5">Asset allocation across investment categories</p>
      </div>
      
      <div className="p-3">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={1}
                dataKey="value"
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                formatter={(value, entry, index) => {
                  return (
                    <span className="text-[10px] font-medium text-gray-700">
                      {value} ({portfolioData[index].value}%)
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-3 grid grid-cols-1 gap-2">
          <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
            <div className="text-[11px] uppercase tracking-wide font-medium">Total Portfolio Value</div>
            <div className="text-xs font-medium">€2,458,690.00</div>
          </div>
          
          <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
            <div className="text-[11px] text-gray-600">Unrealized Gain/Loss</div>
            <div className="text-[11px] text-black font-medium">+€126,540.25 (+5.43%)</div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-2.5 border-t border-gray-200 flex justify-between items-center">
        <div className="text-[9px] text-gray-500">Last updated: {new Date().toLocaleDateString()}</div>
        <button className="text-[10px] font-medium text-black hover:underline uppercase tracking-wide">View Details</button>
      </div>
    </div>
  );
}
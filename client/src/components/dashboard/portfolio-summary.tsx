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
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium">Portfolio Allocation</h3>
      </div>
      
      <div className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
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
                    <span className="text-xs font-medium text-gray-700">
                      {value} ({portfolioData[index].value}%)
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-1 gap-3">
          <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm font-medium">Total Portfolio Value</div>
            <div className="font-semibold">€2,458,690.00</div>
          </div>
          
          <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
            <div className="text-sm text-gray-600">Unrealized Gain/Loss</div>
            <div className="text-green-600 font-medium">+€126,540.25 (+5.43%)</div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 border-t border-gray-200 text-xs flex justify-between">
        <div className="text-gray-500">Last updated: {new Date().toLocaleDateString()}</div>
        <button className="font-medium text-black hover:underline">View Details</button>
      </div>
    </div>
  );
}
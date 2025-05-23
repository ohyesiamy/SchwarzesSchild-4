import { 
  TrendingUpIcon, 
  GlobeIcon,
  NewspaperIcon,
  ExternalLinkIcon
} from "lucide-react";

// Market insights and analysis data
const marketInsights = [
  {
    id: 1,
    title: "European Markets Outlook Q2 2025",
    category: "Analysis",
    date: "April 18, 2025",
    summary: "Positive economic indicators in the Eurozone suggest a continued recovery, with corporate earnings exceeding expectations by 2.8%."
  },
  {
    id: 2,
    title: "Currency Volatility: Implications for Investors",
    category: "Research",
    date: "April 15, 2025",
    summary: "Our analysts examine the recent currency fluctuations and provide strategic considerations for cross-border investments."
  },
  {
    id: 3,
    title: "Swiss National Bank Policy Announcement",
    category: "News",
    date: "April 10, 2025",
    summary: "The latest SNB meeting resulted in maintaining the current interest rate policy with a focus on inflation control measures."
  }
];

export function MarketInsights() {
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-2.5 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-xs uppercase tracking-wide font-medium">Market Insights</h3>
          <p className="text-[10px] text-gray-500 mt-0.5">Expert analysis and financial forecasts</p>
        </div>
        <GlobeIcon className="h-4 w-4 text-gray-500" />
      </div>
      
      <div className="divide-y divide-gray-100">
        {marketInsights.map((insight) => (
          <div key={insight.id} className="p-4">
            <div className="flex justify-between items-start mb-1.5">
              <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 text-gray-700">
                {insight.category}
              </span>
              <span className="text-[10px] text-gray-500">{insight.date}</span>
            </div>
            
            <h4 className="text-xs font-medium mb-1.5">{insight.title}</h4>
            <p className="text-[11px] text-gray-600 mb-2.5 leading-tight">{insight.summary}</p>
            
            <div className="flex items-center text-black hover:underline cursor-pointer text-[10px] font-medium">
              <span className="mr-1">READ FULL ANALYSIS</span>
              <ExternalLinkIcon className="h-2.5 w-2.5" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-2.5 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center">
          <NewspaperIcon className="h-3 w-3 mr-1.5 text-gray-600" />
          <span className="text-[10px] text-gray-600">Provided by Schwarzes Schild Research</span>
        </div>
        
        <button className="text-[10px] font-medium text-black hover:underline uppercase tracking-wide">
          View All
        </button>
      </div>
    </div>
  );
}
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
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium">Market Insights</h3>
        <GlobeIcon className="h-5 w-5 text-gray-500" />
      </div>
      
      <div className="divide-y divide-gray-100">
        {marketInsights.map((insight) => (
          <div key={insight.id} className="p-6">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs bg-gray-100 px-2 py-1 text-gray-700">
                {insight.category}
              </span>
              <span className="text-xs text-gray-500">{insight.date}</span>
            </div>
            
            <h4 className="font-medium mb-2">{insight.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{insight.summary}</p>
            
            <div className="flex items-center text-black hover:underline cursor-pointer text-xs font-semibold">
              <span className="mr-1">READ FULL ANALYSIS</span>
              <ExternalLinkIcon className="h-3 w-3" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center text-sm">
          <NewspaperIcon className="h-4 w-4 mr-2 text-gray-600" />
          <span className="text-gray-600">Provided by Schwarzes Schild Research</span>
        </div>
        
        <button className="text-xs font-medium text-black hover:underline">
          VIEW ALL INSIGHTS
        </button>
      </div>
    </div>
  );
}
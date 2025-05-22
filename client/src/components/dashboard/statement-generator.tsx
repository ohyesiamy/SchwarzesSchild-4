import { useState } from "react";
import { 
  FileTextIcon, 
  DownloadIcon,
  CalendarIcon,
  CheckCircleIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock data for available statement months
const availableMonths = [
  { value: "2025-04", label: "April 2025" },
  { value: "2025-03", label: "March 2025" },
  { value: "2025-02", label: "February 2025" },
  { value: "2025-01", label: "January 2025" },
  { value: "2024-12", label: "December 2024" },
  { value: "2024-11", label: "November 2024" }
];

// Mock data for currencies
const availableCurrencies = [
  { value: "EUR", label: "Euro (EUR)" },
  { value: "USD", label: "US Dollar (USD)" },
  { value: "GBP", label: "British Pound (GBP)" },
  { value: "CHF", label: "Swiss Franc (CHF)" }
];

export function StatementGenerator() {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState("2025-04");
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleGenerateStatement = () => {
    setIsGenerating(true);
    
    // Simulate statement generation process
    setTimeout(() => {
      setIsGenerating(false);
      
      toast({
        title: "Statement generated successfully",
        description: `Your ${getMonthLabel(selectedMonth)} statement in ${getCurrencyLabel(selectedCurrency)} is ready to download.`,
        variant: "default",
        duration: 5000,
        action: (
          <div className="flex items-center">
            <CheckCircleIcon className="h-4 w-4 text-green-600 mr-1" />
          </div>
        )
      });
    }, 2000);
  };
  
  const getMonthLabel = (value: string) => {
    return availableMonths.find(month => month.value === value)?.label || value;
  };
  
  const getCurrencyLabel = (value: string) => {
    return availableCurrencies.find(currency => currency.value === value)?.label || value;
  };
  
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex items-center">
        <FileTextIcon className="h-5 w-5 mr-3 text-gray-700" />
        <h3 className="text-lg font-medium">Statement Generator</h3>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Select Month
            </label>
            <div className="relative">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full border border-gray-300 rounded-sm py-2 pl-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm"
              >
                {availableMonths.map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Select Currency
            </label>
            <div className="relative">
              <select 
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="w-full border border-gray-300 rounded-sm py-2 pl-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm"
              >
                {availableCurrencies.map(currency => (
                  <option key={currency.value} value={currency.value}>
                    {currency.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 text-sm">{selectedCurrency}</span>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleGenerateStatement}
            disabled={isGenerating}
            className="w-full bg-black text-white hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-black mt-2"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Download Monthly Statement
              </>
            )}
          </Button>
        </div>
        
        <div className="mt-4 text-xs text-gray-500">
          <p>Statements are generated as secure PDF documents and include transaction details, account summaries, and balance information.</p>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">Most recent statements are shown by default</span>
          <Button variant="link" size="sm" className="text-black p-0">
            Archive
          </Button>
        </div>
      </div>
    </div>
  );
}
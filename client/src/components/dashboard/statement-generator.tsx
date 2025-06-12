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

interface StatementGeneratorProps {
  onOpen?: () => void;
}

export function StatementGenerator({ onOpen }: StatementGeneratorProps) {
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
      <div className="p-2.5 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-xs uppercase tracking-wide font-medium">Statement Generator</h3>
          <p className="text-[10px] text-gray-500 mt-0.5">Generate and download account statements</p>
        </div>
        <FileTextIcon className="h-4 w-4 text-gray-700" />
      </div>
      
      <div className="p-3">
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-medium text-gray-700 mb-1 block uppercase tracking-wide">
              Select Month
            </label>
            <div className="relative">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full border border-gray-300 rounded-none py-1.5 pl-2 pr-10 appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-xs"
              >
                {availableMonths.map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <CalendarIcon className="h-3 w-3 text-gray-500" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-[11px] font-medium text-gray-700 mb-1 block uppercase tracking-wide">
              Select Currency
            </label>
            <div className="relative">
              <select 
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="w-full border border-gray-300 rounded-none py-1.5 pl-2 pr-10 appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-xs"
              >
                {availableCurrencies.map(currency => (
                  <option key={currency.value} value={currency.value}>
                    {currency.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 text-[10px]">{selectedCurrency}</span>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleGenerateStatement}
            disabled={isGenerating}
            className="w-full bg-black text-white hover:bg-gray-800 rounded-none h-8 text-xs uppercase tracking-wide mt-2"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <DownloadIcon className="h-3 w-3 mr-1.5" />
                Download Statement
              </>
            )}
          </Button>
        </div>
        
        <div className="mt-3 text-[9px] text-gray-500">
          <p>Statements are generated as secure PDF documents and include transaction details, account summaries, and balance information.</p>
        </div>
      </div>
      
      <div className="p-2.5 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center text-[9px]">
          <span className="text-gray-500">Most recent statements are shown by default</span>
          <Button variant="link" size="sm" className="text-black p-0 text-[10px] uppercase tracking-wide h-auto">
            Archive
          </Button>
        </div>
      </div>
    </div>
  );
}
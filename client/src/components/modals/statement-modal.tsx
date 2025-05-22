import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X, Download, Calendar, CheckCircle } from "lucide-react";

interface StatementModalProps {
  isOpen: boolean;
  onClose: () => void;
  account?: {
    id: number;
    name: string;
    currency: string;
    balance: number;
  };
}

export function StatementModal({ isOpen, onClose, account }: StatementModalProps) {
  const { toast } = useToast();
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [isGenerating, setIsGenerating] = useState(false);
  const [fileFormat, setFileFormat] = useState("pdf");

  // Available months for statements
  const availableMonths = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" }
  ];
  
  // Available years for statements
  const currentYear = new Date().getFullYear();
  const availableYears = [currentYear, currentYear - 1, currentYear - 2];

  const handleGenerateStatement = () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      
      toast({
        title: "Statement generated",
        description: `Your ${availableMonths[month].label} ${year} statement for ${account?.name || "Main Account"} has been generated.`,
      });
      
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-none shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            Download Statement
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
            <div className="p-3 bg-gray-50 border border-gray-200">
              <div className="font-medium">{account?.name || "Main Account"}</div>
              <div className="text-sm text-gray-600 mt-1">
                Balance: {account?.currency || '€'}{account?.balance?.toFixed(2) || '24,856.78'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
              <div className="relative">
                <select
                  value={month}
                  onChange={(e) => setMonth(parseInt(e.target.value))}
                  className="w-full p-3 pl-3 pr-8 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black appearance-none"
                >
                  {availableMonths.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
              >
                {availableYears.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  checked={fileFormat === "pdf"}
                  onChange={() => setFileFormat("pdf")}
                  className="mr-2"
                />
                <span>PDF</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={fileFormat === "csv"}
                  onChange={() => setFileFormat("csv")}
                  className="mr-2"
                />
                <span>CSV</span>
              </label>
            </div>
          </div>

          <Button 
            className="w-full bg-black text-white hover:bg-gray-800"
            onClick={handleGenerateStatement}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download Statement
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
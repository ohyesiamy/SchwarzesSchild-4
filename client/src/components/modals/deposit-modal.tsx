import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X, CreditCard, Building, ArrowDownToLine, Info, AlertCircle, CheckCircle } from "lucide-react";
import { CURRENCY_SYMBOLS } from "@/lib/constants";

interface DepositModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  account?: {
    id: number;
    name: string;
    currency: string;
    balance: number;
  };
  accounts?: {
    id: number;
    name: string;
    userId: number;
    currency: string;
    balance: number;
  }[];
}

type DepositMethod = "card" | "bank" | "swift";

export function DepositModal({ isOpen, onClose, open, onOpenChange, account, accounts }: DepositModalProps) {
  const effectiveIsOpen = open !== undefined ? open : isOpen || false;
  const effectiveOnClose = onOpenChange ? () => onOpenChange(false) : onClose || (() => {});
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<DepositMethod>("card");
  const [depositCompleted, setDepositCompleted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const depositMethods = [
    { id: "card", label: "Credit/Debit Card", icon: CreditCard, info: "Instant deposit with 2% processing fee" },
    { id: "bank", label: "Bank Transfer", icon: Building, info: "1-3 business days, no fee" },
    { id: "swift", label: "SWIFT Transfer", icon: ArrowDownToLine, info: "International transfer, 1-5 business days" }
  ];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric input and decimal point
    const value = e.target.value.replace(/[^\d.]/g, "");
    // Ensure only one decimal point
    const parts = value.split(".");
    if (parts.length > 2) {
      return;
    }
    // Limit to 2 decimal places
    if (parts.length > 1 && parts[1].length > 2) {
      return;
    }
    setAmount(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid deposit amount.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setDepositCompleted(true);
      setReferenceId(Math.random().toString(36).substring(2, 10).toUpperCase());
    }, 2000);
  };

  const handleClose = () => {
    // Reset state when closing
    setAmount("");
    setSelectedMethod("card");
    setDepositCompleted(false);
    setReferenceId("");
    effectiveOnClose();
  };

  if (!effectiveIsOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-none shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            {depositCompleted ? "Deposit Confirmed" : "Deposit Funds"}
          </h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-black transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {depositCompleted ? (
            <div className="text-center py-4">
              <div className="bg-green-50 p-4 rounded-none mb-6 inline-flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              
              <h3 className="text-lg font-medium mb-2">Deposit Initiated</h3>
              <p className="text-gray-600 mb-6">
                Your deposit request has been successfully received and is being processed.
              </p>
              
              <div className="bg-gray-50 p-4 border border-gray-200 text-left mb-6">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Amount:</div>
                  <div className="font-medium">{account?.currency || "EUR"} {parseFloat(amount).toFixed(2)}</div>
                  
                  <div className="text-gray-500">Deposit Method:</div>
                  <div className="font-medium">
                    {depositMethods.find(m => m.id === selectedMethod)?.label}
                  </div>
                  
                  <div className="text-gray-500">Reference ID:</div>
                  <div className="font-medium">{referenceId}</div>
                  
                  <div className="text-gray-500">Expected Completion:</div>
                  <div className="font-medium">
                    {selectedMethod === "card" ? "Immediate" : 
                     selectedMethod === "bank" ? "1-3 business days" : 
                     "1-5 business days"}
                  </div>
                </div>
              </div>
              
              <Button
                onClick={handleClose}
                className="bg-black text-white w-full"
              >
                Return to Dashboard
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination Account</label>
                <div className="p-3 bg-gray-50 border border-gray-200">
                  <div className="font-medium">{account?.name || "Main Account"}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Current Balance: {account?.currency || "EUR"} {account?.balance?.toFixed(2) || "24,856.78"}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Deposit Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">{CURRENCY_SYMBOLS[account?.currency || "EUR"]}</span>
                  </div>
                  <input
                    type="text"
                    id="amount"
                    className="pl-8 pr-4 py-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black w-full"
                    placeholder="0.00"
                    value={amount}
                    onChange={handleAmountChange}
                    required
                  />
                </div>
                {amount && parseFloat(amount) < 1 && (
                  <div className="mt-1 text-red-600 text-xs flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Minimum deposit amount is 1.00
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Deposit Method
                </label>
                <div className="space-y-2">
                  {depositMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div 
                        key={method.id}
                        className={`p-3 border cursor-pointer flex items-start ${
                          selectedMethod === method.id 
                            ? "border-black bg-gray-50" 
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedMethod(method.id as DepositMethod)}
                      >
                        <div className={`p-2 ${selectedMethod === method.id ? "bg-black" : "bg-gray-100"} mr-3`}>
                          <Icon 
                            className={`h-5 w-5 ${
                              selectedMethod === method.id ? "text-white" : "text-gray-500"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{method.label}</div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Info className="h-3 w-3 mr-1" />
                            {method.info}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 p-4 border border-gray-200 mb-6">
                <h4 className="font-medium text-sm mb-2">Important Information</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Deposits will be credited according to the selected method's processing time.</li>
                  <li>• Card deposits are subject to a 2% processing fee.</li>
                  <li>• Bank transfers should include your account number as reference.</li>
                  <li>• For SWIFT transfers, please use our SWIFT code: SSBKCHZZ.</li>
                </ul>
              </div>

              <Button 
                type="submit"
                className="w-full bg-black text-white"
                disabled={isProcessing || !amount || parseFloat(amount) <= 0}
              >
                {isProcessing ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2" />
                    Processing...
                  </>
                ) : (
                  "Confirm Deposit"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
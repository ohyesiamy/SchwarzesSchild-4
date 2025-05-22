import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  fromAccount?: {
    id: number;
    name: string;
    currency: string;
    balance: number;
  };
}

export function TransferModal({ isOpen, onClose, fromAccount }: TransferModalProps) {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [reference, setReference] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Confirmation, 3: Success

  // Mock recipient accounts
  const recipientAccounts = [
    { id: "acc-1", name: "James Wilson", accountNumber: "SS-8742-2025-9012" },
    { id: "acc-2", name: "Maria Garcia", accountNumber: "SS-5623-2025-4518" },
    { id: "acc-3", name: "Personal Savings", accountNumber: "SS-3201-2025-7845" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Move to confirmation
  };

  const handleConfirm = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3); // Success
    }, 1500);
  };

  const handleComplete = () => {
    toast({
      title: "Transfer successful",
      description: `${fromAccount?.currency || '€'}${amount} has been sent to ${
        recipientAccounts.find(acc => acc.id === recipient)?.name || recipient
      }.`,
    });
    // Reset and close
    setAmount("");
    setRecipient("");
    setReference("");
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-none shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            {step === 1 && "Transfer Funds"}
            {step === 2 && "Confirm Transfer"}
            {step === 3 && "Transfer Complete"}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
                <div className="p-3 bg-gray-50 border border-gray-200">
                  <div className="font-medium">{fromAccount?.name || "Main Account"}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Balance: {fromAccount?.currency || '€'}{fromAccount?.balance?.toFixed(2) || '24,856.78'}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                <select
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="">Select recipient</option>
                  {recipientAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.name} - {acc.accountNumber}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">{fromAccount?.currency || '€'}</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    required
                    className="w-full p-3 pl-8 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference (Optional)</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g., Rent payment"
                  className="w-full p-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}

          {step === 2 && (
            <div>
              <div className="p-4 bg-gray-50 border border-gray-200 mb-6">
                <h3 className="font-medium mb-3">Transfer Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">From:</span>
                    <span>{fromAccount?.name || "Main Account"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span>{recipientAccounts.find(acc => acc.id === recipient)?.name || recipient}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">{fromAccount?.currency || '€'}{amount}</span>
                  </div>
                  {reference && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reference:</span>
                      <span>{reference}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start mb-6 p-4 bg-amber-50 border border-amber-200">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700">
                  Please verify all details before confirming this transfer. This action cannot be reversed.
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button 
                  className="flex-1 bg-black text-white hover:bg-gray-800"
                  onClick={handleConfirm}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2" />
                      Processing...
                    </>
                  ) : "Confirm Transfer"}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Transfer Successful</h3>
              <p className="text-gray-600 mb-6">
                You have successfully transferred {fromAccount?.currency || '€'}{amount} to {recipientAccounts.find(acc => acc.id === recipient)?.name || recipient}.
              </p>
              <Button 
                className="w-full bg-black text-white hover:bg-gray-800"
                onClick={handleComplete}
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
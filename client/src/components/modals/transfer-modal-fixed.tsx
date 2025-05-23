import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X, ArrowRight } from "lucide-react";
import { TransferConfirmationModal } from "./transfer-confirmation-modal";

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
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock recipient accounts
  const recipientAccounts = [
    { id: "acc-1", name: "James Wilson", accountNumber: "SS-8742-2025-9012" },
    { id: "acc-2", name: "Maria Garcia", accountNumber: "SS-5623-2025-4518" },
    { id: "acc-3", name: "Personal Savings", accountNumber: "SS-3201-2025-7845" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmTransfer = () => {
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
    setShowConfirmation(false);
    onClose();
  };

  const getTransferData = () => {
    const selectedRecipient = recipientAccounts.find(acc => acc.id === recipient);
    return {
      type: "domestic",
      amount: parseFloat(amount),
      currency: fromAccount?.currency || "EUR",
      fromAccount: fromAccount?.name || "Main Account",
      toAccount: selectedRecipient?.accountNumber || "",
      recipient: selectedRecipient?.name || "",
      reference: reference,
      fees: 0, // No fees for domestic transfers
      processingTime: "This transfer will be processed immediately."
    };
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-none shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Transfer Funds</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-black transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
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
          </div>
        </div>
      </div>

      <TransferConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmTransfer}
        transferData={getTransferData()}
      />
    </>
  );
}
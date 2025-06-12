import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X, ArrowRight } from "lucide-react";
import { TransferConfirmationModal } from "./transfer-confirmation-modal";
import { useCreateTransaction } from "@/lib/api-hooks";
import { Account } from "@shared/schema";

interface TransferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accounts: Account[];
}

export function TransferModal({ open, onOpenChange, accounts }: TransferModalProps) {
  const { toast } = useToast();
  const createTransaction = useCreateTransaction();
  const [selectedAccountId, setSelectedAccountId] = useState<number>(accounts[0]?.id || 0);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [reference, setReference] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedAccount = accounts.find(acc => acc.id === selectedAccountId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedAccount) {
      toast({
        title: "Error",
        description: "Please select an account",
        variant: "destructive",
      });
      return;
    }

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    if (transferAmount > selectedAccount.balance) {
      toast({
        title: "Error",
        description: "Insufficient funds",
        variant: "destructive",
      });
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmTransfer = async () => {
    if (!selectedAccount || !selectedAccountId) return;
    
    setIsProcessing(true);
    try {
      // Create outgoing transaction
      await createTransaction.mutateAsync({
        accountId: selectedAccountId,
        name: `Transfer to ${recipient}`,
        amount: -parseFloat(amount),
        currency: selectedAccount.currency,
        category: "transfer",
      });

      toast({
        title: "Transfer successful",
        description: `${selectedAccount.currency} ${amount} has been sent to ${recipient}.`,
      });

      // Reset form
      setAmount("");
      setRecipient("");
      setReference("");
      setShowConfirmation(false);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Transfer failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getTransferData = () => {
    return {
      type: "domestic",
      amount: parseFloat(amount),
      currency: selectedAccount?.currency || "EUR",
      fromAccount: selectedAccount?.name || "Main Account",
      toAccount: recipient,
      recipient: recipient,
      reference: reference,
      fees: 0,
      processingTime: "This transfer will be processed immediately."
    };
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Transfer Funds</h2>
            <button 
              onClick={() => onOpenChange(false)}
              className="text-gray-500 hover:text-black transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
                <select
                  value={selectedAccountId}
                  onChange={(e) => setSelectedAccountId(Number(e.target.value))}
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={accounts.length === 0}
                >
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} - {account.currency} {account.balance.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter recipient name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {selectedAccount?.currency || '€'}
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 pl-12 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference (Optional)</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Payment reference"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={!amount || !recipient || isProcessing || accounts.length === 0}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <TransferConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmTransfer}
        transferData={getTransferData()}
        isProcessing={isProcessing}
      />
    </>
  );
}
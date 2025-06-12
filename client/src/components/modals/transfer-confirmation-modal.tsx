import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Shield, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface TransferConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transferData: {
    type: string;
    amount: number;
    currency: string;
    fromAccount: string;
    toAccount: string;
    recipient?: string;
    reference?: string;
    fees?: number;
    processingTime?: string;
  };
  isProcessing?: boolean;
}

export function TransferConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  transferData 
}: TransferConfirmationModalProps) {
  const [authCode, setAuthCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"review" | "auth" | "processing" | "complete">("review");

  const handleAuth = () => {
    if (authCode.length === 6) {
      setStep("processing");
      setIsProcessing(true);
      
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        setStep("complete");
        
        // Auto-close after success
        setTimeout(() => {
          onConfirm();
          setStep("review");
          setAuthCode("");
        }, 3000);
      }, 2000);
    }
  };

  const getTotalAmount = () => {
    return transferData.amount + (transferData.fees || 0);
  };

  const getTypeLabel = () => {
    switch (transferData.type) {
      case "domestic": return "Domestic Transfer";
      case "international": return "International Transfer";
      case "self": return "Internal Transfer";
      case "scheduled": return "Scheduled Transfer";
      default: return "Transfer";
    }
  };

  const getTypeIcon = () => {
    if (transferData.type === "international") {
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    }
    return <Shield className="h-4 w-4 text-green-600" />;
  };

  if (step === "processing") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md mx-auto bg-white border border-black">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-black border-t-transparent mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Processing Transfer</h3>
            <p className="text-sm text-gray-600">Please wait while we process your transaction...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (step === "complete") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md mx-auto bg-white border border-black">
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Transfer Successful</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your transfer of {formatCurrency(transferData.amount, transferData.currency)} has been processed successfully.
            </p>
            <Badge variant="outline" className="border-green-600 text-green-600">
              Transaction ID: TXN{Date.now().toString().slice(-8)}
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl mx-auto bg-white border border-black">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {getTypeIcon()}
            Confirm {getTypeLabel()}
          </DialogTitle>
        </DialogHeader>

        {step === "review" && (
          <div className="space-y-6">
            {/* Transfer Summary */}
            <div className="bg-gray-50 p-4 border border-gray-200">
              <h3 className="font-semibold mb-3">Transfer Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-xs text-gray-600">From Account</Label>
                  <p className="font-medium">{transferData.fromAccount}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-600">To Account</Label>
                  <p className="font-medium">{transferData.toAccount}</p>
                </div>
                {transferData.recipient && (
                  <div className="col-span-2">
                    <Label className="text-xs text-gray-600">Recipient</Label>
                    <p className="font-medium">{transferData.recipient}</p>
                  </div>
                )}
                {transferData.reference && (
                  <div className="col-span-2">
                    <Label className="text-xs text-gray-600">Reference</Label>
                    <p className="font-medium">{transferData.reference}</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Amount Breakdown */}
            <div className="space-y-3">
              <h3 className="font-semibold">Amount Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Transfer Amount</span>
                  <span className="font-medium">
                    {formatCurrency(transferData.amount, transferData.currency)}
                  </span>
                </div>
                {transferData.fees && transferData.fees > 0 && (
                  <div className="flex justify-between">
                    <span>Transfer Fee</span>
                    <span className="font-medium">
                      {formatCurrency(transferData.fees, transferData.currency)}
                    </span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>{formatCurrency(getTotalAmount(), transferData.currency)}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Processing Information */}
            <div className="bg-blue-50 p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Processing Information</span>
              </div>
              <p className="text-sm text-blue-700">
                {transferData.processingTime || "This transfer will be processed immediately."}
              </p>
            </div>

            {/* Security Notice */}
            <div className="bg-yellow-50 p-4 border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-900">Security Notice</span>
              </div>
              <p className="text-sm text-yellow-700">
                Once confirmed, this transfer cannot be cancelled. Please verify all details carefully.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1 border-black hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setStep("auth")}
                className="flex-1 bg-black text-white hover:bg-gray-800"
              >
                Proceed to Authorization
              </Button>
            </div>
          </div>
        )}

        {step === "auth" && (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Security Authorization Required</h3>
              <p className="text-sm text-gray-600">
                Enter the 6-digit code from your mobile banking app to authorize this transfer.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Authorization Code</Label>
                <Input
                  type="text"
                  maxLength={6}
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="text-center text-lg tracking-wider font-mono"
                />
              </div>

              <div className="bg-gray-50 p-4 border border-gray-200 text-sm">
                <p className="font-medium mb-2">Transfer Summary:</p>
                <p>{formatCurrency(transferData.amount, transferData.currency)} to {transferData.toAccount}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setStep("review")}
                className="flex-1 border-black hover:bg-gray-50"
              >
                Back
              </Button>
              <Button 
                onClick={handleAuth}
                disabled={authCode.length !== 6 || isProcessing}
                className="flex-1 bg-black text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {isProcessing ? "Authorizing..." : "Authorize Transfer"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
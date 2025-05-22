import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X, CreditCard, Lock, AlertCircle, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface CardManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Card {
  id: number;
  type: string;
  name: string;
  number: string;
  expiryDate: string;
  status: "active" | "frozen" | "locked";
  limits: {
    atm: number;
    pos: number;
    online: number;
  };
}

export function CardManagementModal({ isOpen, onClose }: CardManagementModalProps) {
  const { toast } = useToast();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [onlineTransactions, setOnlineTransactions] = useState(true);
  const [internationalTransactions, setInternationalTransactions] = useState(false);
  const [contactlessPayments, setContactlessPayments] = useState(true);
  
  // Mock card data
  const cards: Card[] = [
    {
      id: 1,
      type: "Debit",
      name: "Schwarzes Schild Debit",
      number: "4921 •••• •••• 3742",
      expiryDate: "08/28",
      status: "active",
      limits: {
        atm: 2000,
        pos: 5000,
        online: 3000
      }
    },
    {
      id: 2,
      type: "Credit",
      name: "Schwarzes Schild Platinum",
      number: "5382 •••• •••• 9153",
      expiryDate: "12/26",
      status: "active",
      limits: {
        atm: 3000,
        pos: 10000,
        online: 5000
      }
    }
  ];

  const handleFreezeCard = () => {
    if (!selectedCard) return;
    
    toast({
      title: "Card frozen",
      description: "Your card has been temporarily frozen. No transactions will be authorized until you unfreeze it.",
    });
    
    // In a real app, this would update the card status on the server
    setSelectedCard({
      ...selectedCard,
      status: selectedCard.status === "frozen" ? "active" : "frozen"
    });
  };

  const handleReportLost = () => {
    if (!selectedCard) return;
    
    toast({
      title: "Card reported lost",
      description: "Your card has been permanently locked. A replacement card will be sent to your address.",
    });
    
    // In a real app, this would update the card status on the server
    setSelectedCard({
      ...selectedCard,
      status: "locked"
    });
  };

  const formatCardNumber = (number: string) => {
    if (showCardNumber) {
      // For demo purposes, we'll show a fake full number
      return number.replace("••••", "1234").replace("••••", "5678");
    }
    return number;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-none shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Card Management</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {!selectedCard ? (
            <>
              <h3 className="font-medium mb-4">Select a card to manage</h3>
              <div className="space-y-4">
                {cards.map((card) => (
                  <div 
                    key={card.id}
                    className="border border-gray-200 p-4 hover:border-black transition-colors cursor-pointer"
                    onClick={() => setSelectedCard(card)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{card.name}</div>
                        <div className="text-sm text-gray-600 mt-1">{card.number}</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-medium bg-black text-white px-2 py-0.5 mb-1">{card.type}</span>
                        <span className="text-xs text-gray-600">Expires: {card.expiryDate}</span>
                      </div>
                    </div>
                    
                    {card.status !== "active" && (
                      <div className={`mt-2 text-xs ${
                        card.status === "frozen" ? "text-blue-600" : "text-red-600"
                      } flex items-center`}>
                        <Lock className="h-3 w-3 mr-1" />
                        {card.status === "frozen" ? "Temporarily frozen" : "Permanently locked"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="bg-black text-white p-6 mb-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-xs text-gray-300 mb-1">{selectedCard.type} Card</div>
                    <div className="text-lg font-medium">{selectedCard.name}</div>
                  </div>
                  <CreditCard className="h-8 w-8" />
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs text-gray-300 mb-1">Card Number</div>
                    <div className="font-mono tracking-wider flex items-center">
                      {formatCardNumber(selectedCard.number)}
                      <button 
                        onClick={() => setShowCardNumber(!showCardNumber)}
                        className="ml-2 text-gray-300 hover:text-white"
                      >
                        {showCardNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-300 mb-1">Expires</div>
                    <div>{selectedCard.expiryDate}</div>
                  </div>
                </div>
              </div>
              
              {selectedCard.status === "locked" ? (
                <div className="bg-red-50 border border-red-200 p-4 mb-6">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">Card Permanently Locked</h4>
                      <p className="text-sm text-red-700 mt-1">This card has been reported lost or stolen and is permanently locked. A replacement card will be sent to your address.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="border border-gray-200 p-4 mb-6">
                    <h4 className="font-medium mb-3">Card Status</h4>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {selectedCard.status === "frozen" ? (
                          <Lock className="h-5 w-5 text-blue-600 mr-2" />
                        ) : (
                          <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                        )}
                        <span className={selectedCard.status === "frozen" ? "text-blue-600" : "text-green-600"}>
                          {selectedCard.status === "frozen" ? "Temporarily Frozen" : "Active"}
                        </span>
                      </div>
                      <Button 
                        variant={selectedCard.status === "frozen" ? "outline" : "default"}
                        size="sm"
                        className={selectedCard.status === "frozen" ? "text-xs" : "text-xs bg-black text-white hover:bg-gray-800"}
                        onClick={handleFreezeCard}
                      >
                        {selectedCard.status === "frozen" ? "UNFREEZE CARD" : "FREEZE CARD"}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-600">
                      {selectedCard.status === "frozen" 
                        ? "Your card is currently frozen. No transactions will be authorized."
                        : "Your card is active and can be used for transactions."}
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 p-4 mb-6">
                    <h4 className="font-medium mb-3">Card Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">Online Transactions</div>
                          <div className="text-xs text-gray-600">Allow purchases on websites and apps</div>
                        </div>
                        <Switch 
                          checked={onlineTransactions} 
                          onCheckedChange={setOnlineTransactions}
                          className="data-[state=checked]:bg-black"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">International Transactions</div>
                          <div className="text-xs text-gray-600">Allow purchases outside your country</div>
                        </div>
                        <Switch 
                          checked={internationalTransactions} 
                          onCheckedChange={setInternationalTransactions}
                          className="data-[state=checked]:bg-black"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">Contactless Payments</div>
                          <div className="text-xs text-gray-600">Allow tap-to-pay transactions</div>
                        </div>
                        <Switch 
                          checked={contactlessPayments} 
                          onCheckedChange={setContactlessPayments}
                          className="data-[state=checked]:bg-black"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              <div className="flex justify-between gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setSelectedCard(null)}
                >
                  Back to Cards
                </Button>
                
                {selectedCard.status !== "locked" && (
                  <Button 
                    variant="outline"
                    className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
                    onClick={handleReportLost}
                  >
                    Report Lost/Stolen
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
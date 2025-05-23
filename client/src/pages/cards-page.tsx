import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { VirtualCard } from "@/components/account/virtual-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle, 
  CreditCard, 
  Clock, 
  Shield, 
  Lock, 
  Eye, 
  EyeOff,
  RefreshCw,
  PlusCircle,
  List,
  Settings,
  Lock as LockIcon,
  MapPin,
  Info,
  ChevronRight,
  Plus,
  AlignLeft,
  ChevronsDown,
  History
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CardData {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cardType: "VISA" | "MASTERCARD";
  cardName: string;
  isFrozen: boolean;
  isBlocked: boolean;
  lastUsed?: string;
  spendingLimits: {
    daily: number;
    monthly: number;
    online: number;
  };
  currency: string;
}

export default function CardsPage() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showNewCardModal, setShowNewCardModal] = useState(false);
  const [newCardName, setNewCardName] = useState("");
  const [newCardCurrency, setNewCardCurrency] = useState("EUR - Euro");
  const [newCardType, setNewCardType] = useState("debit");
  const [newCardDelivery, setNewCardDelivery] = useState("virtual");
  const [showConfirmLockModal, setShowConfirmLockModal] = useState(false);
  const [currentCardLimitTab, setCurrentCardLimitTab] = useState("daily");
  const [spendingLimits, setSpendingLimits] = useState({
    daily: "1000",
    monthly: "5000",
    online: "500"
  });
  
  // Sample card data
  const [cards, setCards] = useState<CardData[]>([
    {
      id: "card-1",
      cardNumber: "**** **** **** 4256",
      expiryDate: "12/25",
      cardType: "VISA",
      cardName: "Personal Debit Card",
      isFrozen: false,
      isBlocked: false,
      lastUsed: "Zürich, Switzerland • 2 hours ago",
      spendingLimits: {
        daily: 1000,
        monthly: 5000,
        online: 500
      },
      currency: "EUR"
    },
    {
      id: "card-2",
      cardNumber: "**** **** **** 7891",
      expiryDate: "09/26",
      cardType: "MASTERCARD",
      cardName: "Business Travel",
      isFrozen: false,
      isBlocked: false,
      lastUsed: "Geneva, Switzerland • Yesterday",
      spendingLimits: {
        daily: 2000,
        monthly: 10000,
        online: 1000
      },
      currency: "USD"
    }
  ]);
  
  // Recent security activities
  const securityActivities = [
    { action: "Card viewed", timestamp: "Today, 14:32", location: "Zürich, Switzerland" },
    { action: "PIN requested", timestamp: "May 21, 2025", location: "Zürich, Switzerland" },
    { action: "Spending limit changed", timestamp: "May 19, 2025", location: "Zürich, Switzerland" }
  ];
  
  const handleToggleFreeze = (cardId: string) => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setCards(cards.map(card => 
        card.id === cardId ? {...card, isFrozen: !card.isFrozen} : card
      ));
      setIsProcessing(false);
      
      const targetCard = cards.find(card => card.id === cardId);
      toast({
        title: targetCard?.isFrozen ? "Card Unfrozen" : "Card Frozen",
        description: targetCard?.isFrozen 
          ? "Your card has been successfully unfrozen and is now active." 
          : "Your card has been frozen. All transactions will be declined.",
      });
    }, 1000);
  };
  
  const handleLockCard = (cardId: string) => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setCards(cards.map(card => 
        card.id === cardId ? {...card, isBlocked: true} : card
      ));
      setIsProcessing(false);
      setShowConfirmLockModal(false);
      
      toast({
        title: "Card Permanently Locked",
        description: "Your card has been permanently locked. Please contact support for a replacement.",
        variant: "destructive"
      });
    }, 1500);
  };
  
  const handleCreateNewCard = () => {
    setIsProcessing(true);
    
    // Simulate API call  
    setTimeout(() => {
      const newCard: CardData = {
        id: `card-${cards.length + 1}`,
        cardNumber: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`,
        expiryDate: "05/28",
        cardType: Math.random() > 0.5 ? "VISA" : "MASTERCARD",
        cardName: newCardName || `${newCardType === "debit" ? "Debit" : "Credit"} Card`,
        isFrozen: false,
        isBlocked: false,
        lastUsed: undefined,
        spendingLimits: {
          daily: 1000,
          monthly: 5000,
          online: 500
        },
        currency: newCardCurrency.split(" - ")[0]
      };
      
      setCards([...cards, newCard]);
      setIsProcessing(false);
      setShowNewCardModal(false);
      setNewCardName("");
      
      toast({
        title: "New Card Created",
        description: `Your new ${newCardDelivery === "virtual" ? "virtual" : "physical"} card has been generated successfully.`,
      });
    }, 2000);
  };
  
  const handleUpdateLimit = (cardId: string, limitType: string) => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setCards(cards.map(card => {
        if (card.id === cardId) {
          const updatedLimits = {...card.spendingLimits};
          if (limitType === "daily") updatedLimits.daily = parseFloat(spendingLimits.daily);
          if (limitType === "monthly") updatedLimits.monthly = parseFloat(spendingLimits.monthly);
          if (limitType === "online") updatedLimits.online = parseFloat(spendingLimits.online);
          
          return {...card, spendingLimits: updatedLimits};
        }
        return card;
      }));
      
      setIsProcessing(false);
      
      toast({
        title: "Spending Limit Updated",
        description: `Your ${limitType} spending limit has been updated successfully.`,
      });
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation active="cards" />
      
      <main className="py-8 px-4 container mx-auto flex-grow">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl mb-2 sm:mb-0">Card Management</h1>
          <Button 
            onClick={() => setShowNewCardModal(true)}
            className="bg-black text-white hover:bg-gray-800 transition-colors duration-150 ease-in-out flex items-center"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Card
          </Button>
        </div>
        
        <Separator className="mb-8" />
        
        {/* Active Cards Section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Active Cards</h2>
          
          <div className="space-y-10">
            {cards.map(card => (
              <div key={card.id} className="border border-black p-0">
                {/* Card Header */}
                <div className="flex items-center justify-between bg-gray-100 p-4 border-b border-black">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5" />
                    <h3 className="font-semibold">{card.cardName}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={card.isFrozen ? "outline" : "default"} className={card.isFrozen ? "border-gray-500 text-gray-500" : "bg-green-600 hover:bg-green-700"}>
                      {card.isFrozen ? "Frozen" : "Active"}
                    </Badge>
                    {card.isBlocked && (
                      <Badge variant="destructive">Blocked</Badge>
                    )}
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Card Display */}
                  <div>
                    <VirtualCard 
                      cardNumber={card.cardNumber}
                      expiryDate={card.expiryDate}
                      cardType={card.cardType}
                      cardName={card.cardName}
                      isFrozen={card.isFrozen}
                      isBlocked={card.isBlocked}
                      className="w-full mb-4 shadow-sm"
                    />
                    
                    {/* Last Activity */}
                    {card.lastUsed && !card.isBlocked && (
                      <div className="flex items-center text-sm text-gray-600 mt-2 space-x-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Last used: {card.lastUsed}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Card Details & Actions */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Card Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Card Number:</span>
                          <span className="font-medium">{card.cardNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expiry Date:</span>
                          <span className="font-medium">{card.expiryDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Card Network:</span>
                          <span className="font-medium">{card.cardType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Currency:</span>
                          <span className="font-medium">{card.currency}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Pin Code</h4>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full flex items-center justify-center border-black hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                            disabled={card.isBlocked}
                          >
                            {showPin ? (
                              <EyeOff className="h-4 w-4 mr-2" />
                            ) : (
                              <Eye className="h-4 w-4 mr-2" />
                            )}
                            Reveal PIN
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="flex items-center">
                              <Shield className="h-5 w-5 mr-2" />
                              Security Verification
                            </DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="mb-4">For your security, we need to verify your identity before revealing your PIN.</p>
                            <div className="bg-gray-50 p-4 mb-4 border border-gray-200">
                              <p className="text-sm text-gray-600">A verification code has been sent to your registered mobile number. Please enter it below.</p>
                            </div>
                            <Input 
                              type="text" 
                              placeholder="Enter 6-digit code"
                              className="text-center tracking-widest"
                            />
                          </div>
                          <DialogFooter>
                            <Button className="w-full bg-black text-white hover:bg-gray-800">
                              Verify Identity
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  
                  {/* Card Controls */}
                  <div className="space-y-4">
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Card Controls</h4>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <Button 
                        variant="outline"
                        className={`border-black flex items-center transition-colors duration-150 ease-in-out ${card.isFrozen ? 'bg-gray-50' : 'bg-white'}`}
                        onClick={() => handleToggleFreeze(card.id)}
                        disabled={card.isBlocked || isProcessing}
                      >
                        {isProcessing ? (
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <LockIcon className="h-4 w-4 mr-2" />
                        )}
                        {card.isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline"
                            className="border-black flex items-center bg-white hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                            disabled={card.isBlocked}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Spending Limits
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Set Spending Limits</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="daily" onValueChange={setCurrentCardLimitTab}>
                            <TabsList className="grid grid-cols-3 mb-4">
                              <TabsTrigger value="daily">Daily</TabsTrigger>
                              <TabsTrigger value="monthly">Monthly</TabsTrigger>
                              <TabsTrigger value="online">Online</TabsTrigger>
                            </TabsList>
                            <TabsContent value="daily" className="space-y-4">
                              <p className="text-sm text-gray-600">Set the maximum amount that can be spent in a single day.</p>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                  <span className="text-gray-500">{card.currency}</span>
                                </div>
                                <Input
                                  type="text"
                                  className="pl-10"
                                  placeholder="Daily limit"
                                  value={spendingLimits.daily}
                                  onChange={(e) => setSpendingLimits({...spendingLimits, daily: e.target.value})}
                                />
                              </div>
                              <p className="text-xs text-gray-500">Current limit: {card.currency} {card.spendingLimits.daily.toLocaleString()}</p>
                            </TabsContent>
                            <TabsContent value="monthly" className="space-y-4">
                              <p className="text-sm text-gray-600">Set the maximum amount that can be spent in a month.</p>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                  <span className="text-gray-500">{card.currency}</span>
                                </div>
                                <Input
                                  type="text"
                                  className="pl-10"
                                  placeholder="Monthly limit"
                                  value={spendingLimits.monthly}
                                  onChange={(e) => setSpendingLimits({...spendingLimits, monthly: e.target.value})}
                                />
                              </div>
                              <p className="text-xs text-gray-500">Current limit: {card.currency} {card.spendingLimits.monthly.toLocaleString()}</p>
                            </TabsContent>
                            <TabsContent value="online" className="space-y-4">
                              <p className="text-sm text-gray-600">Set the maximum amount that can be spent online.</p>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                  <span className="text-gray-500">{card.currency}</span>
                                </div>
                                <Input
                                  type="text"
                                  className="pl-10"
                                  placeholder="Online limit"
                                  value={spendingLimits.online}
                                  onChange={(e) => setSpendingLimits({...spendingLimits, online: e.target.value})}
                                />
                              </div>
                              <p className="text-xs text-gray-500">Current limit: {card.currency} {card.spendingLimits.online.toLocaleString()}</p>
                            </TabsContent>
                          </Tabs>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              className="border-black"
                              onClick={() => {
                                // Reset to current values
                                setSpendingLimits({
                                  daily: card.spendingLimits.daily.toString(),
                                  monthly: card.spendingLimits.monthly.toString(),
                                  online: card.spendingLimits.online.toString()
                                });
                              }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              className="bg-black text-white hover:bg-gray-800"
                              onClick={() => handleUpdateLimit(card.id, currentCardLimitTab)}
                              disabled={isProcessing}
                            >
                              {isProcessing ? (
                                <>
                                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                  Updating...
                                </>
                              ) : (
                                'Save Changes'
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline"
                        className="border-black flex items-center bg-white hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                        disabled={card.isBlocked}
                      >
                        <List className="h-4 w-4 mr-2" />
                        View Transactions
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="border-black flex items-center bg-white hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                        disabled={card.isBlocked}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Request Replacement
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="border-black flex items-center text-red-600 hover:bg-red-50 transition-colors duration-150 ease-in-out"
                        onClick={() => setShowConfirmLockModal(true)}
                        disabled={card.isBlocked}
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Lock Card Permanently
                      </Button>
                      
                      {/* Confirm Lock Card Modal */}
                      <Dialog open={showConfirmLockModal} onOpenChange={setShowConfirmLockModal}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-red-600 flex items-center">
                              <AlertTriangle className="h-5 w-5 mr-2" />
                              Permanently Lock Card
                            </DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <div className="bg-red-50 p-4 border border-red-100 mb-4">
                              <p className="text-sm text-red-800">
                                Warning: This action cannot be undone. Permanently locking your card will require you to request a new card.
                              </p>
                            </div>
                            <p>Are you sure you want to permanently lock this card?</p>
                          </div>
                          <DialogFooter className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              className="border-black"
                              onClick={() => setShowConfirmLockModal(false)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleLockCard(card.id)}
                              disabled={isProcessing}
                            >
                              {isProcessing ? (
                                <>
                                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                'Permanently Lock Card'
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Security Section */}
        <section className="mb-10">
          <div className="border border-black">
            <div className="bg-gray-100 p-4 border-b border-black flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <h2 className="text-xl font-semibold">Card Security</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Security Tips</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Never share your PIN or card details over phone, email, or SMS.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Monitor your transactions regularly and report any suspicious activity immediately.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Freeze your card immediately if lost or stolen.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Use biometric authentication for added security when available.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Set up transaction alerts to be notified of any purchase.</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recent Security Activities</h3>
                  <div className="space-y-4">
                    {securityActivities.map((activity, index) => (
                      <div key={index} className="flex items-start pb-3 border-b border-gray-100">
                        <History className="h-5 w-5 mr-3 text-gray-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-sm">{activity.action}</span>
                            <span className="ml-2 text-xs text-gray-500">{activity.timestamp}</span>
                          </div>
                          <span className="text-xs text-gray-600 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {activity.location}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* New Card Modal */}
        <Dialog open={showNewCardModal} onOpenChange={setShowNewCardModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <PlusCircle className="h-5 w-5 mr-2" />
                Issue New Card
              </DialogTitle>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div>
                <label className="block text-sm mb-1">Card Name (Optional)</label>
                <Input
                  type="text"
                  placeholder="e.g. Travel Card, Shopping Card"
                  value={newCardName}
                  onChange={(e) => setNewCardName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">Card Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={newCardType === "debit" ? "default" : "outline"}
                    className={`${newCardType === "debit" ? "bg-black text-white" : "border-black"}`}
                    onClick={() => setNewCardType("debit")}
                  >
                    Debit Card
                  </Button>
                  <Button
                    type="button"
                    variant={newCardType === "credit" ? "default" : "outline"}
                    className={`${newCardType === "credit" ? "bg-black text-white" : "border-black"}`}
                    onClick={() => setNewCardType("credit")}
                  >
                    Credit Card
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Currency</label>
                <Select 
                  value={newCardCurrency} 
                  onValueChange={setNewCardCurrency}
                >
                  <SelectTrigger className="w-full border-black">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR - Euro">EUR - Euro</SelectItem>
                    <SelectItem value="USD - US Dollar">USD - US Dollar</SelectItem>
                    <SelectItem value="GBP - British Pound">GBP - British Pound</SelectItem>
                    <SelectItem value="CHF - Swiss Franc">CHF - Swiss Franc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Delivery Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={newCardDelivery === "virtual" ? "default" : "outline"}
                    className={`${newCardDelivery === "virtual" ? "bg-black text-white" : "border-black"}`}
                    onClick={() => setNewCardDelivery("virtual")}
                  >
                    Virtual
                  </Button>
                  <Button
                    type="button"
                    variant={newCardDelivery === "physical" ? "default" : "outline"}
                    className={`${newCardDelivery === "physical" ? "bg-black text-white" : "border-black"}`}
                    onClick={() => setNewCardDelivery("physical")}
                  >
                    Physical
                  </Button>
                </div>
                {newCardDelivery === "physical" && (
                  <p className="text-xs text-gray-500 mt-1">
                    Physical cards will be delivered within 3-5 business days to your registered address.
                  </p>
                )}
              </div>
              
              <div className="bg-blue-50 p-3 border border-blue-100">
                <div className="flex items-start">
                  <Info className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700">
                    {newCardDelivery === "virtual" 
                      ? "Virtual cards can be used immediately for online purchases and digital wallets." 
                      : "There is a CHF 10 fee for physical card issuance which will be charged to your account."}
                  </p>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                className="border-black"
                onClick={() => setShowNewCardModal(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-black text-white hover:bg-gray-800"
                onClick={handleCreateNewCard}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Issue Card'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { VirtualCard } from "@/components/account/virtual-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CardsPage() {
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardCurrency, setCardCurrency] = useState("EUR - Euro");
  const [spendingLimit, setSpendingLimit] = useState("");
  
  const handleToggleFreeze = () => {
    setIsCardFrozen(!isCardFrozen);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation active="cards" />
      
      <main className="py-8 px-4 container mx-auto flex-grow">
        <h2 className="text-3xl font-playfair mb-6">Your Cards</h2>
        
        {/* Virtual Card */}
        <div className="mb-8">
          <VirtualCard 
            cardNumber="**** **** **** 4256"
            expiryDate="12/25"
            isFrozen={isCardFrozen}
          />
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button
              onClick={handleToggleFreeze}
              variant={isCardFrozen ? "default" : "outline"}
              className={`border-2 border-black p-4 text-center font-playfair ${
                isCardFrozen ? "bg-black text-white" : ""
              }`}
            >
              {isCardFrozen ? "UNFREEZE CARD" : "FREEZE CARD"}
            </Button>
            <Button
              variant="outline"
              className="border-2 border-black p-4 text-center font-playfair"
            >
              CARD DETAILS
            </Button>
          </div>
        </div>
        
        {/* Generate New Card */}
        <div>
          <h3 className="text-2xl font-playfair mb-4">Generate New Card</h3>
          <div className="border-2 border-black p-6 mb-4">
            <p className="mb-4">Create a new virtual card for online purchases or subscriptions.</p>
            <form>
              <div className="mb-4">
                <label className="block mb-2">Card Name (Optional)</label>
                <Input
                  type="text"
                  placeholder="e.g. Shopping, Subscriptions"
                  className="w-full border-2 border-black p-3 focus:outline-none"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2">Currency</label>
                <div className="relative">
                  <Select 
                    value={cardCurrency} 
                    onValueChange={setCardCurrency}
                  >
                    <SelectTrigger className="w-full appearance-none bg-white border-2 border-black p-3 pr-8 focus:outline-none">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR - Euro">EUR - Euro</SelectItem>
                      <SelectItem value="USD - US Dollar">USD - US Dollar</SelectItem>
                      <SelectItem value="GBP - British Pound">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block mb-2">Spending Limit (Optional)</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="0.00"
                    className="w-full border-2 border-black p-3 pl-8 focus:outline-none"
                    value={spendingLimit}
                    onChange={(e) => setSpendingLimit(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <span>€</span>
                  </div>
                </div>
              </div>
              
              <Button
                type="button"
                className="w-full bg-black text-white p-4 text-lg font-playfair"
              >
                GENERATE CARD
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

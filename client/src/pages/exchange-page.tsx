import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import { CURRENCY_SYMBOLS, MOCK_EXCHANGE_RATES } from "@/lib/constants";
import { calculateExchange, formatCurrency } from "@/lib/utils";

// Mock accounts data
const accounts = [
  { id: 1, currency: "EUR", balance: 24856.78 },
  { id: 2, currency: "USD", balance: 12342.50 },
  { id: 3, currency: "GBP", balance: 8761.35 },
];

// Mock exchange history
const exchangeHistory = [
  { 
    id: 1, 
    fromCurrency: "EUR", 
    toCurrency: "USD", 
    fromAmount: 1000.00, 
    toAmount: 1060.50, 
    rate: 1.0605, 
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
  },
  { 
    id: 2, 
    fromCurrency: "GBP", 
    toCurrency: "EUR", 
    fromAmount: 500.00, 
    toAmount: 582.70, 
    rate: 1.1654, 
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) 
  },
  { 
    id: 3, 
    fromCurrency: "EUR", 
    toCurrency: "GBP", 
    fromAmount: 2000.00, 
    toAmount: 1716.00, 
    rate: 0.8580, 
    date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000) 
  }
];

export default function ExchangePage() {
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [rate, setRate] = useState(0);
  
  // Update exchange rate when currencies change
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      const newRate = MOCK_EXCHANGE_RATES[fromCurrency]?.[toCurrency] || 0;
      setRate(newRate);
      
      // Update to amount if from amount exists
      if (fromAmount) {
        const calculated = calculateExchange(
          parseFloat(fromAmount),
          fromCurrency,
          toCurrency
        );
        setToAmount(calculated.toFixed(2));
      }
    }
  }, [fromCurrency, toCurrency, fromAmount]);
  
  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
    
    if (value && !isNaN(parseFloat(value))) {
      const calculated = calculateExchange(
        parseFloat(value),
        fromCurrency,
        toCurrency
      );
      setToAmount(calculated.toFixed(2));
    } else {
      setToAmount("");
    }
  };
  
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    // toAmount will be updated by the useEffect
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  // Find the available balance for the selected currency
  const availableBalance = accounts.find(
    account => account.currency === fromCurrency
  )?.balance || 0;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation active="exchange" />
      
      <main className="py-8 px-4 container mx-auto flex-grow">
        <h2 className="text-3xl font-playfair mb-6">Currency Exchange</h2>
        
        <div className="border-2 border-black p-6 mb-8">
          <form>
            <div className="mb-6">
              <label className="block mb-2 text-lg">From</label>
              <div className="flex">
                <div className="relative w-1/3 mr-4">
                  <Select 
                    value={fromCurrency} 
                    onValueChange={setFromCurrency}
                  >
                    <SelectTrigger className="w-full appearance-none bg-white border-2 border-black p-3 pr-8 focus:outline-none">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CHF">CHF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative w-2/3">
                  <Input
                    type="text"
                    placeholder="0.00"
                    className="w-full border-2 border-black p-3 focus:outline-none"
                    value={fromAmount}
                    onChange={handleFromAmountChange}
                  />
                </div>
              </div>
              <div className="mt-1 text-sm">
                Available: {formatCurrency(availableBalance, fromCurrency)}
              </div>
            </div>
            
            <div className="flex justify-center mb-6">
              <Button
                type="button"
                onClick={handleSwapCurrencies}
                variant="outline"
                className="border-2 border-black p-2 w-10 h-10 flex items-center justify-center"
              >
                <ArrowUpDown className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 text-lg">To</label>
              <div className="flex">
                <div className="relative w-1/3 mr-4">
                  <Select 
                    value={toCurrency} 
                    onValueChange={setToCurrency}
                  >
                    <SelectTrigger className="w-full appearance-none bg-white border-2 border-black p-3 pr-8 focus:outline-none">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CHF">CHF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative w-2/3">
                  <Input
                    type="text"
                    placeholder="0.00"
                    className="w-full border-2 border-black p-3 focus:outline-none"
                    value={toAmount}
                    readOnly
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 border-2 border-black mb-6">
              <div className="flex justify-between mb-2">
                <span>Exchange Rate</span>
                <span className="font-bold">
                  1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Fee</span>
                <span className="font-bold">0.0%</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-bold">Instant</span>
              </div>
            </div>
            
            <Button
              type="button"
              disabled={!fromAmount || parseFloat(fromAmount) <= 0 || parseFloat(fromAmount) > availableBalance}
              className="w-full bg-black text-white p-4 text-lg font-playfair"
            >
              EXCHANGE NOW
            </Button>
          </form>
        </div>
        
        <div>
          <h3 className="text-2xl font-playfair mb-4">Exchange History</h3>
          
          {exchangeHistory.map(exchange => (
            <div key={exchange.id} className="border-2 border-black p-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-playfair font-bold">
                    {exchange.fromCurrency} → {exchange.toCurrency}
                  </div>
                  <div className="text-sm">{formatDate(exchange.date)}</div>
                  <div className="text-sm">
                    Rate: 1 {exchange.fromCurrency} = {exchange.rate} {exchange.toCurrency}
                  </div>
                </div>
                <div>
                  <div className="font-playfair font-bold">
                    {formatCurrency(exchange.fromAmount * -1, exchange.fromCurrency)}
                  </div>
                  <div className="text-right">
                    {formatCurrency(exchange.toAmount, exchange.toCurrency)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowUpDown, 
  RefreshCw, 
  Wallet, 
  Shield, 
  ArrowRight, 
  Lock, 
  TrendingDown, 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Filter, 
  Info,
  AlertCircle
} from "lucide-react";
import { CURRENCY_SYMBOLS, MOCK_EXCHANGE_RATES } from "@/lib/constants";
import { calculateExchange, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Mock accounts data
const accounts = [
  { id: 1, currency: "EUR", balance: 24856.78 },
  { id: 2, currency: "USD", balance: 12342.50 },
  { id: 3, currency: "GBP", balance: 8761.35 },
];

// Market rate data
const marketRates = [
  { 
    fromCurrency: "USD", 
    toCurrency: "EUR", 
    rate: 0.9435, 
    trend: "up", 
    change: 0.23 
  },
  { 
    fromCurrency: "USD", 
    toCurrency: "GBP", 
    rate: 0.8135, 
    trend: "down", 
    change: 0.15 
  },
  { 
    fromCurrency: "EUR", 
    toCurrency: "GBP", 
    rate: 0.8580, 
    trend: "up", 
    change: 0.05 
  },
  { 
    fromCurrency: "EUR", 
    toCurrency: "USD", 
    rate: 1.0605, 
    trend: "down", 
    change: 0.12 
  },
  { 
    fromCurrency: "GBP", 
    toCurrency: "USD", 
    rate: 1.2295, 
    trend: "up", 
    change: 0.31 
  },
  { 
    fromCurrency: "GBP", 
    toCurrency: "EUR", 
    rate: 1.1654, 
    trend: "up", 
    change: 0.11 
  }
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
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: "completed"
  },
  { 
    id: 2, 
    fromCurrency: "GBP", 
    toCurrency: "EUR", 
    fromAmount: 500.00, 
    toAmount: 582.70, 
    rate: 1.1654, 
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    status: "completed"
  },
  { 
    id: 3, 
    fromCurrency: "EUR", 
    toCurrency: "GBP", 
    fromAmount: 2000.00, 
    toAmount: 1716.00, 
    rate: 0.8580, 
    date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
    status: "completed"
  },
  { 
    id: 4, 
    fromCurrency: "USD", 
    toCurrency: "EUR", 
    fromAmount: 3500.00, 
    toAmount: 3301.75, 
    rate: 0.9435, 
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "pending"
  }
];

export default function ExchangePage() {
  const { toast } = useToast();
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [rate, setRate] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPinVerification, setShowPinVerification] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [historyFilter, setHistoryFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [showAutoConvertModal, setShowAutoConvertModal] = useState(false);
  const [autoConvertThreshold, setAutoConvertThreshold] = useState("");
  const [autoConvertEnabled, setAutoConvertEnabled] = useState(false);
  
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
  
  const handleExchange = () => {
    // For amounts over 1000, show PIN verification
    if (parseFloat(fromAmount) > 1000) {
      setShowPinVerification(true);
    } else {
      setShowConfirmModal(true);
    }
  };
  
  const handleConfirmExchange = () => {
    setIsProcessing(true);
    setShowConfirmModal(false);
    setShowPinVerification(false);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Exchange Successful",
        description: `You have exchanged ${formatCurrency(parseFloat(fromAmount), fromCurrency)} to ${formatCurrency(parseFloat(toAmount), toCurrency)}.`,
      });
      
      // Reset form
      setFromAmount("");
      setToAmount("");
    }, 2000);
  };
  
  const handleVerifyPin = () => {
    if (pinCode.length === 6) {
      setShowPinVerification(false);
      setShowConfirmModal(true);
      setPinCode("");
    } else {
      toast({
        title: "Invalid PIN",
        description: "Please enter a valid 6-digit PIN.",
        variant: "destructive"
      });
    }
  };
  
  const handleSetupAutoConvert = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowAutoConvertModal(false);
      setAutoConvertEnabled(true);
      
      toast({
        title: "Auto-Convert Enabled",
        description: `Automatic conversion will occur when ${fromCurrency} balance exceeds ${formatCurrency(parseFloat(autoConvertThreshold), fromCurrency)}.`,
      });
    }, 1500);
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  // Find the available balance for the selected currency
  const availableBalance = accounts.find(
    account => account.currency === fromCurrency
  )?.balance || 0;
  
  // Filter exchange history
  const filteredHistory = exchangeHistory.filter(exchange => {
    // Filter by currency
    if (historyFilter !== "all" && 
        exchange.fromCurrency !== historyFilter && 
        exchange.toCurrency !== historyFilter) {
      return false;
    }
    
    // Filter by date range
    if (dateRange === "week") {
      return (Date.now() - exchange.date.getTime()) < 7 * 24 * 60 * 60 * 1000;
    } else if (dateRange === "month") {
      return (Date.now() - exchange.date.getTime()) < 30 * 24 * 60 * 60 * 1000;
    }
    
    return true;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation active="exchange" />
      <MobileNavigation active="exchange" />
      
      <main className="py-6 px-4 container mx-auto flex-grow mb-20 md:mb-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">SCHWARZES SCHILD BANK</p>
            <h1 className="text-2xl font-semibold mb-1">Currency Exchange</h1>
          </div>
        </div>
        
        <Separator className="mb-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Currency Exchange Module */}
          <div className="lg:col-span-2">
            <div className="border border-black mb-6 shadow-sm">
              <div className="bg-gray-100 p-3 border-b border-black flex items-center justify-between">
                <div className="flex items-center">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <h2 className="text-lg font-semibold">Convert Currencies</h2>
                </div>
                <div className="flex items-center text-xs">
                  <Shield className="h-3.5 w-3.5 mr-1" />
                  <span className="hidden sm:inline">FINMA Regulated</span>
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <form>
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium text-sm">From Currency</label>
                      <div className="text-xs flex items-center text-gray-600">
                        <Wallet className="h-3.5 w-3.5 mr-1" />
                        <span>Available: {formatCurrency(availableBalance, fromCurrency)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative w-full sm:w-1/3">
                        <Select 
                          value={fromCurrency} 
                          onValueChange={setFromCurrency}
                        >
                          <SelectTrigger className="w-full appearance-none bg-white border border-black rounded-none p-2.5 focus:ring-black">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="CHF">CHF - Swiss Franc</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="relative w-full sm:w-2/3">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500">{CURRENCY_SYMBOLS[fromCurrency] || fromCurrency}</span>
                        </div>
                        <Input
                          type="text"
                          placeholder="0.00"
                          className="w-full border border-black rounded-none p-2.5 pl-8 focus:ring-black"
                          value={fromAmount}
                          onChange={handleFromAmountChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    <Button
                      type="button"
                      onClick={handleSwapCurrencies}
                      variant="outline"
                      className="border border-black p-1.5 w-8 h-8 rounded-none flex items-center justify-center hover:bg-gray-100 transition-colors duration-150 ease-in-out"
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mb-5">
                    <label className="block mb-2 font-medium text-sm">To Currency</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative w-full sm:w-1/3">
                        <Select 
                          value={toCurrency} 
                          onValueChange={setToCurrency}
                        >
                          <SelectTrigger className="w-full appearance-none bg-white border border-black rounded-none p-2.5 focus:ring-black">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="CHF">CHF - Swiss Franc</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="relative w-full sm:w-2/3">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500">{CURRENCY_SYMBOLS[toCurrency] || toCurrency}</span>
                        </div>
                        <Input
                          type="text"
                          placeholder="0.00"
                          className="w-full border border-black rounded-none p-2.5 pl-8 focus:ring-black bg-gray-50"
                          value={toAmount}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 border border-black border-opacity-20 mb-5 rounded-none">
                    <h3 className="text-sm font-semibold mb-2">Exchange Details</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Exchange Rate</span>
                        <span className="font-medium">
                          1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fee</span>
                        <span className="font-medium">0.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Processing Time</span>
                        <span className="font-medium">Instant</span>
                      </div>
                      <Separator className="my-2 bg-black bg-opacity-10" />
                      <div className="flex justify-between text-sm font-semibold">
                        <span>You'll Receive</span>
                        <span>
                          {toAmount ? formatCurrency(parseFloat(toAmount), toCurrency) : `0.00 ${toCurrency}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-5">
                    <Button 
                      type="button"
                      variant="outline"
                      className="text-xs rounded-none border-black hover:bg-gray-50 transition-colors duration-150 ease-in-out h-8 px-3"
                      onClick={() => setShowAutoConvertModal(true)}
                    >
                      {autoConvertEnabled ? "Edit Auto-Convert" : "Set Up Auto-Convert"}
                    </Button>
                    
                    <div className="text-xs text-gray-600 hidden sm:flex items-center">
                      <Lock className="h-3.5 w-3.5 mr-1" />
                      <span>Secure Transaction</span>
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    disabled={!fromAmount || parseFloat(fromAmount) <= 0 || parseFloat(fromAmount) > availableBalance || isProcessing}
                    className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-150 ease-in-out h-10 rounded-none"
                    onClick={handleExchange}
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Convert Now'
                    )}
                  </Button>
                </form>
              </div>
            </div>
            
            {/* Security Banner */}
            <div className="bg-gray-50 border border-gray-200 p-4 mb-8">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Secure Transactions</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Your exchange transactions are protected by end-to-end encryption and compliance-grade monitoring.
                  </p>
                  <div className="flex items-center text-sm">
                    <Lock className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="mr-3">Enhanced Security</span>
                    <Button 
                      variant="link" 
                      className="text-sm p-0 h-auto text-black"
                    >
                      View My Limits
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 p-4 mb-8">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  Some currency pairs may be subject to delays or rate fluctuations due to market liquidity. Large exchanges may require additional verification.
                </p>
              </div>
            </div>
          </div>
          
          {/* Market Rates Panel */}
          <div>
            <div className="border border-black h-full">
              <div className="bg-gray-100 p-4 border-b border-black flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                <h2 className="text-xl font-semibold">Market Rates</h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {marketRates.map((rate, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <div className="flex items-center">
                        <span className="font-medium">
                          {rate.fromCurrency} ⇄ {rate.toCurrency}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span>{rate.rate.toFixed(4)}</span>
                        {rate.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600 flex justify-between items-center">
                  <span>Last updated: Today, 15:42</span>
                  <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Exchange History */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <h2 className="text-xl font-semibold mb-2 sm:mb-0">Exchange History</h2>
            
            <div className="flex space-x-2">
              <Select 
                value={historyFilter} 
                onValueChange={setHistoryFilter}
              >
                <SelectTrigger className="w-32 border-black">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Currencies</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={dateRange} 
                onValueChange={setDateRange}
              >
                <SelectTrigger className="w-32 border-black">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Date" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border border-black">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b border-black">
                    <th className="p-4 text-left font-medium">Date & Time</th>
                    <th className="p-4 text-left font-medium">From → To</th>
                    <th className="p-4 text-left font-medium">Amount Converted</th>
                    <th className="p-4 text-left font-medium">Resulting Amount</th>
                    <th className="p-4 text-left font-medium">Rate</th>
                    <th className="p-4 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-gray-500">
                        No exchange history found with the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredHistory.map(exchange => (
                      <tr key={exchange.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50">
                        <td className="p-4">{formatDate(exchange.date)}</td>
                        <td className="p-4 font-medium">
                          {exchange.fromCurrency} → {exchange.toCurrency}
                        </td>
                        <td className="p-4 text-right">
                          {formatCurrency(exchange.fromAmount, exchange.fromCurrency)}
                        </td>
                        <td className="p-4 text-right">
                          {formatCurrency(exchange.toAmount, exchange.toCurrency)}
                        </td>
                        <td className="p-4">
                          {exchange.rate.toFixed(4)}
                        </td>
                        <td className="p-4">
                          <Badge 
                            variant={exchange.status === "completed" ? "default" : "outline"}
                            className={exchange.status === "completed" 
                              ? "bg-green-600 hover:bg-green-700" 
                              : "border-orange-500 text-orange-500"
                            }
                          >
                            {exchange.status === "completed" ? "Completed" : "Pending"}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      {/* PIN Verification Modal */}
      <Dialog open={showPinVerification} onOpenChange={setShowPinVerification}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security Verification
            </DialogTitle>
            <DialogDescription>
              For security reasons, large transactions require PIN verification.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4 text-sm">Please enter your 6-digit security PIN to authorize this exchange.</p>
            <div className="mb-6">
              <Input
                type="password"
                maxLength={6}
                placeholder="Enter 6-digit PIN"
                className="text-center tracking-widest"
                value={pinCode}
                onChange={e => setPinCode(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            
            <div className="bg-gray-50 p-3 border border-gray-200 mb-4 text-sm">
              <p className="font-medium mb-1">Transaction Summary:</p>
              <p>Converting {formatCurrency(parseFloat(fromAmount), fromCurrency)} to approximately {formatCurrency(parseFloat(toAmount), toCurrency)}.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-black"
              onClick={() => setShowPinVerification(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-black text-white hover:bg-gray-800"
              onClick={handleVerifyPin}
            >
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Confirm Exchange Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Exchange</DialogTitle>
            <DialogDescription>
              Please review your exchange details before confirming.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-gray-50 p-4 border border-gray-200 mb-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">From:</span>
                  <span className="font-medium">{formatCurrency(parseFloat(fromAmount), fromCurrency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <span className="font-medium">{formatCurrency(parseFloat(toAmount), toCurrency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Exchange Rate:</span>
                  <span className="font-medium">1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fee:</span>
                  <span className="font-medium">0.00 {fromCurrency}</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              By confirming this exchange, you agree to the terms and conditions of the currency exchange service.
            </p>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-black"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-black text-white hover:bg-gray-800"
              onClick={handleConfirmExchange}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Exchange'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Auto-Convert Setup Modal */}
      <Dialog open={showAutoConvertModal} onOpenChange={setShowAutoConvertModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <RefreshCw className="h-5 w-5 mr-2" />
              Auto-Convert Setup
            </DialogTitle>
            <DialogDescription>
              Automatically convert funds when balance reaches threshold.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div>
              <label className="block text-sm mb-1">From Currency</label>
              <Select 
                value={fromCurrency} 
                onValueChange={setFromCurrency}
              >
                <SelectTrigger className="w-full border-black">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm mb-1">To Currency</label>
              <Select 
                value={toCurrency} 
                onValueChange={setToCurrency}
              >
                <SelectTrigger className="w-full border-black">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm mb-1">Threshold Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500">{CURRENCY_SYMBOLS[fromCurrency] || fromCurrency}</span>
                </div>
                <Input
                  type="text"
                  placeholder="e.g., 10000"
                  className="pl-8"
                  value={autoConvertThreshold}
                  onChange={(e) => setAutoConvertThreshold(e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Auto-convert will trigger when your {fromCurrency} balance exceeds this amount.
              </p>
            </div>
            
            <div className="bg-blue-50 p-3 border border-blue-100">
              <div className="flex items-start">
                <Info className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-700">
                  Automatic conversions use the current market rate at the time of conversion. You can disable auto-convert at any time.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-black"
              onClick={() => setShowAutoConvertModal(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-black text-white hover:bg-gray-800"
              onClick={handleSetupAutoConvert}
              disabled={!autoConvertThreshold || isNaN(parseFloat(autoConvertThreshold)) || isProcessing}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Save Settings'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

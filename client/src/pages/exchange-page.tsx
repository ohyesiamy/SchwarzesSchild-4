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
    fromCurrency: "USD", 
    toCurrency: "JPY", 
    rate: 153.25, 
    trend: "up", 
    change: 0.42 
  },
  { 
    fromCurrency: "USD", 
    toCurrency: "CNY", 
    rate: 7.2562, 
    trend: "down", 
    change: 0.18 
  },
  { 
    fromCurrency: "USD", 
    toCurrency: "CHF", 
    rate: 0.9125, 
    trend: "up", 
    change: 0.09 
  },
  { 
    fromCurrency: "USD", 
    toCurrency: "CAD", 
    rate: 1.3725, 
    trend: "down", 
    change: 0.27 
  },
  { 
    fromCurrency: "USD", 
    toCurrency: "AUD", 
    rate: 1.5230, 
    trend: "up", 
    change: 0.35 
  },
  { 
    fromCurrency: "USD", 
    toCurrency: "HKD", 
    rate: 7.8120, 
    trend: "down", 
    change: 0.08 
  },
  { 
    fromCurrency: "USD", 
    toCurrency: "SGD", 
    rate: 1.3540, 
    trend: "up", 
    change: 0.16 
  },
  { 
    fromCurrency: "USD", 
    toCurrency: "BTC", 
    rate: 0.000017, 
    trend: "up", 
    change: 2.75 
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
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPinVerification, setShowPinVerification] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [historyFilter, setHistoryFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [showAutoConvertModal, setShowAutoConvertModal] = useState(false);
  const [autoConvertThreshold, setAutoConvertThreshold] = useState("");
  const [autoConvertEnabled, setAutoConvertEnabled] = useState(false);
  const [realMarketRates, setRealMarketRates] = useState<typeof marketRates>([]);
  
  // Fetch real exchange rates from API
  const fetchExchangeRate = async (from: string, to: string) => {
    setIsLoadingRates(true);
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      
      const data = await response.json();
      const newRate = data.rates[to] || 0;
      setRate(newRate);
      
      // Update realMarketRates with actual data
      const updatedRates = [];
      for (const curr in data.rates) {
        if (['USD', 'EUR', 'GBP', 'CHF'].includes(curr) && curr !== from) {
          const prevRate = marketRates.find(
            r => r.fromCurrency === from && r.toCurrency === curr
          )?.rate || 0;
          
          const trend = data.rates[curr] > prevRate ? "up" : 
                        data.rates[curr] < prevRate ? "down" : "up";
          const change = Math.abs(((data.rates[curr] - prevRate) / prevRate) * 100).toFixed(2);
          
          updatedRates.push({
            fromCurrency: from,
            toCurrency: curr,
            rate: data.rates[curr],
            trend,
            change: parseFloat(change)
          });
        }
      }
      
      if (updatedRates.length > 0) {
        setRealMarketRates(updatedRates);
      }
      
      // Update amount if needed
      if (fromAmount && to) {
        const calculated = newRate * parseFloat(fromAmount);
        setToAmount(calculated.toFixed(2));
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      // Fallback to mock data if API fails
      const fallbackRate = MOCK_EXCHANGE_RATES[from]?.[to] || 0;
      setRate(fallbackRate);
      
      if (fromAmount) {
        const calculated = fallbackRate * parseFloat(fromAmount);
        setToAmount(calculated.toFixed(2));
      }
      
      toast({
        title: "Unable to fetch live rates",
        description: "Using latest cached rates. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingRates(false);
    }
  };
  
  // Update exchange rate when currencies change
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetchExchangeRate(fromCurrency, toCurrency);
    }
  }, [fromCurrency, toCurrency]);
  
  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);
    
    if (value && !isNaN(parseFloat(value))) {
      // Use the live rate directly instead of the utility function
      if (rate > 0) {
        const calculated = parseFloat(value) * rate;
        setToAmount(calculated.toFixed(2));
      } else {
        // If we don't have a rate yet, fetch it
        if (fromCurrency && toCurrency) {
          fetchExchangeRate(fromCurrency, toCurrency);
        }
      }
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
      
      <main className="py-5 px-4 container mx-auto flex-grow mb-20 md:mb-0 max-w-[1440px]">
        {/* Mobile optimized header - visible on mobile only */}
        <div className="flex flex-col mb-4 md:hidden">
          <h1 className="text-sm uppercase tracking-wide font-medium mb-1">Currency Exchange</h1>
          <div className="w-6 h-0.5 bg-black"></div>
          <p className="text-[10px] uppercase tracking-wide text-gray-600 mt-2">Foreign exchange solutions</p>
        </div>

        {/* Desktop header - hidden on mobile */}
        <div className="hidden md:block mb-6">
          <h1 className="text-base uppercase tracking-wide font-medium mb-1">Currency Exchange</h1>
          <div className="w-8 h-0.5 bg-black mb-2"></div>
          <p className="text-xs text-gray-600">Convert between currencies with competitive exchange rates</p>
        </div>
        
        <div className="mb-5 flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <ArrowUpDown className="h-3.5 w-3.5 mr-2 text-gray-500" />
            <p className="text-[10px] text-gray-600 uppercase tracking-wide">Institutional-grade rates for global transactions</p>
          </div>
        </div>
        
        <Separator className="mb-5" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Currency Exchange Module */}
          <div className="lg:col-span-2">
            <div className="border border-gray-200 mb-5">
              <div className="p-2.5 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-xs uppercase tracking-wide font-medium">Convert Currencies</h2>
                  <p className="text-[10px] text-gray-500 mt-0.5">Secure institutional foreign exchange</p>
                </div>
                <div className="flex items-center">
                  <Shield className="h-3.5 w-3.5 text-gray-500" />
                </div>
              </div>
              
              <div className="p-3">
                <form>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[10px] uppercase tracking-wide font-medium">From Currency</label>
                      <div className="text-[9px] flex items-center text-gray-600 uppercase tracking-wide">
                        <Wallet className="h-3 w-3 mr-1" />
                        <span>Available: {formatCurrency(availableBalance, fromCurrency)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative w-full sm:w-1/3">
                        <Select 
                          value={fromCurrency} 
                          onValueChange={setFromCurrency}
                        >
                          <SelectTrigger className="w-full appearance-none bg-white border border-black rounded-none p-2 h-7 text-[10px] uppercase tracking-wide">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent className="text-[10px] uppercase tracking-wide rounded-none">
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                            <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                            <SelectItem value="CHF">CHF - Swiss Franc</SelectItem>
                            <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                            <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                            <SelectItem value="HKD">HKD - Hong Kong Dollar</SelectItem>
                            <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                            <SelectItem value="BTC">BTC - Bitcoin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="relative w-full sm:w-2/3">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <span className="text-gray-500 text-[10px]">{CURRENCY_SYMBOLS[fromCurrency] || fromCurrency}</span>
                        </div>
                        <Input
                          type="text"
                          placeholder="0.00"
                          className="w-full border border-black rounded-none p-2 pl-6 h-7 text-[11px]"
                          value={fromAmount}
                          onChange={handleFromAmountChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-3">
                    <Button
                      type="button"
                      onClick={handleSwapCurrencies}
                      variant="outline"
                      className="border border-black p-1 w-6 h-6 rounded-none flex items-center justify-center hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                    >
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[10px] uppercase tracking-wide font-medium">To Currency</label>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative w-full sm:w-1/3">
                        <Select 
                          value={toCurrency} 
                          onValueChange={setToCurrency}
                        >
                          <SelectTrigger className="w-full appearance-none bg-white border border-black rounded-none p-2 h-7 text-[10px] uppercase tracking-wide">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent className="text-[10px] uppercase tracking-wide rounded-none">
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                            <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                            <SelectItem value="CHF">CHF - Swiss Franc</SelectItem>
                            <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                            <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                            <SelectItem value="HKD">HKD - Hong Kong Dollar</SelectItem>
                            <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                            <SelectItem value="BTC">BTC - Bitcoin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="relative w-full sm:w-2/3">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <span className="text-gray-500 text-[10px]">{CURRENCY_SYMBOLS[toCurrency] || toCurrency}</span>
                        </div>
                        <Input
                          type="text"
                          placeholder="0.00"
                          className="w-full border border-black rounded-none p-2 pl-6 h-7 text-[11px] bg-gray-50"
                          value={toAmount}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 border border-black mb-4">
                    <h3 className="text-[10px] uppercase tracking-wide font-medium border-b border-gray-200 pb-1 mb-2">Exchange Details</h3>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-[10px] uppercase tracking-wide text-gray-500">Exchange Rate</span>
                        <span className="text-[10px] uppercase tracking-wide font-medium">
                          1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] uppercase tracking-wide text-gray-500">Fee</span>
                        <span className="text-[10px] uppercase tracking-wide font-medium">0.0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] uppercase tracking-wide text-gray-500">Processing Time</span>
                        <span className="text-[10px] uppercase tracking-wide font-medium">Instant</span>
                      </div>
                      <Separator className="my-2 bg-black bg-opacity-10" />
                      <div className="flex justify-between">
                        <span className="text-[10px] uppercase tracking-wide font-medium">You'll Receive</span>
                        <span className="text-[10px] uppercase tracking-wide font-medium">
                          {toAmount ? formatCurrency(parseFloat(toAmount), toCurrency) : `0.00 ${toCurrency}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <Button 
                      type="button"
                      variant="outline"
                      className="text-[10px] rounded-none border-black hover:bg-gray-50 transition-colors duration-150 ease-in-out h-7 px-2.5 uppercase tracking-wide"
                      onClick={() => setShowAutoConvertModal(true)}
                    >
                      {autoConvertEnabled ? "Edit Auto-Convert" : "Set Up Auto-Convert"}
                    </Button>
                    
                    <div className="text-[9px] text-gray-600 hidden sm:flex items-center uppercase tracking-wide">
                      <Lock className="h-3 w-3 mr-1" />
                      <span>Secure Transaction</span>
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    disabled={!fromAmount || parseFloat(fromAmount) <= 0 || parseFloat(fromAmount) > availableBalance || isProcessing}
                    className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-150 ease-in-out h-8 rounded-none text-[10px] uppercase tracking-wide font-medium"
                    onClick={handleExchange}
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="h-3 w-3 mr-1.5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Execute Transaction'
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
            <div className="border border-gray-200 h-full bg-black text-white">
              <div className="p-2.5 border-b border-gray-800 flex justify-between items-center">
                <div>
                  <h2 className="text-xs uppercase tracking-wide font-medium text-white">Market Rates</h2>
                  <p className="text-[10px] text-gray-400 mt-0.5">Live foreign exchange</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="p-0 h-6 w-6 rounded-none border-white flex items-center justify-center bg-transparent hover:bg-gray-900"
                  onClick={() => fetchExchangeRate(fromCurrency, toCurrency)}
                  disabled={isLoadingRates}
                >
                  <RefreshCw className={`h-3 w-3 text-white ${isLoadingRates ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              
              <div className="p-3 max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-900">
                <div className="overflow-x-hidden">
                  {(realMarketRates.length > 0 ? realMarketRates : marketRates).map((rate, index) => (
                    <div key={index} className="flex justify-between items-center py-1.5 border-b border-gray-800 last:border-0">
                      <div className="flex items-center">
                        <span className="text-[10px] uppercase tracking-wide font-medium text-white">
                          {rate.fromCurrency} — {rate.toCurrency}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-[10px] font-mono text-white">{rate.rate.toFixed(rate.toCurrency === "BTC" ? 8 : 4)}</span>
                        <div className="flex items-center">
                          {rate.trend === "up" ? (
                            <div className="flex items-center bg-green-900 px-1.5 py-0.5">
                              <div className="mr-1 h-4 w-5">
                                <svg viewBox="0 0 24 12" className="h-full w-full">
                                  <path d="M1,11 L8,4 L12,8 L23,1" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                                </svg>
                              </div>
                              <span className="text-[9px] uppercase tracking-wide text-green-400">+{rate.change}%</span>
                            </div>
                          ) : (
                            <div className="flex items-center bg-red-900 px-1.5 py-0.5">
                              <div className="mr-1 h-4 w-5">
                                <svg viewBox="0 0 24 12" className="h-full w-full">
                                  <path d="M1,1 L8,8 L12,4 L23,11" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                                </svg>
                              </div>
                              <span className="text-[9px] uppercase tracking-wide text-red-400">-{rate.change}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 pt-2 border-t border-gray-800 flex justify-center items-center">
                  <span className="text-[9px] uppercase tracking-wide text-gray-400">{isLoadingRates ? "Updating live rates..." : `Last updated: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Exchange History */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 border-b border-gray-200 pb-2">
            <div>
              <h2 className="text-xs uppercase tracking-wide font-medium mb-1">Exchange History</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">Previous foreign exchange transactions</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
              <Select 
                value={historyFilter} 
                onValueChange={setHistoryFilter}
              >
                <SelectTrigger className="h-8 w-full sm:w-28 text-xs rounded-none border-black">
                  <div className="flex items-center">
                    <Filter className="h-3.5 w-3.5 mr-1.5" />
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
                <SelectTrigger className="h-8 w-full sm:w-28 text-xs rounded-none border-black">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
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
          
          {/* Desktop View - Table */}
          <div className="hidden md:block border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="p-2 text-left text-[10px] uppercase tracking-wide font-medium">Date & Time</th>
                    <th className="p-2 text-left text-[10px] uppercase tracking-wide font-medium">From — To</th>
                    <th className="p-2 text-right text-[10px] uppercase tracking-wide font-medium">Amount Converted</th>
                    <th className="p-2 text-right text-[10px] uppercase tracking-wide font-medium">Resulting Amount</th>
                    <th className="p-2 text-left text-[10px] uppercase tracking-wide font-medium">Rate</th>
                    <th className="p-2 text-left text-[10px] uppercase tracking-wide font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-2 text-center text-[10px] uppercase tracking-wide text-gray-500">
                        No exchange history found with the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredHistory.map(exchange => (
                      <tr key={exchange.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                        <td className="p-2 text-[10px] uppercase tracking-wide">{formatDate(exchange.date)}</td>
                        <td className="p-2 text-[10px] uppercase tracking-wide font-medium">
                          {exchange.fromCurrency} — {exchange.toCurrency}
                        </td>
                        <td className="p-2 text-right text-[10px] uppercase tracking-wide">
                          {formatCurrency(exchange.fromAmount, exchange.fromCurrency)}
                        </td>
                        <td className="p-2 text-right text-[10px] uppercase tracking-wide">
                          {formatCurrency(exchange.toAmount, exchange.toCurrency)}
                        </td>
                        <td className="p-2 text-[10px] uppercase tracking-wide font-mono">
                          {exchange.rate.toFixed(4)}
                        </td>
                        <td className="p-2">
                          {exchange.status === "completed" ? (
                            <div className="inline-flex items-center border border-black px-1.5 py-0.5">
                              <span className="text-[9px] uppercase tracking-wide">Completed</span>
                            </div>
                          ) : (
                            <div className="inline-flex items-center border border-black px-1.5 py-0.5">
                              <span className="text-[9px] uppercase tracking-wide">Pending</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Mobile View - Cards */}
          <div className="md:hidden space-y-3">
            {filteredHistory.length === 0 ? (
              <div className="text-center p-3 text-[10px] uppercase tracking-wide text-gray-500 border border-gray-200">
                No exchange history found with the selected filters.
              </div>
            ) : (
              filteredHistory.map(exchange => (
                <div key={exchange.id} className="border border-gray-200 p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-[9px] uppercase tracking-wide text-gray-500">{formatDate(exchange.date)}</span>
                    </div>
                    {exchange.status === "completed" ? (
                      <div className="inline-flex items-center border border-black px-1.5 py-0.5">
                        <span className="text-[9px] uppercase tracking-wide">Completed</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center border border-black px-1.5 py-0.5">
                        <span className="text-[9px] uppercase tracking-wide">Pending</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[10px] uppercase tracking-wide font-medium">
                      {exchange.fromCurrency} — {exchange.toCurrency}
                    </div>
                    <div className="text-[9px] uppercase tracking-wide text-gray-500">
                      Rate: <span className="font-mono">{exchange.rate.toFixed(4)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div>
                      <div className="text-[9px] uppercase tracking-wide text-gray-500">From</div>
                      <div className="text-[10px] uppercase tracking-wide">{formatCurrency(exchange.fromAmount, exchange.fromCurrency)}</div>
                    </div>
                    <div className="h-3 w-3 border border-black flex items-center justify-center">
                      <ArrowRight className="h-1.5 w-1.5" />
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wide text-gray-500">To</div>
                      <div className="text-[10px] uppercase tracking-wide">{formatCurrency(exchange.toAmount, exchange.toCurrency)}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      
      {/* PIN Verification Modal */}
      <Dialog open={showPinVerification} onOpenChange={setShowPinVerification}>
        <DialogContent className="max-w-md rounded-none border-black">
          <DialogHeader className="border-b border-gray-200 pb-2">
            <DialogTitle className="flex items-center">
              <div className="h-4 w-4 border border-black flex items-center justify-center mr-2">
                <Shield className="h-2 w-2" />
              </div>
              <span className="text-xs uppercase tracking-wide font-medium">Security Verification</span>
            </DialogTitle>
            <DialogDescription className="text-[10px] uppercase tracking-wide text-gray-500 mt-1">
              For security reasons, large transactions require PIN verification.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-3">
            <p className="mb-3 text-[10px] uppercase tracking-wide">Please enter your 6-digit security PIN to authorize this exchange.</p>
            <div className="mb-4">
              <Input
                type="password"
                maxLength={6}
                placeholder="Enter 6-digit PIN"
                className="text-center tracking-widest rounded-none border-black h-8 text-sm"
                value={pinCode}
                onChange={e => setPinCode(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            
            <div className="border border-black p-3 mb-3">
              <p className="text-[10px] uppercase tracking-wide font-medium border-b border-gray-200 pb-1 mb-2">Transaction Summary:</p>
              <p className="text-[10px] uppercase tracking-wide">Converting {formatCurrency(parseFloat(fromAmount), fromCurrency)} to approximately {formatCurrency(parseFloat(toAmount), toCurrency)}.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              className="rounded-none border-black text-[10px] uppercase tracking-wide h-7"
              onClick={() => setShowPinVerification(false)}
            >
              Cancel
            </Button>
            <Button 
              className="rounded-none bg-black text-white hover:bg-gray-800 text-[10px] uppercase tracking-wide font-medium h-7"
              onClick={handleVerifyPin}
            >
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Confirm Exchange Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="max-w-md rounded-none border-black">
          <DialogHeader className="border-b border-gray-200 pb-2">
            <DialogTitle className="text-xs uppercase tracking-wide font-medium">Confirm Exchange</DialogTitle>
            <DialogDescription className="text-[10px] uppercase tracking-wide text-gray-500 mt-1">
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
              className="rounded-none border-black text-[10px] uppercase tracking-wide h-7"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button 
              className="rounded-none bg-black text-white hover:bg-gray-800 text-[10px] uppercase tracking-wide font-medium h-7"
              onClick={handleConfirmExchange}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-1.5 animate-spin" />
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
        <DialogContent className="max-w-md rounded-none border-black">
          <DialogHeader className="border-b border-gray-200 pb-2">
            <DialogTitle className="flex items-center">
              <div className="h-4 w-4 border border-black flex items-center justify-center mr-2">
                <RefreshCw className="h-2 w-2" />
              </div>
              <span className="text-xs uppercase tracking-wide font-medium">Auto-Convert Setup</span>
            </DialogTitle>
            <DialogDescription className="text-[10px] uppercase tracking-wide text-gray-500 mt-1">
              Automatically convert funds when balance reaches threshold.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-3 space-y-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wide font-medium mb-1">From Currency</label>
              <Select 
                value={fromCurrency} 
                onValueChange={setFromCurrency}
              >
                <SelectTrigger className="w-full rounded-none border-black h-7 text-[10px] uppercase tracking-wide">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="text-[10px] uppercase tracking-wide rounded-none">
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-[10px] uppercase tracking-wide font-medium mb-1">To Currency</label>
              <Select 
                value={toCurrency} 
                onValueChange={setToCurrency}
              >
                <SelectTrigger className="w-full rounded-none border-black h-7 text-[10px] uppercase tracking-wide">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="text-[10px] uppercase tracking-wide rounded-none">
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                  <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                  <SelectItem value="CHF">CHF - Swiss Franc</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                  <SelectItem value="HKD">HKD - Hong Kong Dollar</SelectItem>
                  <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                  <SelectItem value="BTC">BTC - Bitcoin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-[10px] uppercase tracking-wide font-medium mb-1">Threshold Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <span className="text-gray-500 text-[10px]">{CURRENCY_SYMBOLS[fromCurrency] || fromCurrency}</span>
                </div>
                <Input
                  type="text"
                  placeholder="e.g., 10000"
                  className="pl-6 rounded-none border-black h-7 text-[10px] uppercase tracking-wide"
                  value={autoConvertThreshold}
                  onChange={(e) => setAutoConvertThreshold(e.target.value)}
                />
              </div>
              <p className="text-[9px] uppercase tracking-wide text-gray-500 mt-1">
                Auto-convert will trigger when your {fromCurrency} balance exceeds this amount.
              </p>
            </div>
            
            <div className="border border-black p-3">
              <div className="flex items-start">
                <div className="h-3 w-3 border border-black flex items-center justify-center mr-2 mt-0.5">
                  <Info className="h-1.5 w-1.5" />
                </div>
                <p className="text-[9px] uppercase tracking-wide text-gray-600">
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

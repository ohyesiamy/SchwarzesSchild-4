import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Footer } from "@/components/layout/footer";
import { TransactionItem } from "@/components/account/transaction-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  Calendar, 
  Check, 
  CreditCard, 
  Info, 
  Search, 
  Repeat, 
  Filter,
  AlertCircle,
  ChevronDown,
  Globe,
  Landmark,
  ArrowRightLeft
} from "lucide-react";
import { TIME_FILTERS, CURRENCY_SYMBOLS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Mock accounts data
const accounts = [
  { id: 1, name: "EUR Account", currency: "EUR", balance: 24856.78 },
  { id: 2, name: "USD Account", currency: "USD", balance: 12342.50 },
  { id: 3, name: "GBP Account", currency: "GBP", balance: 8761.35 },
];

// Mock transactions data
const allTransactions = [
  { 
    id: 1, 
    name: "Café Noir", 
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), 
    amount: -4.80, 
    currency: "EUR",
    category: "Food & Dining",
    status: "Completed",
    reference: "POS-394857"
  },
  { 
    id: 2, 
    name: "Transfer from Michael B.", 
    date: new Date(Date.now() - 26 * 60 * 60 * 1000), 
    amount: 350.00, 
    currency: "EUR",
    category: "Income",
    status: "Completed",
    reference: "TRF-284751"
  },
  { 
    id: 3, 
    name: "Schwarzes Schild Exchange", 
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
    amount: -1000.00, 
    currency: "EUR",
    category: "Currency Exchange",
    status: "Completed",
    reference: "FX-946173"
  },
  { 
    id: 4, 
    name: "Rent Payment", 
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), 
    amount: -1200.00, 
    currency: "EUR",
    category: "Housing",
    status: "Completed",
    reference: "TRF-736452"
  },
  { 
    id: 5, 
    name: "Salary Deposit", 
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), 
    amount: 3450.00, 
    currency: "EUR",
    category: "Income",
    status: "Completed",
    reference: "DEP-583921"
  },
  {
    id: 6,
    name: "International Wire - HSBC UK",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    amount: -2500.00,
    currency: "EUR",
    category: "Transfer",
    status: "Pending",
    reference: "INTL-629485"
  },
  {
    id: 7,
    name: "Self Transfer to USD Account",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    amount: -5000.00,
    currency: "EUR",
    category: "Internal Transfer",
    status: "Completed",
    reference: "INT-738291"
  },
  {
    id: 8,
    name: "Scheduled Payment - Insurance",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    amount: -145.50,
    currency: "EUR",
    category: "Insurance",
    status: "Scheduled",
    reference: "SCH-384756"
  }
];

// Scheduled transfers
const scheduledTransfers = [
  {
    id: 1,
    name: "Monthly Rent Payment",
    amount: 1200.00,
    currency: "EUR",
    fromAccount: "EUR Account",
    toAccount: "Thomas Weber (External)",
    nextDate: new Date(new Date().setDate(1)),
    frequency: "Monthly",
    status: "Active"
  },
  {
    id: 2,
    name: "Savings Transfer",
    amount: 500.00,
    currency: "EUR",
    fromAccount: "EUR Account",
    toAccount: "USD Account",
    nextDate: new Date(new Date().setDate(15)),
    frequency: "Monthly",
    status: "Active"
  },
  {
    id: 3,
    name: "Insurance Premium",
    amount: 145.50,
    currency: "EUR",
    fromAccount: "EUR Account",
    toAccount: "Allianz Insurance (External)",
    nextDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    frequency: "Monthly",
    status: "Active"
  }
];

// Countries for international transfers
const countries = [
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "CH", name: "Switzerland" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "AU", name: "Australia" },
  { code: "CA", name: "Canada" },
  { code: "JP", name: "Japan" },
  { code: "CN", name: "China" },
  { code: "SG", name: "Singapore" },
  { code: "HK", name: "Hong Kong" }
];

// Currencies for international transfers
const currencies = ["EUR", "USD", "GBP", "CHF", "JPY", "CAD", "AUD", "SGD", "HKD"];

// Transfer frequency options
const frequencies = [
  { value: "once", label: "One-time" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "annually", label: "Annually" }
];

export default function TransactionsPage() {
  const { toast } = useToast();
  // Transaction history filters
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("30days");
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Domestic transfer form state
  const [domesticRecipientName, setDomesticRecipientName] = useState("");
  const [domesticAccountNumber, setDomesticAccountNumber] = useState("");
  const [domesticBank, setDomesticBank] = useState("");
  const [domesticAmount, setDomesticAmount] = useState("");
  const [domesticDescription, setDomesticDescription] = useState("");
  const [domesticFromAccount, setDomesticFromAccount] = useState("EUR Account");
  
  // International transfer form state
  const [swiftCode, setSwiftCode] = useState("");
  const [ibanAccount, setIbanAccount] = useState("");
  const [recipientCountry, setRecipientCountry] = useState("");
  const [transferCurrency, setTransferCurrency] = useState("EUR");
  const [internationalAmount, setInternationalAmount] = useState("");
  const [transferReason, setTransferReason] = useState("");
  const [internationalFromAccount, setInternationalFromAccount] = useState("EUR Account");
  
  // Self-transfer form state
  const [selfFromAccount, setSelfFromAccount] = useState("EUR Account");
  const [selfToAccount, setSelfToAccount] = useState("USD Account");
  const [selfAmount, setSelfAmount] = useState("");
  const [selfDate, setSelfDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Scheduled transfer form state
  const [scheduledType, setScheduledType] = useState("once");
  const [scheduledFromAccount, setScheduledFromAccount] = useState("EUR Account");
  const [scheduledToAccount, setScheduledToAccount] = useState("");
  const [scheduledAmount, setScheduledAmount] = useState("");
  const [scheduledStartDate, setScheduledStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [scheduledEndDate, setScheduledEndDate] = useState("");
  const [scheduledFrequency, setScheduledFrequency] = useState("monthly");
  const [scheduledDescription, setScheduledDescription] = useState("");
  
  // For fixing the BadgeInfo error
  const BadgeInfo = Info;
  
  // Filter transactions based on selected filters and search query
  const filteredTransactions = allTransactions.filter(transaction => {
    // Filter by account
    const matchesAccount = selectedAccount === "all" || transaction.currency === selectedAccount;
    
    // Filter by transaction type
    const matchesType = 
      transactionFilter === "all" || 
      (transactionFilter === "incoming" && transaction.amount > 0) ||
      (transactionFilter === "outgoing" && transaction.amount < 0) ||
      (transactionFilter === "scheduled" && transaction.status === "Scheduled") ||
      (transactionFilter === "pending" && transaction.status === "Pending");
    
    // Filter by search query
    const matchesSearch = 
      !searchQuery || 
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesAccount && matchesType && matchesSearch;
  });
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).format(date);
  };
  
  // Handle form submissions with validation and confirmation
  const handleTransferSubmit = (transferType: string) => {
    let validationFailed = false;
    let formData: any = {};
    
    switch (transferType) {
      case "domestic":
        if (!domesticRecipientName || !domesticAccountNumber || !domesticBank || !domesticAmount || parseFloat(domesticAmount) <= 0) {
          validationFailed = true;
          formData = { type: "Domestic Transfer", recipient: domesticRecipientName };
        } else {
          formData = { 
            type: "Domestic Transfer", 
            from: domesticFromAccount,
            recipient: domesticRecipientName,
            account: domesticAccountNumber,
            bank: domesticBank,
            amount: `€${parseFloat(domesticAmount).toFixed(2)}`,
            description: domesticDescription
          };
        }
        break;
        
      case "international":
        if (!swiftCode || !ibanAccount || !recipientCountry || !internationalAmount || parseFloat(internationalAmount) <= 0) {
          validationFailed = true;
          formData = { type: "International Transfer", recipient: ibanAccount };
        } else {
          formData = {
            type: "International Transfer",
            from: internationalFromAccount,
            swift: swiftCode,
            iban: ibanAccount,
            country: recipientCountry,
            currency: transferCurrency,
            amount: `${CURRENCY_SYMBOLS[transferCurrency]}${parseFloat(internationalAmount).toFixed(2)}`,
            reason: transferReason
          };
        }
        break;
        
      case "self":
        if (selfFromAccount === selfToAccount) {
          toast({
            title: "Same account selected",
            description: "Please select different accounts for the transfer.",
            variant: "destructive"
          });
          return;
        }
        
        if (!selfAmount || parseFloat(selfAmount) <= 0) {
          validationFailed = true;
          formData = { type: "Self Transfer", from: selfFromAccount, to: selfToAccount };
        } else {
          formData = {
            type: "Self Transfer",
            from: selfFromAccount,
            to: selfToAccount,
            amount: `€${parseFloat(selfAmount).toFixed(2)}`,
            date: selfDate
          };
        }
        break;
        
      case "scheduled":
        if (!scheduledToAccount || !scheduledAmount || parseFloat(scheduledAmount) <= 0 || !scheduledStartDate) {
          validationFailed = true;
          formData = { type: "Scheduled Transfer", recipient: scheduledToAccount };
        } else {
          formData = {
            type: "Scheduled Transfer",
            from: scheduledFromAccount,
            to: scheduledToAccount,
            amount: `€${parseFloat(scheduledAmount).toFixed(2)}`,
            startDate: scheduledStartDate,
            endDate: scheduledEndDate || "None",
            frequency: frequencies.find(f => f.value === scheduledFrequency)?.label || "Monthly",
            description: scheduledDescription
          };
        }
        break;
    }
    
    if (validationFailed) {
      toast({
        title: "Invalid form data",
        description: `Please complete all required fields for ${formData.type}.`,
        variant: "destructive"
      });
      return;
    }
    
    // Simulate API call
    toast({
      title: "Transfer initiated",
      description: `Your ${formData.type.toLowerCase()} is being processed. You will receive a confirmation shortly.`,
    });
    
    // Show confirmation details (in a real app, this would be a modal)
    console.log("Transfer details:", formData);
  };
  
  // Get status badge based on transaction status
  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium";
    
    switch (status) {
      case "Completed":
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>{status}</span>;
      case "Pending":
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>{status}</span>;
      case "Scheduled":
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>{status}</span>;
      case "Failed":
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>{status}</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation active="transactions" />
      <MobileNavigation active="transactions" />
      
      <main className="flex-1 container mx-auto px-4 py-6 mb-20 md:mb-0">
        {/* Mobile optimized header */}
        <div className="flex flex-col mb-6">
          <h1 className="text-2xl font-semibold tracking-tight mb-2">Transfer & Transactions</h1>
          <div className="w-12 h-1 bg-black"></div>
        </div>
        
        {/* Transfer Options Section - Mobile Optimized */}
        <div className="mb-10 bg-white border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-base font-semibold">Transfer Options</h2>
            <p className="text-xs text-gray-600 mt-1">
              Select transfer type to initiate a new transaction
            </p>
          </div>
          
          <Tabs defaultValue="domestic" className="w-full">
            <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4 p-0 h-auto bg-gray-50 border-b border-gray-200">
              <TabsTrigger 
                value="domestic" 
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none py-2.5 flex items-center justify-center text-xs sm:text-sm border-r border-gray-200"
              >
                <Landmark className="h-3.5 w-3.5 mr-1.5" />
                <span className="hidden xs:inline">Domestic</span> Transfer
              </TabsTrigger>
              <TabsTrigger 
                value="international" 
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none py-2.5 flex items-center justify-center text-xs sm:text-sm border-r border-gray-200"
              >
                <Globe className="h-3.5 w-3.5 mr-1.5" />
                <span className="hidden xs:inline">International</span> Wire
              </TabsTrigger>
              <TabsTrigger 
                value="self" 
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none py-2.5 flex items-center justify-center text-xs sm:text-sm border-r border-gray-200"
              >
                <ArrowRightLeft className="h-3.5 w-3.5 mr-1.5" />
                Self-Transfer
              </TabsTrigger>
              <TabsTrigger 
                value="scheduled" 
                className="data-[state=active]:bg-black data-[state=active]:text-white rounded-none py-2.5 flex items-center justify-center text-xs sm:text-sm"
              >
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                Scheduled
              </TabsTrigger>
            </TabsList>
            
            {/* Domestic Transfer Tab - Mobile Optimized */}
            <TabsContent value="domestic">
              <div className="bg-white p-4 md:p-6">
                <div className="flex items-center px-3 py-2 bg-gray-50 border-l-2 border-black mb-4">
                  <Info className="h-4 w-4 mr-2 text-gray-600" />
                  <span className="text-xs text-gray-600">Domestic transfers are processed within 24 hours on business days.</span>
                </div>
                
                <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
                      <Select
                        value={domesticFromAccount}
                        onValueChange={setDomesticFromAccount}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map(account => (
                            <SelectItem key={account.id} value={account.name}>
                              {account.name} ({formatCurrency(account.balance, account.currency)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
                      <Input
                        type="text"
                        placeholder="Full name of recipient"
                        value={domesticRecipientName}
                        onChange={(e) => setDomesticRecipientName(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                      <Input
                        type="text"
                        placeholder="Recipient's account number"
                        value={domesticAccountNumber}
                        onChange={(e) => setDomesticAccountNumber(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bank / Branch</label>
                      <Input
                        type="text"
                        placeholder="Recipient's bank name"
                        value={domesticBank}
                        onChange={(e) => setDomesticBank(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">€</span>
                        </div>
                        <Input
                          type="number"
                          min="0.01"
                          step="0.01"
                          placeholder="0.00"
                          value={domesticAmount}
                          onChange={(e) => setDomesticAmount(e.target.value)}
                          className="w-full pl-8"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description (Optional)
                      </label>
                      <Input
                        type="text"
                        placeholder="Payment reason or reference"
                        value={domesticDescription}
                        onChange={(e) => setDomesticDescription(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 mt-4">
                    <Button
                      type="button"
                      className="w-full bg-black text-white hover:bg-gray-900"
                      onClick={() => handleTransferSubmit("domestic")}
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Send Transfer
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      By proceeding, you agree to the bank's transaction terms and conditions.
                    </p>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            {/* International Wire Transfer Tab */}
            <TabsContent value="international">
              <div className="bg-white border border-gray-200 p-8">
                <div className="mb-2 flex items-center text-sm text-gray-600">
                  <Info className="h-4 w-4 mr-2 text-gray-400" />
                  <span>International transfers typically take 1-3 business days to complete.</span>
                </div>
                
                <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
                      <Select
                        value={internationalFromAccount}
                        onValueChange={setInternationalFromAccount}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map(account => (
                            <SelectItem key={account.id} value={account.name}>
                              {account.name} ({formatCurrency(account.balance, account.currency)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SWIFT/BIC Code</label>
                      <Input
                        type="text"
                        placeholder="e.g., CHASUS33XXX"
                        value={swiftCode}
                        onChange={(e) => setSwiftCode(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">IBAN / Account Number</label>
                      <Input
                        type="text"
                        placeholder="International account format"
                        value={ibanAccount}
                        onChange={(e) => setIbanAccount(e.target.value)}
                        className="w-full"
                      />
                      <p className="mt-1 text-xs text-gray-500 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Ensure beneficiary details are correct to avoid delays
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Country</label>
                        <Select
                          value={recipientCountry}
                          onValueChange={setRecipientCountry}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map(country => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                        <Select
                          value={transferCurrency}
                          onValueChange={setTransferCurrency}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map(currency => (
                              <SelectItem key={currency} value={currency}>
                                {currency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">{CURRENCY_SYMBOLS[transferCurrency] || '€'}</span>
                        </div>
                        <Input
                          type="number"
                          min="0.01"
                          step="0.01"
                          placeholder="0.00"
                          value={internationalAmount}
                          onChange={(e) => setInternationalAmount(e.target.value)}
                          className="w-full pl-8"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reason / Memo
                      </label>
                      <Input
                        type="text"
                        placeholder="Purpose of transfer"
                        value={transferReason}
                        onChange={(e) => setTransferReason(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 mt-4">
                    <Button
                      type="button"
                      className="w-full bg-black text-white hover:bg-gray-900"
                      onClick={() => handleTransferSubmit("international")}
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Send International Wire
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      International transfers may be subject to receiving bank fees and currency conversion rates.
                    </p>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            {/* Self-Transfer Tab */}
            <TabsContent value="self">
              <div className="bg-white border border-gray-200 p-8">
                <div className="mb-2 flex items-center text-sm text-gray-600 bg-gray-50 p-3 border-l-4 border-black">
                  <Check className="h-4 w-4 mr-2 text-black" />
                  <span>No fees applied to internal transfers between your accounts.</span>
                </div>
                
                <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
                    <Select
                      value={selfFromAccount}
                      onValueChange={setSelfFromAccount}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select source account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map(account => (
                          <SelectItem key={account.id} value={account.name}>
                            {account.name} ({formatCurrency(account.balance, account.currency)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To Account</label>
                    <Select
                      value={selfToAccount}
                      onValueChange={setSelfToAccount}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select destination account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map(account => (
                          <SelectItem key={account.id} value={account.name}>
                            {account.name} ({formatCurrency(account.balance, account.currency)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">€</span>
                      </div>
                      <Input
                        type="number"
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                        value={selfAmount}
                        onChange={(e) => setSelfAmount(e.target.value)}
                        className="w-full pl-8"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transfer Date</label>
                    <Input
                      type="date"
                      value={selfDate}
                      onChange={(e) => setSelfDate(e.target.value)}
                      className="w-full"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="md:col-span-2 mt-4">
                    <Button
                      type="button"
                      className="w-full bg-black text-white hover:bg-gray-900"
                      onClick={() => handleTransferSubmit("self")}
                    >
                      <ArrowRightLeft className="h-4 w-4 mr-2" />
                      Transfer Between Accounts
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Currency exchange rates will apply for transfers between accounts in different currencies.
                    </p>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            {/* Scheduled / Recurring Tab */}
            <TabsContent value="scheduled">
              <div className="bg-white border border-gray-200 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium mb-4">Create Scheduled Transfer</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Transfer Type</label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="scheduledType"
                              value="once"
                              checked={scheduledType === "once"}
                              onChange={() => setScheduledType("once")}
                              className="mr-2"
                            />
                            <span className="text-sm">One-time</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="scheduledType"
                              value="recurring"
                              checked={scheduledType === "recurring"}
                              onChange={() => setScheduledType("recurring")}
                              className="mr-2"
                            />
                            <span className="text-sm">Recurring</span>
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">From Account</label>
                        <Select
                          value={scheduledFromAccount}
                          onValueChange={setScheduledFromAccount}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            {accounts.map(account => (
                              <SelectItem key={account.id} value={account.name}>
                                {account.name} ({formatCurrency(account.balance, account.currency)})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To Account/Recipient</label>
                        <Input
                          type="text"
                          placeholder="Account name or number"
                          value={scheduledToAccount}
                          onChange={(e) => setScheduledToAccount(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">€</span>
                          </div>
                          <Input
                            type="number"
                            min="0.01"
                            step="0.01"
                            placeholder="0.00"
                            value={scheduledAmount}
                            onChange={(e) => setScheduledAmount(e.target.value)}
                            className="w-full pl-8"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                          <Input
                            type="date"
                            value={scheduledStartDate}
                            onChange={(e) => setScheduledStartDate(e.target.value)}
                            className="w-full"
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        
                        {scheduledType === "recurring" && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
                            <Input
                              type="date"
                              value={scheduledEndDate}
                              onChange={(e) => setScheduledEndDate(e.target.value)}
                              className="w-full"
                              min={scheduledStartDate}
                            />
                          </div>
                        )}
                      </div>
                      
                      {scheduledType === "recurring" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                          <Select
                            value={scheduledFrequency}
                            onValueChange={setScheduledFrequency}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              {frequencies.map(freq => (
                                <SelectItem key={freq.value} value={freq.value}>
                                  {freq.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description (Optional)
                        </label>
                        <Input
                          type="text"
                          placeholder="e.g., Monthly rent"
                          value={scheduledDescription}
                          onChange={(e) => setScheduledDescription(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      
                      <Button
                        type="button"
                        className="w-full bg-black text-white hover:bg-gray-900"
                        onClick={() => handleTransferSubmit("scheduled")}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Transfer
                      </Button>
                    </form>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Upcoming Scheduled Transfers</h3>
                    {scheduledTransfers.length > 0 ? (
                      <div className="space-y-3">
                        {scheduledTransfers.map(transfer => (
                          <div 
                            key={transfer.id} 
                            className="border border-gray-200 p-4 hover:border-gray-300"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{transfer.name}</p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {transfer.fromAccount} → {transfer.toAccount}
                                </p>
                                <div className="flex items-center text-xs text-gray-500 mt-2">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>Next: {formatDate(transfer.nextDate)} • {transfer.frequency}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{formatCurrency(transfer.amount, transfer.currency)}</p>
                                <div className="flex space-x-2 mt-3">
                                  <button 
                                    className="text-xs text-gray-600 hover:text-black"
                                    onClick={() => {
                                      toast({
                                        title: "Edit scheduled transfer",
                                        description: "Edit functionality will be available soon."
                                      });
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    className="text-xs text-red-600 hover:text-red-800"
                                    onClick={() => {
                                      toast({
                                        title: "Cancel scheduled transfer",
                                        description: "Cancel functionality will be available soon."
                                      });
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="border border-gray-200 p-6 text-center">
                        <p className="text-gray-500">No scheduled transfers</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Transaction History Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Transaction History</h2>
              <p className="text-sm text-gray-600 mt-1">View and search your recent transactions</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-4 md:mt-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 py-2 h-9 text-sm md:w-48 lg:w-64"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Select
                  value={transactionFilter}
                  onValueChange={setTransactionFilter}
                >
                  <SelectTrigger className="h-9 text-sm w-32 md:w-36">
                    <div className="flex items-center">
                      <Filter className="h-3.5 w-3.5 mr-2" />
                      <SelectValue placeholder="All" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="incoming">Incoming</SelectItem>
                    <SelectItem value="outgoing">Outgoing</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={selectedAccount}
                  onValueChange={setSelectedAccount}
                >
                  <SelectTrigger className="h-9 text-sm w-32 md:w-36">
                    <SelectValue placeholder="All Accounts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Accounts</SelectItem>
                    <SelectItem value="EUR">EUR Account</SelectItem>
                    <SelectItem value="USD">USD Account</SelectItem>
                    <SelectItem value="GBP">GBP Account</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={selectedTimeFilter}
                  onValueChange={setSelectedTimeFilter}
                >
                  <SelectTrigger className="h-9 text-sm w-32 md:w-36">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_FILTERS.map(filter => (
                      <SelectItem key={filter.value} value={filter.value}>
                        {filter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Transactions Table */}
          <div className="bg-white border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Reference</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map(transaction => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{transaction.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.reference}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(transaction.status)}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                          transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                        No transactions found matching your search criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {filteredTransactions.length} of {allTransactions.length} transactions
                </p>
                <div className="flex items-center space-x-1 text-sm">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3"
                    onClick={() => {
                      toast({
                        title: "Export transactions",
                        description: "Your transactions will be exported as a CSV file."
                      });
                    }}
                  >
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3"
                    onClick={() => {
                      toast({
                        title: "Print transactions",
                        description: "Preparing your transactions for printing."
                      });
                    }}
                  >
                    Print
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

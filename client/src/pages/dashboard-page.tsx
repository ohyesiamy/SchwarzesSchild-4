import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Footer } from "@/components/layout/footer";
import { Logo } from "@/components/ui/logo";
import { BankProfile } from "@/components/dashboard/bank-profile";
import { MarketSnapshot } from "@/components/dashboard/market-snapshot";
import { PortfolioSummary } from "@/components/dashboard/portfolio-summary";
import { ComplianceNotification } from "@/components/dashboard/compliance-notification";
import { ComplianceStatus } from "@/components/dashboard/compliance-status";
import { InvestmentOverview } from "@/components/dashboard/investment-overview";
import { MarketInsights } from "@/components/dashboard/market-insights";
import { UpcomingPayments } from "@/components/dashboard/upcoming-payments";
import { NotificationsCenter } from "@/components/dashboard/notifications-center";
import { StatementGenerator } from "@/components/dashboard/statement-generator";
import { LinkedAccounts } from "@/components/dashboard/linked-accounts";
import { ScheduledPayments } from "@/components/dashboard/scheduled-payments";
import { KnowledgeCenter } from "@/components/dashboard/knowledge-center";
import { TransferModal } from "@/components/modals/transfer-modal";
import { StatementModal } from "@/components/modals/statement-modal";
import { CardManagementModal } from "@/components/modals/card-management-modal";
import { DepositModal } from "@/components/modals/deposit-modal";
import { Button } from "@/components/ui/button";
import { 
  PlusIcon, 
  ArrowDownIcon, 
  ArrowRightLeftIcon, 
  SquareIcon, 
  CalendarIcon, 
  BellIcon, 
  ShieldIcon,
  CreditCardIcon
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";



// Mock data for accounts
const accounts = [
  { id: 1, name: "Main Account", currency: "EUR", balance: 24856.78 },
  { id: 2, name: "USD Account", currency: "USD", balance: 12342.50 },
  { id: 3, name: "GBP Account", currency: "GBP", balance: 8761.35 },
];

// Mock data for recent transactions
const recentTransactions = [
  { 
    id: 1, 
    name: "Café Noir", 
    date: new Date(Date.now() - 24 * 60 * 60 * 1000), 
    amount: -4.80, 
    currency: "EUR",
    category: "Food & Dining"
  },
  { 
    id: 2, 
    name: "Transfer from Michael B.", 
    date: new Date(Date.now() - 26 * 60 * 60 * 1000), 
    amount: 350.00, 
    currency: "EUR",
    category: "Income" 
  },
  { 
    id: 3, 
    name: "Schwarzes Schild Exchange", 
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
    amount: -1000.00, 
    currency: "EUR",
    category: "Currency Exchange" 
  }
];

export default function DashboardPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  
  const mainAccount = accounts.find(account => account.currency === selectedCurrency) || accounts[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation active="dashboard" />
      <MobileNavigation active="dashboard" />
      
      <main className="py-6 md:py-10 lg:py-12 px-4 md:px-6 lg:px-8 container mx-auto flex-grow mb-16 md:mb-0 max-w-screen-2xl">
        {/* Welcome Banner */}
        <div className="bg-black text-white mb-8 md:mb-12 shadow-lg rounded-lg md:rounded-none relative overflow-hidden">
          {/* Premium geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 border-l border-t border-white transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 border-r border-b border-white transform -translate-x-8 translate-y-8"></div>
          </div>
          
          <div className="p-5 sm:p-6 md:p-8 lg:p-10 relative z-10">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
              <div className="flex items-start lg:items-center mb-6 lg:mb-0">
                <Logo 
                  size="medium" 
                  variant="white" 
                  background="dark" 
                  className="mr-4 hidden md:block" 
                />
                <div>
                  <div className="flex items-center mb-1">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-light tracking-tight">Welcome back, Jonathan</h1>
                    <div className="hidden md:block w-1.5 h-1.5 bg-white rounded-full mx-3"></div>
                    <span className="hidden md:block text-xs uppercase tracking-wider text-gray-300">PREMIUM CLIENT</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-300">Last login: Today at 10:28 AM from Zürich, Switzerland</p>
                  <div className="hidden md:flex items-center mt-6 text-sm">
                    <span className="flex items-center mr-8">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                      All accounts secure
                    </span>
                    <span className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                      Market status: Open
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col xs:flex-row lg:flex-col space-y-0 xs:space-y-0 lg:space-y-3 space-x-0 xs:space-x-4 lg:space-x-0">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black text-xs transition-all duration-200 transform active:scale-95 focus:ring-2 focus:ring-white focus:ring-opacity-50 h-10 mb-3 xs:mb-0 lg:mb-0 w-full"
                  onClick={() => navigate("/security")}
                >
                  <ShieldIcon className="h-4 w-4 mr-2" />
                  <span className="whitespace-nowrap">SECURITY CENTER</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black text-xs transition-all duration-200 transform active:scale-95 focus:ring-2 focus:ring-white focus:ring-opacity-50 h-10 w-full"
                  onClick={() => navigate("/profile")}
                >
                  <span className="whitespace-nowrap">ACCOUNT SETTINGS</span>
                </Button>
              </div>
            </div>
            
            {/* Date and notifications row for desktop */}
            <div className="hidden md:flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
              <div className="text-sm text-gray-300">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="flex items-center space-x-6">
                <div className="relative cursor-pointer transform hover:scale-105 active:scale-95 transition-transform duration-200">
                  <BellIcon className="h-6 w-6 text-white" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-white rounded-full"></span>
                </div>
                <span className="text-sm">3 new notifications</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Premium Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10 mb-8 md:mb-10">
          {/* Main Content - Wider on large screens */}
          <div className="lg:col-span-2 xl:col-span-3 space-y-8 md:space-y-10">
            {/* Account Overview Section */}
            <section className="bg-white border border-gray-200">
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center p-5 border-b border-gray-200">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold mb-1 xs:mb-0">Account Overview</h2>
                  <p className="text-xs text-gray-500 hidden md:block">Manage all your accounts in one place</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="hidden md:flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600 mr-6">All accounts active</span>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs min-h-[36px] active:scale-95 transition-transform w-full xs:w-auto">
                    <PlusIcon className="h-3 w-3 mr-1" /> NEW ACCOUNT
                  </Button>
                </div>
              </div>
              
              {/* Mobile Account Cards */}
              <div className="space-y-3 md:hidden">
                {accounts.map((account) => (
                  <div 
                    key={account.id}
                    className={`border ${account.currency === selectedCurrency ? 'border-black' : 'border-gray-200'} p-4 rounded-lg bg-white cursor-pointer active:bg-gray-50 transition-colors`}
                    onClick={() => setSelectedCurrency(account.currency)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{account.name}</span>
                          {account.currency === selectedCurrency && (
                            <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-black text-white">Primary</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">SS-{account.id}-2025-{Math.floor(1000 + Math.random() * 9000)}</div>
                      </div>
                      <div className="text-sm">{account.currency}</div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-lg font-semibold">
                        {account.currency === "EUR" && "€"}
                        {account.currency === "USD" && "$"}
                        {account.currency === "GBP" && "£"}
                        {account.balance.toFixed(2)}
                      </div>
                      <button 
                        className="text-xs font-semibold text-gray-600 hover:text-black transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCurrency(account.currency);
                          toast({
                            title: "Account details",
                            description: `Viewing details for ${account.name}.`,
                          });
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Desktop Account Table */}
              <div className="hidden md:flex flex-col border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-1/4">Account Name</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-1/4">Account Number</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider w-1/6">Currency</th>
                        <th className="py-3 px-6 text-right text-xs font-medium text-gray-600 uppercase tracking-wider w-1/6">Available Balance</th>
                        <th className="py-3 px-6 text-center text-xs font-medium text-gray-600 uppercase tracking-wider w-1/6">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map((account, index) => (
                        <tr 
                          key={account.id} 
                          className={`hover:bg-gray-50 cursor-pointer ${
                            account.currency === selectedCurrency ? 'bg-gray-50 border-l-2 border-black' : 'border-l-2 border-transparent'
                          } ${index !== accounts.length - 1 ? 'border-b border-gray-200' : ''}`}
                          onClick={() => setSelectedCurrency(account.currency)}
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-3 ${account.balance > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <div>
                                <div className="font-medium text-black">{account.name}</div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {account.currency === selectedCurrency ? 'Primary Account' : 'Standard Account'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-mono text-sm">
                              SS-{account.id}-2025-{Math.floor(1000 + Math.random() * 9000)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="w-6 h-6 border border-gray-200 rounded-full flex items-center justify-center text-xs mr-2">
                                {account.currency === "EUR" && "€"}
                                {account.currency === "USD" && "$"}
                                {account.currency === "GBP" && "£"}
                              </div>
                              <span>{account.currency}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right font-semibold">
                            {formatCurrency(account.balance, account.currency)}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-3 active:scale-95 transition-transform"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsTransferModalOpen(true);
                                }}
                              >
                                <ArrowRightLeftIcon className="h-3.5 w-3.5 mr-1" />
                                <span className="text-xs">TRANSFER</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0 active:scale-95 transition-transform"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toast({
                                    title: "Account details",
                                    description: `Viewing details for ${account.name}.`,
                                  });
                                }}
                              >
                                <SquareIcon className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center px-6 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Positive balance</span>
                    <div className="w-2 h-2 bg-red-500 rounded-full ml-4 mr-2"></div>
                    <span>Negative balance</span>
                  </div>
                  <div className="flex items-center">
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                    <Button variant="ghost" size="sm" className="ml-2 h-6 w-6 p-0">
                      <ArrowDownIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Primary Account Highlight */}
              <div className="bg-black text-white p-5 sm:p-6 md:p-8 rounded-lg md:rounded-none">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-xs md:text-sm font-light uppercase tracking-wider mb-1">Primary Account</h3>
                    <div className="text-lg md:text-xl font-light mb-2 md:mb-4">{mainAccount.name}</div>
                    <div className="text-3xl md:text-4xl font-light">
                      {mainAccount.currency === "EUR" && "€"}
                      {mainAccount.currency === "USD" && "$"}
                      {mainAccount.currency === "GBP" && "£"}
                      {mainAccount.balance.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2 sm:space-y-2">
                    <Button 
                      className="flex-1 sm:w-full border border-white text-white hover:bg-white hover:text-black text-xs transition-colors duration-200 active:scale-95"
                      onClick={() => setIsTransferModalOpen(true)}
                      title="Transfer funds between accounts"
                    >
                      TRANSFER
                    </Button>
                    <Button 
                      className="flex-1 sm:w-full border border-white text-white hover:bg-white hover:text-black text-xs transition-colors duration-200 active:scale-95"
                      onClick={() => setIsStatementModalOpen(true)}
                      title="View and download account statements"
                    >
                      STATEMENTS
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Upcoming Payments Section */}
            <section className="bg-white border border-gray-200">
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center p-5 border-b border-gray-200">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold mb-1 xs:mb-0">Upcoming Payments</h2>
                  <p className="text-xs text-gray-500 hidden md:block">Your scheduled payments for the next 30 days</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-xs min-h-[36px] active:scale-95 transition-transform w-full xs:w-auto"
                  >
                    <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                    SCHEDULE PAYMENT
                  </Button>
                </div>
              </div>
              
              <div className="p-5">
                <UpcomingPayments />
              </div>
              
              <div className="flex justify-between items-center px-6 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
                <span>All payments will be processed automatically</span>
                <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                  View payment history
                </Button>
              </div>
            </section>
            
            {/* Recent Transactions Section */}
            <section className="bg-white border border-gray-200">
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center p-5 border-b border-gray-200">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold mb-1 xs:mb-0">Recent Transactions</h2>
                  <p className="text-xs text-gray-500 hidden md:block">Latest financial activity across your accounts</p>
                </div>
                <div className="flex items-center gap-2 w-full xs:w-auto">
                  <div className="hidden md:flex items-center mr-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 p-0 pr-2 text-xs"
                    >
                      Today
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 p-0 px-2 text-xs"
                    >
                      Last 7 days
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 p-0 px-2 text-xs"
                    >
                      Last 30 days
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs min-h-[36px] flex-1 xs:flex-initial active:scale-95 transition-transform"
                    onClick={() => {
                      toast({
                        title: "Filter applied",
                        description: "Transactions have been filtered by your selection.",
                      });
                    }}
                    title="Filter transactions by date or category"
                  >
                    <CalendarIcon className="h-3 w-3 mr-1" /> FILTER
                  </Button>
                  <Button 
                    onClick={() => navigate("/transactions")}
                    variant="outline"
                    size="sm"
                    className="text-xs min-h-[36px] flex-1 xs:flex-initial active:scale-95 transition-transform"
                  >
                    VIEW ALL
                  </Button>
                </div>
              </div>
              
              {/* Mobile Transaction List */}
              <div className="space-y-3 md:hidden">
                {recentTransactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="border border-gray-200 p-4 rounded-lg bg-white active:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{transaction.name}</div>
                      <div className={`font-medium ${transaction.amount < 0 ? 'text-gray-700' : 'text-green-700'}`}>
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600">{formatDate(transaction.date)}</span>
                      <span className="inline-block py-1 px-2 text-xs bg-gray-100 text-gray-700 rounded">
                        {transaction.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Desktop Transaction Table */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-500">
                      <th className="px-5 py-3 font-medium">Transaction</th>
                      <th className="px-5 py-3 font-medium">Date</th>
                      <th className="px-5 py-3 font-medium">Category</th>
                      <th className="px-5 py-3 font-medium text-right">Amount</th>
                      <th className="px-5 py-3 font-medium w-24 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((transaction, index) => (
                      <tr 
                        key={transaction.id} 
                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer`}
                        onClick={() => {
                          toast({
                            title: "Transaction details",
                            description: `Viewing details for ${transaction.name}.`,
                          });
                        }}
                      >
                        <td className="px-5 py-4">
                          <div className="font-medium">{transaction.name}</div>
                          <div className="text-xs text-gray-500">
                            {transaction.amount < 0 ? 'Debit' : 'Credit'} • Ref: SS-{Math.floor(100000 + Math.random() * 900000)}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm">{formatDate(transaction.date)}</td>
                        <td className="px-5 py-4">
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded">{transaction.category}</span>
                        </td>
                        <td className={`px-5 py-4 text-right font-semibold ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {formatCurrency(transaction.amount, transaction.currency)}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-7 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                toast({
                                  title: "Download receipt",
                                  description: `Downloading receipt for ${transaction.name}.`,
                                });
                              }}
                            >
                              <ArrowDownIcon className="h-3.5 w-3.5" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 w-7 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                toast({
                                  title: "Dispute transaction",
                                  description: `Initiating dispute for ${transaction.name}.`,
                                });
                              }}
                            >
                              <ShieldIcon className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="flex justify-between items-center px-6 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
                  <span>Showing {recentTransactions.length} most recent transactions</span>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-xs p-0 h-auto"
                    onClick={() => navigate("/transactions")}
                  >
                    View all transactions
                  </Button>
                </div>
              </div>
            </section>
            
            {/* Banking Services Section */}
            <section className="bg-white border border-gray-200">
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center p-5 border-b border-gray-200">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold mb-1 xs:mb-0">Banking Services</h2>
                  <p className="text-xs text-gray-500 hidden md:block">Quick access to essential financial services</p>
                </div>
              </div>
              
              <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
                <div 
                  className="bg-white border border-gray-200 hover:border-black text-center p-4 md:p-6 rounded-lg md:rounded-none transition-colors duration-200 cursor-pointer active:bg-gray-50"
                  onClick={() => navigate("/transactions")}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-black mb-3 flex items-center justify-center">
                      <PlusIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-sm mb-1">Transfers</span>
                    <span className="text-xs text-gray-600">Send payments</span>
                  </div>
                </div>
                
                <div 
                  className="bg-white border border-gray-200 hover:border-black text-center p-6 transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsDepositModalOpen(true)}
                  title="Add funds to your account"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-black mb-3 flex items-center justify-center">
                      <ArrowDownIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-sm mb-1">Deposits</span>
                    <span className="text-xs text-gray-600">Fund your accounts</span>
                  </div>
                </div>
                
                <div 
                  className="bg-white border border-gray-200 hover:border-black text-center p-6 transition-colors duration-200 cursor-pointer"
                  onClick={() => navigate("/exchange")}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-black mb-3 flex items-center justify-center">
                      <ArrowRightLeftIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-sm mb-1">Exchange</span>
                    <span className="text-xs text-gray-600">Convert currencies</span>
                  </div>
                </div>
                
                <div 
                  className="bg-white border border-gray-200 hover:border-black text-center p-6 transition-colors duration-200 cursor-pointer"
                  onClick={() => setIsCardModalOpen(true)}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-black mb-3 flex items-center justify-center">
                      <SquareIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-sm mb-1">Cards</span>
                    <span className="text-xs text-gray-600">Manage your cards</span>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Market Insights Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Market Insights</h2>
              </div>
              
              <MarketInsights />
            </section>
          </div>
          
          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-8">
            {/* Notifications Center */}
            <NotificationsCenter />
            
            {/* Statement Generator */}
            <StatementGenerator />
            
            {/* Portfolio Summary Section */}
            <PortfolioSummary />
            
            {/* Investment Overview Section */}
            <InvestmentOverview />
            
            {/* Market Snapshot Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Market Snapshot</h2>
              <MarketSnapshot />
            </div>
            
            {/* Compliance Status */}
            <ComplianceStatus />
            
            {/* Linked Accounts Section */}
            <LinkedAccounts />
            
            {/* Bank Profile Section */}
            <BankProfile />
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Transfer Modal */}
      <TransferModal 
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        fromAccount={mainAccount}
      />
      
      {/* Statement Modal */}
      <StatementModal
        isOpen={isStatementModalOpen}
        onClose={() => setIsStatementModalOpen(false)}
        account={mainAccount}
      />
      
      {/* Card Management Modal */}
      <CardManagementModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      />
      
      {/* Deposit Modal */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        account={mainAccount}
      />
    </div>
  );
}

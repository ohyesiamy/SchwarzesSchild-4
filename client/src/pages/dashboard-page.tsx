import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Footer } from "@/components/layout/footer";
import { Logo } from "@/components/ui/logo";

import { MarketSnapshot } from "@/components/dashboard/market-snapshot";
import { PortfolioSummary } from "@/components/dashboard/portfolio-summary";
import { ComplianceNotification } from "@/components/dashboard/compliance-notification";

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
  CreditCardIcon,
  UserIcon
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
      
      <main className="py-5 px-4 container mx-auto flex-grow mb-20 md:mb-0 max-w-[1440px]">
        {/* Mobile optimized header */}
        <div className="flex flex-col mb-5">
          <h1 className="text-lg font-medium tracking-tight mb-1.5">Dashboard</h1>
          <div className="w-8 h-0.5 bg-black"></div>
        </div>
        
        {/* Mobile only welcome message - hidden on desktop */}
        <div className="mb-6 flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between md:hidden">
          <p className="text-sm text-gray-600">Welcome back, Jonathan</p>
          <div className="text-xs text-gray-600 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span>All accounts secure</span>
          </div>
        </div>
        
        {/* Welcome Banner - Desktop only */}
        <div className="hidden md:block bg-black text-white mb-5 shadow-sm rounded-none relative overflow-hidden border-b border-gray-800">
          <div className="relative">
            <div className="p-4 md:p-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Logo 
                    size="small" 
                    variant="white" 
                    background="dark" 
                    className="mr-4 hidden md:block" 
                  />
                  <div>
                    <div className="flex items-center">
                      <h1 className="text-base font-light tracking-tight text-white">Welcome back, Jonathan</h1>
                      <div className="mx-3 text-gray-600">|</div>
                      <span className="text-[10px] uppercase tracking-wider font-medium text-white bg-gray-800 px-2 py-0.5">Premium Client</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">Last login: Today at 10:28 AM from Zürich, Switzerland</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 border border-gray-700 bg-transparent text-white hover:bg-white hover:text-black rounded-none text-[10px] uppercase tracking-wide"
                    onClick={() => navigate("/security")}
                  >
                    <ShieldIcon className="h-3 w-3 mr-1.5" />
                    Security
                  </Button>
                  <Button
                    variant="outline"
                    size="sm" 
                    className="h-7 border border-gray-700 bg-transparent text-white hover:bg-white hover:text-black rounded-none text-[10px] uppercase tracking-wide"
                    onClick={() => navigate("/profile")}
                  >
                    <UserIcon className="h-3 w-3 mr-1.5" />
                    Settings
                  </Button>
                </div>
              </div>
              
              {/* Security indicators */}
              <div className="flex items-center mt-3 pt-3 border-t border-gray-800">
                <div className="flex items-center space-x-5">
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                    <span className="text-[10px] uppercase tracking-wide text-gray-400">2FA Enabled</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                    <span className="text-[10px] uppercase tracking-wide text-gray-400">All Accounts Secure</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[10px] uppercase tracking-wide text-gray-400">FINMA Protected</span>
                  </div>
                </div>
                
                <div className="ml-auto flex items-center">
                  <div className="relative mr-2">
                    <BellIcon className="h-3.5 w-3.5 text-gray-400" />
                    <span className="absolute -top-1 -right-1 h-1.5 w-1.5 bg-green-500 rounded-full"></span>
                  </div>
                  <span className="text-[10px] text-gray-400">3 notifications</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional Dashboard Layout - Enhanced Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 mb-6 md:mb-8">
          {/* Main Content - Primary Column */}
          <div className="lg:col-span-8 space-y-5 lg:border-r border-gray-200 lg:pr-6">
            {/* Account Overview Section */}
            <section className="bg-white border border-black shadow-sm mb-5">
              <div className="flex items-center justify-between p-2.5 border-b border-black bg-gray-50">
                <h2 className="text-xs uppercase tracking-wide font-medium">Account Overview</h2>
                <Button variant="outline" size="sm" className="h-7 text-[10px] rounded-none border-black">
                  <PlusIcon className="h-3 w-3 mr-1" /> NEW ACCOUNT
                </Button>
              </div>
              
              {/* Mobile Account Cards - Premium Bank Design */}
              <div className="md:hidden">
                <div className="p-4 bg-black text-white">
                  <div className="mb-1 text-xs uppercase tracking-wider text-gray-400">Total Balance</div>
                  <div className="text-2xl font-light mb-3">
                    €{accounts.reduce((total, account) => total + account.balance, 0).toFixed(2)}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">Last updated: Today, 11:42 AM</div>
                    <div className="text-xs text-gray-400 flex items-center">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                      <span>All accounts secure</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white">
                  {accounts.map((account, index) => (
                    <div 
                      key={account.id}
                      className={`
                        relative px-4 py-5 bg-white cursor-pointer active:bg-gray-50 transition-colors
                        ${index !== accounts.length - 1 ? 'border-b border-gray-200' : ''}
                        ${account.currency === selectedCurrency ? 'bg-gray-50' : ''}
                      `}
                      onClick={() => setSelectedCurrency(account.currency)}
                    >
                      {account.currency === selectedCurrency && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
                      )}
                      
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 border border-gray-200 flex items-center justify-center mr-4 text-xs font-medium">
                            {account.currency}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <div className="font-medium text-sm mr-2">{account.name}</div>
                              {account.currency === selectedCurrency && (
                                <div className="px-1.5 py-0.5 bg-black text-white text-[10px] font-medium">PRIMARY</div>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 font-mono tracking-tight">••••{Math.floor(1000 + Math.random() * 9000)}</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xl font-semibold leading-none">
                            {account.currency === "EUR" && "€"}
                            {account.currency === "USD" && "$"}
                            {account.currency === "GBP" && "£"}
                            {account.balance.toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Available immediately</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-2 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex space-x-3">
                          <button className="flex items-center text-xs font-medium text-gray-600 hover:text-black"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/transactions");
                            }}
                          >
                            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                            Transactions
                          </button>
                          <button className="flex items-center text-xs font-medium text-gray-600 hover:text-black"
                            onClick={(e) => {
                              e.stopPropagation();
                              toast({
                                title: "Account Details",
                                description: "Viewing complete account details",
                              });
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                            Details
                          </button>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-3 py-0 text-xs rounded-none border-black"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsTransferModalOpen(true);
                          }}
                        >
                          <ArrowRightLeftIcon className="h-3.5 w-3.5 mr-1.5" />
                          Transfer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Desktop Account Overview - Premium Bank Design */}
              <div className="hidden md:block">
                {/* Total Balance Header */}
                <div className="flex bg-black text-white">
                  <div className="w-1/2 p-5 border-r border-gray-800">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium letter-spacing-wide">Total Balance</div>
                        <div className="text-2xl font-light mt-1">
                          €{accounts.reduce((total, account) => total + account.balance, 0).toFixed(2)}
                        </div>
                      </div>
                      <div className="px-2 py-1 border border-gray-700 text-[10px] bg-black">
                        <span className="uppercase tracking-wide">As of {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    <div className="flex space-x-6 mt-3">
                      <div className="flex items-center">
                        <div className="w-1 h-1 bg-green-400 rounded-full mr-1"></div>
                        <span className="text-[10px] uppercase tracking-wide text-gray-300">FDIC Insured</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1 h-1 bg-green-400 rounded-full mr-1"></div>
                        <span className="text-[10px] uppercase tracking-wide text-gray-300">Accounts Secure</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1 h-1 bg-yellow-400 rounded-full mr-1"></div>
                        <span className="text-[10px] uppercase tracking-wide text-gray-300">1 Pending</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-1/2 p-5 flex items-center">
                    <div className="grid grid-cols-3 gap-3 w-full">
                      <Button 
                        variant="outline"
                        className="border border-gray-700 bg-black hover:bg-gray-900 text-white h-9 rounded-none" 
                        onClick={() => setIsTransferModalOpen(true)}
                      >
                        <ArrowRightLeftIcon className="h-3.5 w-3.5 mr-1.5" />
                        <span className="text-xs uppercase tracking-wide">Transfer</span>
                      </Button>
                      <Button 
                        variant="outline"
                        className="border border-gray-700 bg-black hover:bg-gray-900 text-white h-9 rounded-none" 
                        onClick={() => navigate("/cards")}
                      >
                        <CreditCardIcon className="h-3.5 w-3.5 mr-1.5" />
                        <span className="text-xs uppercase tracking-wide">Cards</span>
                      </Button>
                      <Button 
                        variant="outline"
                        className="border border-gray-700 bg-black hover:bg-gray-900 text-white h-9 rounded-none" 
                        onClick={() => setIsStatementModalOpen(true)}
                      >
                        <SquareIcon className="h-3.5 w-3.5 mr-1.5" />
                        <span className="text-xs uppercase tracking-wide">Statements</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Accounts Table */}
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed border-collapse">
                    <thead>
                      <tr className="bg-gray-100 border-b border-black">
                        <th className="py-3 px-6 text-left text-[10px] font-medium text-gray-700 uppercase tracking-wider w-1/4">Account</th>
                        <th className="py-3 px-6 text-left text-[10px] font-medium text-gray-700 uppercase tracking-wider w-1/4">Account Number</th>
                        <th className="py-3 px-6 text-left text-[10px] font-medium text-gray-700 uppercase tracking-wider w-1/6">Currency</th>
                        <th className="py-3 px-6 text-right text-[10px] font-medium text-gray-700 uppercase tracking-wider w-1/6">Available Balance</th>
                        <th className="py-3 px-6 text-right text-[10px] font-medium text-gray-700 uppercase tracking-wider w-1/6">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map((account, index) => (
                        <tr 
                          key={account.id} 
                          className={`hover:bg-gray-50 cursor-pointer ${
                            index !== accounts.length - 1 ? 'border-b border-gray-200' : ''
                          }`}
                          onClick={() => setSelectedCurrency(account.currency)}
                        >
                          <td className="py-5 px-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 border border-gray-200 flex items-center justify-center">
                                <span className="text-sm font-medium">{account.currency}</span>
                              </div>
                              <div>
                                <div className="font-medium">{account.name}</div>
                                <div className="flex items-center mt-1">
                                  {account.currency === selectedCurrency && (
                                    <span className="text-xs bg-black text-white px-2 py-0.5 mr-2">PRIMARY</span>
                                  )}
                                  <span className="text-xs text-gray-500">
                                    {account.balance > 20000 ? 'Premium Account' : 'Standard Account'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-6 font-mono text-sm">
                            <div className="flex items-center">
                              <span>••• {Math.floor(1000 + Math.random() * 9000)}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 ml-2 text-gray-500 hover:text-black"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toast({
                                    title: "Account details",
                                    description: "Account number copied to clipboard.",
                                  });
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                              </Button>
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="inline-block px-3 py-1 border border-gray-200 text-sm">
                              {account.currency}
                            </div>
                          </td>
                          <td className="py-5 px-6 text-right">
                            <div className="font-semibold text-xl">
                              {formatCurrency(account.balance, account.currency)}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Available immediately
                            </div>
                          </td>
                          <td className="py-5 px-6">
                            <div className="inline-flex">
                              <div className="flex flex-col items-end space-y-1 border-r border-gray-200 pr-3 mr-3">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 px-2 rounded-none hover:bg-black hover:text-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsTransferModalOpen(true);
                                  }}
                                >
                                  <ArrowRightLeftIcon className="h-3.5 w-3.5 mr-1.5" />
                                  <span className="text-xs">Transfer</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7 px-2 rounded-none hover:bg-black hover:text-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate("/transactions");
                                  }}
                                >
                                  <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                                  <span className="text-xs">History</span>
                                </Button>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-full w-10 rounded-none border-black"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toast({
                                    title: "Account options",
                                    description: "More options for this account",
                                  });
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Primary Account Highlight */}
              <div className="bg-black text-white p-4 sm:p-5 rounded-none">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div className="mb-3 sm:mb-0">
                    <h3 className="text-[10px] font-medium uppercase tracking-wider mb-1 text-gray-400">Primary Account</h3>
                    <div className="text-sm md:text-base font-light mb-1.5">{mainAccount.name}</div>
                    <div className="text-2xl md:text-3xl font-light tracking-tight">
                      {mainAccount.currency === "EUR" && "€"}
                      {mainAccount.currency === "USD" && "$"}
                      {mainAccount.currency === "GBP" && "£"}
                      {mainAccount.balance.toFixed(2)}
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="w-1 h-1 bg-green-400 rounded-full mr-1"></div>
                      <span className="text-[10px] uppercase tracking-wide text-gray-400">Available immediately</span>
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2 sm:space-y-2">
                    <Button 
                      size="sm"
                      className="h-8 border border-gray-700 bg-transparent text-white hover:bg-white hover:text-black rounded-none text-[10px] uppercase tracking-wide transition-colors duration-200 active:scale-95"
                      onClick={() => setIsTransferModalOpen(true)}
                      title="Transfer funds between accounts"
                    >
                      <ArrowRightLeftIcon className="h-3 w-3 mr-1.5" />
                      Transfer
                    </Button>
                    <Button 
                      size="sm"
                      className="h-8 border border-gray-700 bg-transparent text-white hover:bg-white hover:text-black rounded-none text-[10px] uppercase tracking-wide transition-colors duration-200 active:scale-95"
                      onClick={() => setIsStatementModalOpen(true)}
                      title="View and download account statements"
                    >
                      <SquareIcon className="h-3 w-3 mr-1.5" />
                      Statements
                    </Button>
                  </div>
                </div>
                
                <div className="mt-3 border-t border-gray-800 pt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wide">Account No.</div>
                      <div className="text-xs font-mono">••••{Math.floor(1000 + Math.random() * 9000)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-wide">SWIFT</div>
                      <div className="text-xs font-mono">SSHILDES</div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 border border-gray-700 text-white hover:bg-white hover:text-black rounded-none text-[10px]"
                    onClick={() => navigate("/transactions")}
                  >
                    View History
                  </Button>
                </div>
              </div>
            </section>
            
            {/* Upcoming Payments Section */}
            <section className="bg-white border border-gray-200">
              <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center p-2.5 border-b border-gray-200">
                <div>
                  <h2 className="text-xs uppercase tracking-wide font-medium">Upcoming Payments</h2>
                  <p className="text-[10px] text-gray-500 hidden md:block mt-0.5">Your scheduled payments for the next 30 days</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-[10px] uppercase tracking-wide h-7 active:scale-95 transition-transform w-full xs:w-auto rounded-none border-black"
                  >
                    <CalendarIcon className="h-3 w-3 mr-1.5" />
                    Schedule Payment
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
            <section className="bg-white border border-black shadow-sm mb-6">
              <div className="flex items-center justify-between p-3 border-b border-black bg-gray-50">
                <h2 className="text-base font-semibold">Recent Transactions</h2>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-xs rounded-none border-black hidden sm:flex"
                    onClick={() => {
                      toast({
                        title: "Filter applied",
                        description: "Transactions have been filtered by your selection.",
                      });
                    }}
                  >
                    <CalendarIcon className="h-3.5 w-3.5 mr-1.5" /> Filter
                  </Button>
                  <Button 
                    onClick={() => navigate("/transactions")}
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs rounded-none border-black"
                  >
                    View All
                  </Button>
                </div>
              </div>
              
              {/* Desktop filter options - hidden on mobile */}
              <div className="hidden md:flex items-center p-3 border-b border-gray-200 bg-gray-50">
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
              
              {/* Mobile Transaction List */}
              <div className="divide-y divide-gray-100 md:hidden">
                {recentTransactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="p-4 hover:bg-gray-50 active:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full ${
                          transaction.amount >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {transaction.amount >= 0 ? '+' : '-'}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{transaction.name}</div>
                          <div className="text-xs text-gray-500 flex items-center mt-0.5">
                            <span>{formatDate(transaction.date)}</span>
                            <span className="mx-1">•</span>
                            <span>{transaction.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </div>
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
            
            {/* Market Insights Section - Enhanced */}
            <section className="bg-white border border-gray-200">
              <div className="flex justify-between items-center p-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Market Insights</h2>
                <div className="text-xs bg-gray-100 px-2 py-1">LIVE DATA</div>
              </div>
              <div className="p-5">
                <MarketInsights />
              </div>
            </section>
            
            {/* Quick Actions Panel - NEW */}
            <section className="bg-white border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center justify-center p-4 border border-gray-100 hover:border-black transition-colors cursor-pointer">
                    <ArrowRightLeftIcon className="h-5 w-5 mb-2" />
                    <span className="text-xs font-medium text-center">New Transfer</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-4 border border-gray-100 hover:border-black transition-colors cursor-pointer">
                    <SquareIcon className="h-5 w-5 mb-2" />
                    <span className="text-xs font-medium text-center">Pay Bill</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-4 border border-gray-100 hover:border-black transition-colors cursor-pointer">
                    <CreditCardIcon className="h-5 w-5 mb-2" />
                    <span className="text-xs font-medium text-center">Card Settings</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center p-4 border border-gray-100 hover:border-black transition-colors cursor-pointer">
                    <CalendarIcon className="h-5 w-5 mb-2" />
                    <span className="text-xs font-medium text-center">Scheduled</span>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Linked Accounts Section */}
            <section className="bg-white border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold">External Accounts</h3>
              </div>
              <div className="p-5">
                <LinkedAccounts />
              </div>
            </section>
          </div>
          
          {/* Sidebar - Financial Insights Column */}
          <div className="lg:col-span-4 space-y-6 pl-0 lg:pl-6">
            {/* Account Activity Group */}
            <div className="bg-white border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Account Activity</h3>
              </div>
              <div className="p-5 space-y-6">
                {/* Notifications Center */}
                <NotificationsCenter />
                
                {/* Statement Generator */}
                <StatementGenerator />
              </div>
            </div>
            
            {/* Investment Group */}
            <div className="bg-white border border-gray-200">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Investment Overview</h3>
              </div>
              <div className="p-5 space-y-6">
                {/* Portfolio Summary Section */}
                <PortfolioSummary />
                
                {/* Investment Overview Section */}
                <InvestmentOverview />
                
                {/* Market Snapshot Section */}
                <div className="pt-4 border-t border-gray-100 mt-4">
                  <div className="flex justify-between items-center mb-3 pt-4">
                    <h4 className="text-base font-medium">Market Snapshot</h4>
                    <span className="text-xs bg-gray-100 px-2 py-1">REAL-TIME</span>
                  </div>
                  <MarketSnapshot />
                </div>
              </div>
            </div>
            

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

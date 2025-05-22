import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
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
import { Button } from "@/components/ui/button";
import { PlusIcon, ArrowDownIcon, ArrowRightLeftIcon, SquareIcon, CalendarIcon, BellIcon, ShieldIcon } from "lucide-react";
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
  
  const mainAccount = accounts.find(account => account.currency === selectedCurrency) || accounts[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation active="dashboard" />
      
      <main className="py-10 px-6 container mx-auto flex-grow">
        {/* Welcome Banner */}
        <div className="bg-black text-white p-8 mb-10 shadow-lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-light mb-2 tracking-tight">Welcome back, Jonathan</h1>
              <p className="text-sm text-gray-100">Last login: Today at 10:28 AM from Zürich, Switzerland</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black text-xs transition-all duration-200 transform hover:scale-[1.01] focus:ring-2 focus:ring-white focus:ring-opacity-50"
                onClick={() => navigate("/security")}
              >
                <ShieldIcon className="h-4 w-4 mr-2" />
                SECURITY CENTER
              </Button>
              <div className="relative cursor-pointer transform hover:scale-105 transition-transform duration-200">
                <BellIcon className="h-6 w-6 text-white" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-white rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-10">
            {/* Account Overview Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Account Overview</h2>
                <Button variant="outline" size="sm" className="text-xs">
                  <PlusIcon className="h-3 w-3 mr-1" /> NEW ACCOUNT
                </Button>
              </div>
              
              {/* Premium full-width account overview card */}
              <div className="bg-white border border-gray-200 mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Account Name</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Account Number</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Currency</th>
                        <th className="py-4 px-6 text-right text-sm font-semibold text-gray-600">Available Balance</th>
                        <th className="py-4 px-6 text-right text-sm font-semibold text-gray-600"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map((account, index) => (
                        <tr 
                          key={account.id} 
                          className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} cursor-pointer hover:bg-gray-100`}
                          onClick={() => setSelectedCurrency(account.currency)}
                        >
                          <td className="py-4 px-6 font-medium">
                            {account.name}
                            {account.currency === selectedCurrency && (
                              <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-black text-white">Primary</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-gray-600">SS-{account.id}-2025-{Math.floor(1000 + Math.random() * 9000)}</td>
                          <td className="py-4 px-6">{account.currency}</td>
                          <td className="py-4 px-6 text-right font-semibold">
                            {account.currency === "EUR" && "€"}
                            {account.currency === "USD" && "$"}
                            {account.currency === "GBP" && "£"}
                            {account.balance.toFixed(2)}
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button className="text-xs font-semibold text-gray-600 hover:text-black">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Primary Account Highlight */}
              <div className="bg-black text-white p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-light uppercase tracking-wider mb-1">Primary Account</h3>
                    <div className="text-xl font-light mb-4">{mainAccount.name}</div>
                    <div className="text-4xl font-light">
                      {mainAccount.currency === "EUR" && "€"}
                      {mainAccount.currency === "USD" && "$"}
                      {mainAccount.currency === "GBP" && "£"}
                      {mainAccount.balance.toFixed(2)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full border border-white text-white hover:bg-white hover:text-black text-xs">
                      TRANSFER
                    </Button>
                    <Button className="w-full border border-white text-white hover:bg-white hover:text-black text-xs">
                      STATEMENTS
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Upcoming Payments Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Upcoming Payments</h2>
                <Button 
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  SCHEDULE PAYMENT
                </Button>
              </div>
              
              <UpcomingPayments />
            </section>
            
            {/* Recent Transactions Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Transactions</h2>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" className="text-xs">
                    <CalendarIcon className="h-3 w-3 mr-1" /> FILTER
                  </Button>
                  <Button 
                    onClick={() => navigate("/transactions")}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    VIEW ALL
                  </Button>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Description</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Date</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Category</th>
                        <th className="py-4 px-6 text-right text-sm font-semibold text-gray-600">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction, index) => (
                        <tr 
                          key={transaction.id} 
                          className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
                        >
                          <td className="py-4 px-6 font-medium">{transaction.name}</td>
                          <td className="py-4 px-6 text-sm text-gray-600">{formatDate(transaction.date)}</td>
                          <td className="py-4 px-6 text-sm">
                            <span className="inline-block py-1 px-2 text-xs bg-gray-100 text-gray-700">
                              {transaction.category}
                            </span>
                          </td>
                          <td className={`py-4 px-6 text-right font-medium ${transaction.amount < 0 ? 'text-gray-700' : 'text-green-700'}`}>
                            {formatCurrency(transaction.amount, transaction.currency)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            
            {/* Banking Services Section */}
            <section>
              <h2 className="text-xl font-semibold mb-6">Banking Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div 
                  className="bg-white border border-gray-200 hover:border-black text-center p-6 transition-colors duration-200 cursor-pointer"
                  onClick={() => navigate("/transactions")}
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-black mb-3 flex items-center justify-center">
                      <PlusIcon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-medium text-sm mb-1">Transfers</span>
                    <span className="text-xs text-gray-600">Send payments securely</span>
                  </div>
                </div>
                
                <div 
                  className="bg-white border border-gray-200 hover:border-black text-center p-6 transition-colors duration-200 cursor-pointer"
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
                  onClick={() => navigate("/cards")}
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
    </div>
  );
}

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { AccountCard } from "@/components/account/account-card";
import { TransactionItem } from "@/components/account/transaction-item";
import { Button } from "@/components/ui/button";
import { PlusIcon, ArrowDownIcon, ArrowRightLeftIcon, SquareIcon } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useLocation } from "wouter";

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
      
      <main className="py-8 px-6 container mx-auto flex-grow">
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-8">Account Overview</h2>
          
          {/* Premium full-width account overview card */}
          <div className="bg-white border-t border-b border-gray-200 mb-8">
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
          
          {/* Account Summary Card - Featured Account */}
          <div className="bg-black text-white p-8 mb-8">
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
              <div>
                <button className="border border-white hover:bg-white hover:text-black text-xs uppercase tracking-wide py-2 px-4 transition-colors duration-200">
                  Account Services
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Banking Services */}
        <div className="mb-14">
          <h2 className="text-2xl font-semibold mb-8">Banking Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 hover:border-black text-center p-8 transition-colors duration-200">
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black mb-4 flex items-center justify-center">
                  <PlusIcon className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-sm mb-2">Transfers</span>
                <span className="text-xs text-gray-600">Send payments securely</span>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 hover:border-black text-center p-8 transition-colors duration-200">
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black mb-4 flex items-center justify-center">
                  <ArrowDownIcon className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-sm mb-2">Deposits</span>
                <span className="text-xs text-gray-600">Fund your accounts</span>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 hover:border-black text-center p-8 transition-colors duration-200">
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black mb-4 flex items-center justify-center">
                  <ArrowRightLeftIcon className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-sm mb-2">Exchange</span>
                <span className="text-xs text-gray-600">Convert currencies</span>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 hover:border-black text-center p-8 transition-colors duration-200">
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black mb-4 flex items-center justify-center">
                  <SquareIcon className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-sm mb-2">Cards</span>
                <span className="text-xs text-gray-600">Manage your cards</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Transactions */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Recent Transactions</h2>
            <button 
              onClick={() => navigate("/transactions")}
              className="text-sm font-medium text-gray-600 hover:text-black"
            >
              View All Transactions
            </button>
          </div>
          
          <div className="bg-white border-t border-b border-gray-200">
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
        </div>
      </main>
    </div>
  );
}

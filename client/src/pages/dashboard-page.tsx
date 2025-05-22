import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { AccountCard } from "@/components/account/account-card";
import { TransactionItem } from "@/components/account/transaction-item";
import { Button } from "@/components/ui/button";
import { PlusIcon, ArrowDownIcon, ArrowRightLeftIcon, SquareIcon } from "lucide-react";
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
      
      <main className="py-8 px-4 container mx-auto flex-grow">
        <div className="mb-10">
          <h2 className="text-3xl font-playfair mb-6">Account Balance</h2>
          
          <div className="border-2 border-black p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">{mainAccount.name}</span>
              <div className="flex items-center">
                <span className="mr-2 text-lg font-bold">{mainAccount.currency}</span>
                <div className="relative">
                  <select 
                    className="appearance-none bg-white border-2 border-black py-1 pl-3 pr-8 focus:outline-none"
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                  >
                    {accounts.map(account => (
                      <option key={account.id} value={account.currency}>
                        {account.currency}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-5xl font-playfair font-bold">
              {mainAccount.currency === "EUR" && "€"}
              {mainAccount.currency === "USD" && "$"}
              {mainAccount.currency === "GBP" && "£"}
              {mainAccount.balance.toFixed(2)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accounts
              .filter(account => account.currency !== selectedCurrency)
              .map(account => (
                <AccountCard 
                  key={account.id}
                  account={account}
                  onClick={() => setSelectedCurrency(account.currency)}
                />
              ))}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-3xl font-playfair mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => navigate("/transactions")}
              variant="outline" 
              className="border-2 border-black p-6 text-center h-auto flex flex-col items-center hover:bg-black hover:text-white transition-sharp"
            >
              <PlusIcon className="h-8 w-8 mb-2" />
              <span className="font-playfair">Send Money</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-2 border-black p-6 text-center h-auto flex flex-col items-center hover:bg-black hover:text-white transition-sharp"
            >
              <ArrowDownIcon className="h-8 w-8 mb-2" />
              <span className="font-playfair">Request</span>
            </Button>
            
            <Button 
              onClick={() => navigate("/exchange")}
              variant="outline" 
              className="border-2 border-black p-6 text-center h-auto flex flex-col items-center hover:bg-black hover:text-white transition-sharp"
            >
              <ArrowRightLeftIcon className="h-8 w-8 mb-2" />
              <span className="font-playfair">Exchange</span>
            </Button>
            
            <Button 
              onClick={() => navigate("/cards")}
              variant="outline" 
              className="border-2 border-black p-6 text-center h-auto flex flex-col items-center hover:bg-black hover:text-white transition-sharp"
            >
              <SquareIcon className="h-8 w-8 mb-2" />
              <span className="font-playfair">Cards</span>
            </Button>
          </div>
        </div>
        
        {/* Recent Transactions */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-playfair">Recent Transactions</h2>
            <button 
              onClick={() => navigate("/transactions")}
              className="font-playfair underline"
            >
              View All
            </button>
          </div>
          
          {recentTransactions.map(transaction => (
            <TransactionItem 
              key={transaction.id}
              transaction={transaction}
              showCategory={false}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

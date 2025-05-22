import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { TransactionItem } from "@/components/account/transaction-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TIME_FILTERS } from "@/lib/constants";

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
  },
  { 
    id: 4, 
    name: "Rent Payment", 
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), 
    amount: -1200.00, 
    currency: "EUR",
    category: "Housing" 
  },
  { 
    id: 5, 
    name: "Salary Deposit", 
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), 
    amount: 3450.00, 
    currency: "EUR",
    category: "Income" 
  }
];

export default function TransactionsPage() {
  const [selectedAccount, setSelectedAccount] = useState("all");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("30days");
  const [fromAccount, setFromAccount] = useState("EUR Account (€24,856.78)");
  const [toRecipient, setToRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation active="transactions" />
      
      <main className="py-8 px-4 container mx-auto flex-grow">
        <div className="mb-8">
          <h2 className="text-3xl font-playfair mb-6">Transfer Money</h2>
          <div className="border-2 border-black p-6">
            <form>
              <div className="mb-4">
                <label className="block mb-2 text-lg">From Account</label>
                <div className="relative">
                  <Select 
                    value={fromAccount} 
                    onValueChange={setFromAccount}
                  >
                    <SelectTrigger className="w-full appearance-none bg-white border-2 border-black p-3 pr-8 focus:outline-none">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR Account (€24,856.78)">EUR Account (€24,856.78)</SelectItem>
                      <SelectItem value="USD Account ($12,342.50)">USD Account ($12,342.50)</SelectItem>
                      <SelectItem value="GBP Account (£8,761.35)">GBP Account (£8,761.35)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-lg">To</label>
                <Input
                  type="text"
                  placeholder="Email, phone or account number"
                  className="w-full border-2 border-black p-3 focus:outline-none"
                  value={toRecipient}
                  onChange={(e) => setToRecipient(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-lg">Amount</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="0.00"
                    className="w-full border-2 border-black p-3 pl-8 focus:outline-none"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <span>€</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block mb-2 text-lg">Reference (Optional)</label>
                <Input
                  type="text"
                  placeholder="Add a reference"
                  className="w-full border-2 border-black p-3 focus:outline-none"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </div>
              
              <Button 
                type="button" 
                className="w-full bg-black text-white p-4 text-lg font-playfair"
              >
                CONTINUE
              </Button>
            </form>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-playfair">Transaction History</h2>
            <div className="flex items-center">
              <div className="relative mr-4">
                <Select 
                  value={selectedAccount} 
                  onValueChange={setSelectedAccount}
                >
                  <SelectTrigger className="appearance-none bg-white border-2 border-black py-1 pl-3 pr-8 focus:outline-none">
                    <SelectValue placeholder="All Accounts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Accounts</SelectItem>
                    <SelectItem value="EUR">EUR Account</SelectItem>
                    <SelectItem value="USD">USD Account</SelectItem>
                    <SelectItem value="GBP">GBP Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="relative">
                <Select 
                  value={selectedTimeFilter} 
                  onValueChange={setSelectedTimeFilter}
                >
                  <SelectTrigger className="appearance-none bg-white border-2 border-black py-1 pl-3 pr-8 focus:outline-none">
                    <SelectValue placeholder="Last 30 Days" />
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
          
          {/* Transactions List */}
          {allTransactions.map(transaction => (
            <TransactionItem 
              key={transaction.id}
              transaction={transaction}
              showCategory={true}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

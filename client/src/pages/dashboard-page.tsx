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
  // PlusIcon, 
  ArrowDownIcon, 
  ArrowRightLeftIcon, 
  SquareIcon, 
  // CalendarIcon, 
  // BellIcon, 
  // ShieldIcon,
  CreditCardIcon,
  // UserIcon
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useAccounts, useTransactions } from "@/lib/api-hooks";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("EUR");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  
  // Use real API data
  const { data: accounts = [], isLoading: accountsLoading } = useAccounts();
  const { data: transactions = [], isLoading: transactionsLoading } = useTransactions();
  
  const mainAccount = accounts.find(account => account.currency === selectedCurrency) || accounts[0];
  const recentTransactions = transactions.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation active="dashboard" />
      <MobileNavigation active="dashboard" />
      
      <main className="py-5 px-4 container mx-auto flex-grow mb-20 md:mb-0 max-w-[1440px]">
        {/* Mobile optimized header with logo */}
        <div className="flex flex-col mb-4 md:hidden">
          <div className="flex items-center mb-3">
            <Logo size="small" className="mr-3" variant="black" background="light" />
          </div>
          <h1 className="text-sm uppercase tracking-wide font-medium mb-1">Your Assets</h1>
          <div className="text-3xl font-medium mb-3">
            {accountsLoading ? (
              <Skeleton className="h-10 w-32" />
            ) : (
              formatCurrency(mainAccount?.balance || 0, mainAccount?.currency || 'EUR')
            )}
          </div>
        </div>

        {/* Desktop header */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <h1 className="text-2xl font-playfair">Welcome back</h1>
          <div className="text-sm text-gray-600">{formatDate(new Date())}</div>
        </div>

        {/* Currency selector */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          {accountsLoading ? (
            <>
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </>
          ) : (
            accounts.map((account) => (
              <Button
                key={account.id}
                variant={selectedCurrency === account.currency ? "default" : "outline"}
                onClick={() => setSelectedCurrency(account.currency)}
                className="flex-shrink-0"
              >
                {account.currency}
              </Button>
            ))
          )}
        </div>

        {/* Main account balance - Desktop */}
        <div className="hidden md:block bg-black text-white p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm uppercase tracking-wide mb-2">Current Balance</div>
              <div className="text-4xl font-light mb-1">
                {accountsLoading ? (
                  <Skeleton className="h-12 w-48 bg-gray-800" />
                ) : (
                  formatCurrency(mainAccount?.balance || 0, mainAccount?.currency || 'EUR')
                )}
              </div>
              <div className="text-sm text-gray-400">
                {mainAccount?.name || 'Main Account'}
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={() => setIsDepositModalOpen(true)}
              >
                <ArrowDownIcon className="w-4 h-4 mr-2" />
                Deposit
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={() => setIsTransferModalOpen(true)}
              >
                <ArrowRightLeftIcon className="w-4 h-4 mr-2" />
                Transfer
              </Button>
            </div>
          </div>
        </div>

        {/* Quick actions - Mobile */}
        <div className="grid grid-cols-2 gap-3 mb-6 md:hidden">
          <Button 
            variant="outline" 
            className="h-auto flex flex-col py-4"
            onClick={() => setIsDepositModalOpen(true)}
          >
            <ArrowDownIcon className="w-5 h-5 mb-1" />
            <span className="text-xs">Deposit</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto flex flex-col py-4"
            onClick={() => setIsTransferModalOpen(true)}
          >
            <ArrowRightLeftIcon className="w-5 h-5 mb-1" />
            <span className="text-xs">Transfer</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto flex flex-col py-4"
            onClick={() => navigate("/cards")}
          >
            <CreditCardIcon className="w-5 h-5 mb-1" />
            <span className="text-xs">Cards</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto flex flex-col py-4"
            onClick={() => navigate("/exchange")}
          >
            <SquareIcon className="w-5 h-5 mb-1" />
            <span className="text-xs">Exchange</span>
          </Button>
        </div>

        {/* Recent transactions */}
        <div className="bg-white border border-gray-200 p-4 md:p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Recent Transactions</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/transactions")}>
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {transactionsLoading ? (
              <>
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </>
            ) : recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div>
                    <div className="font-medium">{transaction.name}</div>
                    <div className="text-sm text-gray-500">
                      {transaction.category} • {formatDate(transaction.date || new Date())}
                    </div>
                  </div>
                  <div className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-black'}`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount), transaction.currency)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No transactions yet
              </div>
            )}
          </div>
        </div>

        {/* Desktop grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MarketSnapshot />
          <PortfolioSummary />
          <ComplianceNotification />
          <InvestmentOverview />
          <MarketInsights />
          <UpcomingPayments />
          <NotificationsCenter />
          <StatementGenerator onOpen={() => setIsStatementModalOpen(true)} />
          <LinkedAccounts />
          <ScheduledPayments />
          <KnowledgeCenter />
        </div>

        {/* Mobile additional sections */}
        <div className="space-y-4 md:hidden">
          <MarketSnapshot />
          <PortfolioSummary />
          <ComplianceNotification />
        </div>
      </main>

      <Footer className="hidden md:block" />
      
      {/* Modals */}
      <TransferModal 
        open={isTransferModalOpen} 
        onOpenChange={setIsTransferModalOpen}
        accounts={accounts}
      />
      <StatementModal 
        open={isStatementModalOpen} 
        onOpenChange={setIsStatementModalOpen} 
      />
      <CardManagementModal
        open={isCardModalOpen}
        onOpenChange={setIsCardModalOpen}
      />
      <DepositModal
        open={isDepositModalOpen}
        onOpenChange={setIsDepositModalOpen}
        accounts={accounts}
      />
    </div>
  );
}
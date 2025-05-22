import { useState } from "react";
import { 
  CalendarIcon, 
  CreditCardIcon,
  PauseIcon,
  XIcon,
  AlertTriangleIcon,
  FilterIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for scheduled payments and subscriptions
const scheduledPaymentsData = [
  {
    id: 1,
    merchant: "Premium Housing Ltd.",
    description: "Apartment Rent",
    amount: 2400.00,
    currency: "EUR",
    frequency: "Monthly",
    nextChargeDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    status: "active",
    category: "Housing"
  },
  {
    id: 2,
    merchant: "Helvetia Insurance",
    description: "Home Insurance Premium",
    amount: 185.75,
    currency: "CHF",
    frequency: "Monthly",
    nextChargeDate: new Date(new Date().setDate(new Date().getDate() + 12)),
    status: "active",
    category: "Insurance"
  },
  {
    id: 3,
    merchant: "Netflix",
    description: "Premium Subscription",
    amount: 17.99,
    currency: "EUR",
    frequency: "Monthly",
    nextChargeDate: new Date(new Date().setDate(new Date().getDate() + 18)),
    status: "active",
    category: "Entertainment"
  },
  {
    id: 4,
    merchant: "Fitness First",
    description: "Gym Membership",
    amount: 89.00,
    currency: "EUR",
    frequency: "Monthly",
    nextChargeDate: new Date(new Date().setDate(new Date().getDate() + 22)),
    status: "paused",
    category: "Fitness"
  }
];

export function ScheduledPayments() {
  const [payments, setPayments] = useState(scheduledPaymentsData);
  const [filter, setFilter] = useState("all"); // "all", "active", "paused"
  
  // Format date to "May 26, 2025" format
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Calculate days until next charge
  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(date.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  };
  
  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    const symbol = currency === 'EUR' ? '€' : 
                  currency === 'USD' ? '$' : 
                  currency === 'GBP' ? '£' : 
                  currency === 'CHF' ? 'CHF ' : '';
    
    return `${symbol}${amount.toFixed(2)}`;
  };
  
  // Toggle payment status between active and paused
  const togglePaymentStatus = (id: number) => {
    setPayments(prevPayments => 
      prevPayments.map(payment => 
        payment.id === id 
          ? { ...payment, status: payment.status === 'active' ? 'paused' : 'active' } 
          : payment
      )
    );
  };
  
  // Filter payments based on current filter
  const filteredPayments = filter === 'all' 
    ? payments 
    : payments.filter(payment => payment.status === filter);
  
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-3 text-gray-700" />
          <h3 className="text-lg font-medium">Upcoming Payments & Subscriptions</h3>
        </div>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-gray-600 flex items-center mr-2"
            onClick={() => setFilter(filter === 'all' ? 'active' : filter === 'active' ? 'paused' : 'all')}
          >
            <FilterIcon className="h-3 w-3 mr-1" />
            Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Add Payment
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-6 text-left font-medium text-gray-600">Merchant</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Amount</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Frequency</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Next Charge</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Status</th>
              <th className="py-3 px-6 text-right font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-6">
                    <div className="font-medium">{payment.merchant}</div>
                    <div className="text-xs text-gray-500">{payment.description}</div>
                  </td>
                  <td className="py-4 px-6 font-medium">{formatCurrency(payment.amount, payment.currency)}</td>
                  <td className="py-4 px-6">{payment.frequency}</td>
                  <td className="py-4 px-6">
                    <div>{formatDate(payment.nextChargeDate)}</div>
                    <div className={`text-xs ${
                      getDaysUntil(payment.nextChargeDate) === 'Today' || getDaysUntil(payment.nextChargeDate) === 'Tomorrow'
                        ? 'text-red-600 font-medium'
                        : 'text-gray-500'
                    }`}>
                      {getDaysUntil(payment.nextChargeDate)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {payment.status === 'active' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Paused
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-gray-500 hover:text-black"
                        onClick={() => togglePaymentStatus(payment.id)}
                      >
                        {payment.status === 'active' ? (
                          <PauseIcon className="h-4 w-4" />
                        ) : (
                          <PlayIcon className="h-4 w-4" />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <AlertTriangleIcon className="h-5 w-5 mb-2 text-gray-400" />
                    <p>No payments found with the current filter.</p>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="mt-2 text-black"
                      onClick={() => setFilter('all')}
                    >
                      Show all payments
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {payments.filter(p => p.status === 'active').length} active payments totaling {
            formatCurrency(
              payments
                .filter(p => p.status === 'active')
                .reduce((sum, payment) => sum + (payment.currency === 'EUR' ? payment.amount : 0), 0),
              'EUR'
            )
          } this month
        </span>
        <Button variant="link" size="sm" className="text-xs text-black p-0">
          Payment History
        </Button>
      </div>
    </div>
  );
}

// Play icon component
const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
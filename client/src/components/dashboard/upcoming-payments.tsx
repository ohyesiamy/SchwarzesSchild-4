import { 
  CalendarIcon, 
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock scheduled payments data
const upcomingPayments = [
  {
    id: 1,
    description: "Premium Rent Payment",
    amount: 2400.00,
    currency: "EUR",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
    recurring: true,
    status: "scheduled"
  },
  {
    id: 2,
    description: "Helvetia Insurance Premium",
    amount: 358.50,
    currency: "CHF",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    recurring: true,
    status: "scheduled"
  },
  {
    id: 3,
    description: "Credit Card Payment",
    amount: 1250.00,
    currency: "EUR",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    recurring: false,
    status: "pending_approval"
  }
];

export function UpcomingPayments() {
  // Format date to display in appropriate format
  const formatDueDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      // Display date in format: "25 Apr"
      return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short'
      });
    }
  };
  
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium">Upcoming Payments</h3>
        <CalendarIcon className="h-5 w-5 text-gray-500" />
      </div>
      
      <div className="divide-y divide-gray-100">
        {upcomingPayments.map((payment) => (
          <div key={payment.id} className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium">{payment.description}</h4>
                <div className="flex items-center mt-1">
                  <ClockIcon className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Due {formatDueDate(payment.dueDate)}
                    {payment.recurring && <span className="ml-2 text-xs text-gray-500">(Recurring)</span>}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold">
                  {payment.currency === "EUR" && "€"}
                  {payment.currency === "USD" && "$"}
                  {payment.currency === "GBP" && "£"}
                  {payment.currency === "CHF" && "CHF "}
                  {payment.amount.toFixed(2)}
                </div>
                <div className="mt-1">
                  {payment.status === "scheduled" ? (
                    <span className="flex items-center text-xs text-green-700">
                      <CheckCircleIcon className="h-3 w-3 mr-1" />
                      Scheduled
                    </span>
                  ) : (
                    <span className="flex items-center text-xs text-amber-700">
                      <AlertTriangleIcon className="h-3 w-3 mr-1" />
                      Requires Approval
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-3">
              {payment.status === "pending_approval" && (
                <Button size="sm" className="text-xs bg-black text-white hover:bg-gray-800">
                  APPROVE
                </Button>
              )}
              <Button size="sm" variant="outline" className="text-xs">
                MODIFY
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <span className="text-xs text-gray-500">Showing 3 of 8 upcoming payments</span>
        <Button variant="link" size="sm" className="text-xs text-black">
          VIEW ALL PAYMENTS
        </Button>
      </div>
    </div>
  );
}
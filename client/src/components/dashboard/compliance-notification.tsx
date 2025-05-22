import { BellIcon, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample compliance notifications data
const notifications = [
  {
    id: 1,
    title: "Annual KYC Review",
    message: "Your annual Know Your Customer (KYC) review is due in 15 days.",
    priority: "high",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    id: 2,
    title: "Terms of Service Update",
    message: "We've updated our terms of service. Please review and acknowledge.",
    priority: "medium",
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
  },
];

export function ComplianceNotification() {
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium">Compliance Notifications</h3>
        <div className="relative">
          <BellIcon className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-black rounded-full"></span>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-6">
            <div className="flex items-start mb-2">
              <div className={`h-5 w-5 rounded-full flex-shrink-0 mr-3 flex items-center justify-center ${
                notification.priority === "high" 
                  ? "bg-black text-white" 
                  : "bg-gray-200 text-gray-700"
              }`}>
                <InfoIcon className="h-3 w-3" />
              </div>
              <div>
                <h4 className="font-medium">{notification.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-2 text-xs">
              <span className="text-gray-500">
                {notification.date.toLocaleDateString()} at {notification.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              
              <Button variant="outline" size="sm" className="text-xs">
                REVIEW
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
        <button className="text-xs font-medium text-black hover:underline">
          VIEW ALL NOTIFICATIONS
        </button>
      </div>
    </div>
  );
}
import { useState } from "react";
import { 
  BellIcon, 
  LockIcon, 
  AlertTriangleIcon,
  FileTextIcon,
  ArrowLeftRightIcon,
  MoreHorizontalIcon,
  XIcon,
  EyeIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock notifications data
const notificationsData = [
  {
    id: 1,
    title: "New login from unknown device",
    message: "A new login was detected from Zurich, Switzerland on May 21, 2025 at 9:45 AM",
    type: "security",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
    read: false,
    actionLabel: "Review Activity"
  },
  {
    id: 2,
    title: "Monthly statement ready",
    message: "Your April 2025 account statement is now available for download",
    type: "document",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 12)),
    read: false,
    actionLabel: "Download"
  },
  {
    id: 3,
    title: "Currency rates updated",
    message: "Exchange rates have been updated for all your accounts",
    type: "financial",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 24)),
    read: true,
    actionLabel: "View Rates"
  },
  {
    id: 4,
    title: "Security protocol update",
    message: "Our security protocols have been updated to enhance your account protection",
    type: "security",
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
    read: true,
    actionLabel: "Learn More"
  }
];

export function NotificationsCenter() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [isExpanded, setIsExpanded] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const getIconByType = (type: string) => {
    switch (type) {
      case 'security':
        return <LockIcon className="h-5 w-5 text-red-600" />;
      case 'document':
        return <FileTextIcon className="h-5 w-5 text-blue-600" />;
      case 'financial':
        return <ArrowLeftRightIcon className="h-5 w-5 text-green-600" />;
      default:
        return <AlertTriangleIcon className="h-5 w-5 text-amber-600" />;
    }
  };
  
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium">Secure Notifications</h3>
        <div className="relative cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <BellIcon className="h-6 w-6 text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 rounded-full flex items-center justify-center text-xs text-white font-semibold">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
      
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-72'}`}>
        <div className="divide-y divide-gray-100">
          {notifications.slice(0, isExpanded ? notifications.length : 3).map((notification) => (
            <div 
              key={notification.id} 
              className={`p-6 ${notification.read ? 'bg-white' : 'bg-gray-50'}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-1">{getIconByType(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-medium ${notification.read ? '' : 'text-black'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                      {formatTime(notification.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                    >
                      {notification.actionLabel}
                    </Button>
                    
                    {!notification.read && (
                      <div className="flex items-center text-gray-500 text-xs">
                        <EyeIcon className="h-3 w-3 mr-1" />
                        <span>Mark as read</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <Button 
          variant="link" 
          size="sm" 
          className="text-xs text-gray-700 font-medium"
          onClick={markAllAsRead}
        >
          Mark all as read
        </Button>
        
        <Button 
          variant="link" 
          size="sm" 
          className="text-xs text-black font-medium"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "View all notifications"}
        </Button>
      </div>
    </div>
  );
}
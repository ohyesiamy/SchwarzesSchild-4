import { useLocation } from "wouter";
import { 
  LayoutDashboard, 
  ClipboardListIcon, 
  CreditCard, 
  RefreshCcw, 
  Settings
} from "lucide-react";

interface MobileNavigationProps {
  active?: string;
}

export function MobileNavigation({ active }: MobileNavigationProps) {
  const [, navigate] = useLocation();
  
  // Main navigation items for mobile (limited to 5 for bottom nav)
  const navItems = [
    { name: "dashboard", label: "Home", path: "/", icon: LayoutDashboard },
    { name: "transactions", label: "Transactions", path: "/transactions", icon: ClipboardListIcon },
    { name: "cards", label: "Cards", path: "/cards", icon: CreditCard },
    { name: "exchange", label: "Exchange", path: "/exchange", icon: RefreshCcw },
    { name: "settings", label: "More", path: "/settings", icon: Settings },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden shadow-md">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = active === item.name;
          const Icon = item.icon;
          
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-2 text-xs font-medium transition-colors ${
                isActive ? "text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? "text-black" : "text-gray-500"}`} />
              <span>{item.label}</span>
              {isActive && <div className="w-12 h-0.5 bg-black absolute bottom-0" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
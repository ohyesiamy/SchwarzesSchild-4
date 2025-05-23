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
  const [location, navigate] = useLocation();
  
  // Main navigation items for mobile (limited to 5 for bottom nav)
  const navItems = [
    { name: "dashboard", label: "Home", path: "/", icon: LayoutDashboard },
    { name: "transactions", label: "Transactions", path: "/transactions", icon: ClipboardListIcon },
    { name: "cards", label: "Cards", path: "/cards", icon: CreditCard },
    { name: "exchange", label: "Exchange", path: "/exchange", icon: RefreshCcw },
    { name: "settings", label: "More", path: "/settings", icon: Settings },
  ];
  
  // Get current active item based on location path if not explicitly provided
  const determineActive = () => {
    if (active) return active;
    
    // Find matching nav item based on current path
    const currentItem = navItems.find(item => {
      // Exact match for root path
      if (item.path === "/" && location === "/") return true;
      // Subpath match for other paths
      if (item.path !== "/" && location.startsWith(item.path)) return true;
      return false;
    });
    
    return currentItem?.name || "dashboard";
  };
  
  const currentActive = determineActive();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
      <div className="grid grid-cols-5 h-14">
        {navItems.map((item) => {
          const isActive = currentActive === item.name;
          const Icon = item.icon;
          
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-1.5 text-[10px] uppercase tracking-wide transition-colors ${
                isActive ? "text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              <div className={`flex items-center justify-center h-6 w-6 mb-1 ${isActive ? 'bg-black bg-opacity-5' : ''}`}>
                <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-gray-500"}`} />
              </div>
              <span className={`${isActive ? 'font-medium' : ''}`}>{item.label}</span>
              {isActive && <div className="w-8 h-0.5 bg-black absolute bottom-0" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
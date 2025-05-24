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
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50 lg:hidden">
      <div className="grid grid-cols-5 h-12">
        {navItems.map((item) => {
          const isActive = currentActive === item.name;
          const Icon = item.icon;
          
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-1 text-[8px] uppercase tracking-wider font-light transition-colors ${
                isActive ? "text-white" : "text-gray-600"
              }`}
            >
              <div className="flex items-center justify-center mb-0.5">
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-600"}`} />
              </div>
              <span className={`${isActive ? 'font-light' : 'font-extralight'}`}>{item.label}</span>
              {isActive && <div className="w-10 h-px bg-white absolute top-0" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
import { useLocation } from "wouter";
import { 
  LayoutDashboard, 
  ClipboardListIcon, 
  CreditCard, 
  RefreshCcw, 
  Settings 
} from "lucide-react";

interface NavigationProps {
  active?: string;
}

export function Navigation({ active }: NavigationProps) {
  const [, navigate] = useLocation();
  
  const navItems = [
    { name: "dashboard", label: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "transactions", label: "Transactions", path: "/transactions", icon: ClipboardListIcon },
    { name: "cards", label: "Cards", path: "/cards", icon: CreditCard },
    { name: "exchange", label: "Exchange", path: "/exchange", icon: RefreshCcw },
    { name: "settings", label: "Settings", path: "/settings", icon: Settings },
  ];
  
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6">
        <ul className="flex overflow-x-auto">
          {navItems.map((item) => {
            const isActive = active === item.name;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex items-center py-4 px-6 text-sm font-medium tracking-wide ${
                    isActive 
                      ? "text-black border-b-2 border-black" 
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-2 ${isActive ? "text-black" : "text-gray-600"}`} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

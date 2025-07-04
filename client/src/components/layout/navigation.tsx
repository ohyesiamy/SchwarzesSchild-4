import { useLocation } from "wouter";
import { 
  LayoutDashboard, 
  ClipboardListIcon, 
  CreditCard, 
  RefreshCcw, 
  Settings,
  ShieldIcon,
  UserIcon,
  HelpCircle
} from "lucide-react";

interface NavigationProps {
  active?: string;
  onOpen?: () => void;
}

export function Navigation({ active }: NavigationProps) {
  const [, navigate] = useLocation();
  
  const navItems = [
    { name: "dashboard", label: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "transactions", label: "Transactions", path: "/transactions", icon: ClipboardListIcon },
    { name: "cards", label: "Cards", path: "/cards", icon: CreditCard },
    { name: "exchange", label: "Exchange", path: "/exchange", icon: RefreshCcw },
    { name: "security", label: "Security", path: "/security", icon: ShieldIcon },
    { name: "profile", label: "Profile", path: "/profile", icon: UserIcon },
    { name: "support", label: "Support", path: "/support", icon: HelpCircle },
    { name: "settings", label: "Settings", path: "/settings", icon: Settings },
  ];
  
  return (
    <nav className="bg-white border-b border-gray-200 hidden md:block">
      <div className="container mx-auto px-4 md:px-6">
        <ul className="flex overflow-x-auto">
          {navItems.map((item) => {
            const isActive = active === item.name;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex items-center py-3 px-3 md:px-5 text-xs font-medium tracking-wide whitespace-nowrap transition-colors ${
                    isActive 
                      ? "text-black border-b-2 border-black" 
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 mr-1.5 ${isActive ? "text-black" : "text-gray-600"}`} />
                  <span className="uppercase tracking-wide">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

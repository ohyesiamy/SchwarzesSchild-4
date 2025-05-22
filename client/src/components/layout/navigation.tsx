import { useLocation } from "wouter";

interface NavigationProps {
  active?: string;
}

export function Navigation({ active }: NavigationProps) {
  const [, navigate] = useLocation();
  
  const navItems = [
    { name: "dashboard", label: "Dashboard", path: "/" },
    { name: "transactions", label: "Transactions", path: "/transactions" },
    { name: "cards", label: "Cards", path: "/cards" },
    { name: "exchange", label: "Exchange", path: "/exchange" },
    { name: "settings", label: "Settings", path: "/settings" },
  ];
  
  return (
    <nav className="bg-white border-b-2 border-black">
      <div className="container mx-auto px-4">
        <ul className="flex overflow-x-auto py-3">
          {navItems.map((item, index) => (
            <li key={item.name} className={index < navItems.length - 1 ? "mr-6" : ""}>
              <button
                onClick={() => navigate(item.path)}
                className={`font-playfair text-lg nav-link ${
                  active === item.name ? "active" : ""
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

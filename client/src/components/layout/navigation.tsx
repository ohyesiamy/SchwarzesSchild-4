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
    <nav className="bg-white border-b border-black">
      <div className="container mx-auto">
        <ul className="flex overflow-x-auto">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.path)}
                className={`nav-link ${active === item.name ? "active" : ""}`}
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

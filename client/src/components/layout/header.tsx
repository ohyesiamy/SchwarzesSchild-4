import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { BellIcon, HelpCircleIcon, SearchIcon, UserIcon } from "lucide-react";

export function Header() {
  const [, navigate] = useLocation();
  
  return (
    <header className="bg-black text-white">
      {/* Top secondary navigation */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto flex justify-end items-center h-8 px-6">
          <div className="flex space-x-4 text-xs">
            <a href="#" className="text-gray-400 hover:text-white">Private Banking</a>
            <a href="#" className="text-gray-400 hover:text-white">Business</a>
            <a href="#" className="text-gray-400 hover:text-white">Investments</a>
            <a href="#" className="text-gray-400 hover:text-white">Help & Support</a>
            <a href="#" className="text-gray-400 hover:text-white">Location</a>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto flex justify-between items-center h-16 px-6">
        <div className="flex items-center">
          <Logo size="small" className="mr-6" variant="white" background="dark" />
          <h1 className="text-xl font-semibold tracking-wide">SCHWARZES SCHILD</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <button className="text-gray-400 hover:text-white">
            <SearchIcon className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <HelpCircleIcon className="w-5 h-5" />
          </button>
          <button className="text-gray-400 hover:text-white">
            <BellIcon className="w-5 h-5" />
          </button>
          <Button
            onClick={() => navigate("/profile")}
            variant="outline"
            className="w-10 h-10 flex items-center justify-center border border-white rounded-full"
          >
            <UserIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

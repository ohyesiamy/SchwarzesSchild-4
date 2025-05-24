import { useState } from "react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { 
  BellIcon, 
  HelpCircleIcon, 
  SearchIcon, 
  UserIcon, 
  MenuIcon, 
  X as CloseIcon
} from "lucide-react";

export function Header() {
  const [, navigate] = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  return (
    <header className="bg-black text-white">      
      {/* Integrated header with main nav and secondary nav */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center h-auto md:h-16 px-4 md:px-6">
        <div className="flex items-center py-4 md:py-0">
          <Logo size="small" className="mr-3 md:mr-5" variant="white" background="dark" />
          <h1 className="text-lg md:text-xl font-semibold tracking-wide hidden xs:block">
            <span className="font-bold tracking-tight">SCHWARZES</span> <span className="font-light tracking-widest">SCHILD</span>
          </h1>
        </div>
        
        {/* Desktop Navigation - Primary + Secondary Combined */}
        <div className="hidden md:flex items-center mt-1.5">
          {/* Secondary Navigation */}
          <div className="relative flex items-center justify-center w-full max-w-4xl mx-auto py-2.5">
            {/* Top line decoration */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            
            {/* Navigation items */}
            <div className="grid grid-cols-11 w-full px-10">
              <a href="#" className="group relative flex flex-col items-center justify-center h-10">
                <span className="text-gray-400 group-hover:text-white text-[10px] font-light tracking-[0.2em] transition-colors duration-300">About</span>
                <div className="absolute bottom-1 w-0 group-hover:w-1/2 h-[1px] bg-white transition-all duration-300 ease-in-out"></div>
              </a>
              
              <a href="#" className="group relative flex flex-col items-center justify-center h-10">
                <span className="text-gray-400 group-hover:text-white text-[10px] font-light tracking-[0.2em] transition-colors duration-300">Accounts</span>
                <div className="absolute bottom-1 w-0 group-hover:w-1/2 h-[1px] bg-white transition-all duration-300 ease-in-out"></div>
              </a>
              
              <a href="#" className="group relative flex flex-col items-center justify-center h-10">
                <span className="text-gray-400 group-hover:text-white text-[10px] font-light tracking-[0.2em] transition-colors duration-300">Private</span>
                <div className="absolute bottom-1 w-0 group-hover:w-1/2 h-[1px] bg-white transition-all duration-300 ease-in-out"></div>
              </a>
              
              <a href="#" className="group relative flex flex-col items-center justify-center h-10">
                <span className="text-gray-400 group-hover:text-white text-[10px] font-light tracking-[0.2em] transition-colors duration-300">Business</span>
                <div className="absolute bottom-1 w-0 group-hover:w-1/2 h-[1px] bg-white transition-all duration-300 ease-in-out"></div>
              </a>
              
              <a href="#" className="group relative flex flex-col items-center justify-center h-10">
                <span className="text-gray-400 group-hover:text-white text-[10px] font-light tracking-[0.2em] transition-colors duration-300">Wealth</span>
                <div className="absolute bottom-1 w-0 group-hover:w-1/2 h-[1px] bg-white transition-all duration-300 ease-in-out"></div>
              </a>
              
              <a href="#" className="group relative flex flex-col items-center justify-center h-10">
                <span className="text-gray-400 group-hover:text-white text-[10px] font-light tracking-[0.2em] transition-colors duration-300">Commercial</span>
                <div className="absolute bottom-1 w-0 group-hover:w-1/2 h-[1px] bg-white transition-all duration-300 ease-in-out"></div>
              </a>
              
              <a href="#" className="group relative flex flex-col items-center justify-center h-10">
                <span className="text-gray-400 group-hover:text-white text-[10px] font-light tracking-[0.2em] transition-colors duration-300">Education</span>
                <div className="absolute bottom-1 w-0 group-hover:w-1/2 h-[1px] bg-white transition-all duration-300 ease-in-out"></div>
              </a>
              
              <a href="#" className="group relative flex flex-col items-center justify-center h-10">
                <span className="text-gray-400 group-hover:text-white text-[10px] font-light tracking-[0.2em] transition-colors duration-300">Loan</span>
                <div className="absolute bottom-1 w-0 group-hover:w-1/2 h-[1px] bg-white transition-all duration-300 ease-in-out"></div>
              </a>
              
              <a href="#" className="group relative flex flex-col items-center justify-center h-10">
                <span className="text-gray-400 group-hover:text-white text-[10px] font-light tracking-[0.2em] transition-colors duration-300">Security</span>
                <div className="absolute bottom-1 w-0 group-hover:w-1/2 h-[1px] bg-white transition-all duration-300 ease-in-out"></div>
              </a>
              
              <a href="#" className="group relative flex flex-col items-center justify-center h-10">
                <span className="text-gray-400 group-hover:text-white text-[10px] font-light tracking-[0.2em] transition-colors duration-300">Support</span>
                <div className="absolute bottom-1 w-0 group-hover:w-1/2 h-[1px] bg-white transition-all duration-300 ease-in-out"></div>
              </a>
              
              <a href="#" className="group relative flex flex-col items-center justify-center h-10">
                <span className="text-gray-400 group-hover:text-white text-[10px] font-light tracking-[0.2em] transition-colors duration-300">Contact</span>
                <div className="absolute bottom-1 w-0 group-hover:w-1/2 h-[1px] bg-white transition-all duration-300 ease-in-out"></div>
              </a>
            </div>
            
            {/* Bottom line decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          </div>
          
          {/* Primary Navigation Icons */}
          <div className="flex items-center space-x-4 border-l border-gray-800 pl-6">
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
              className="w-9 h-9 flex items-center justify-center border border-white rounded-full"
            >
              <UserIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="md:hidden flex items-center">
          {/* Mobile profile icon */}
          <button 
            className="flex items-center justify-center mr-6 text-gray-400 hover:text-white"
            onClick={() => navigate("/profile")}
          >
            <div className="w-7 h-7 flex items-center justify-center border border-white">
              <UserIcon className="w-3.5 h-3.5" />
            </div>
          </button>
          
          {/* Mobile menu button */}
          <button 
            className="text-gray-400 hover:text-white"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="absolute top-16 left-0 right-0 bg-black z-50 border-t border-gray-800 md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-3">
              <button 
                className="flex items-center text-gray-400 hover:text-white py-3 border-b border-gray-800"
                onClick={() => {
                  navigate("/profile");
                  setShowMobileMenu(false);
                }}
              >
                <UserIcon className="w-5 h-5 mr-3" />
                <span>Profile</span>
              </button>
              <button 
                className="flex items-center text-gray-400 hover:text-white py-3 border-b border-gray-800"
                onClick={() => setShowMobileMenu(false)}
              >
                <SearchIcon className="w-5 h-5 mr-3" />
                <span>Search</span>
              </button>
              <button 
                className="flex items-center text-gray-400 hover:text-white py-3 border-b border-gray-800"
                onClick={() => setShowMobileMenu(false)}
              >
                <BellIcon className="w-5 h-5 mr-3" />
                <span>Notifications</span>
              </button>
              <button 
                className="flex items-center text-gray-400 hover:text-white py-3 border-b border-gray-800"
                onClick={() => setShowMobileMenu(false)}
              >
                <HelpCircleIcon className="w-5 h-5 mr-3" />
                <span>Help</span>
              </button>
              
              {/* Secondary Navigation in Mobile Menu */}
              <div className="pt-2 border-t border-gray-800">
                <h3 className="text-xs uppercase text-gray-500 py-2">Banking Services</h3>
                <a href="#" className="block text-gray-400 hover:text-white py-2 text-sm font-medium hover:underline">About</a>
                <a href="#" className="block text-gray-400 hover:text-white py-2 text-sm font-medium hover:underline">Accounts & Services</a>
                <a href="#" className="block text-gray-400 hover:text-white py-2 text-sm font-medium hover:underline">Private Banking</a>
                <a href="#" className="block text-gray-400 hover:text-white py-2 text-sm font-medium hover:underline">Business</a>
                <a href="#" className="block text-gray-400 hover:text-white py-2 text-sm font-medium hover:underline">Wealth Management</a>
                <a href="#" className="block text-gray-400 hover:text-white py-2 text-sm font-medium hover:underline">Commercial</a>
                <a href="#" className="block text-gray-400 hover:text-white py-2 text-sm font-medium hover:underline">Education & Goals</a>
                <a href="#" className="block text-gray-400 hover:text-white py-2 text-sm font-medium hover:underline">Loans & Credit</a>
                <a href="#" className="block text-gray-400 hover:text-white py-2 text-sm font-medium hover:underline">Security & Fraud</a>
                <a href="#" className="block text-gray-400 hover:text-white py-2 text-sm font-medium hover:underline">Help & Support</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

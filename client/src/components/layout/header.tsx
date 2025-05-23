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
      <div className="container mx-auto flex justify-between items-center h-16 px-4 md:px-6">
        <div className="flex items-center">
          <Logo size="small" className="mr-2 md:mr-6" variant="white" background="dark" />
          <h1 className="text-lg md:text-xl font-semibold tracking-wide hidden xs:block">SCHWARZES SCHILD</h1>
        </div>
        
        {/* Desktop Navigation - Primary + Secondary Combined */}
        <div className="hidden md:flex items-center">
          {/* Secondary Navigation */}
          <div className="flex mr-8">
            <a href="#" className="text-gray-400 hover:text-white text-sm mx-3">Private Banking</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm mx-3">Business</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm mx-3">Investments</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm mx-3">Help & Support</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm mx-3">Location</a>
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
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? (
            <CloseIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
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
                <a href="#" className="block text-gray-400 hover:text-white py-2">Private Banking</a>
                <a href="#" className="block text-gray-400 hover:text-white py-2">Business</a>
                <a href="#" className="block text-gray-400 hover:text-white py-2">Investments</a>
                <a href="#" className="block text-gray-400 hover:text-white py-2">Help & Support</a>
                <a href="#" className="block text-gray-400 hover:text-white py-2">Location</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

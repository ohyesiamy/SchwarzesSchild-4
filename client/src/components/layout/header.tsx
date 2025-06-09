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
        {/* Logo only visible on desktop */}
        <div className="hidden md:flex items-center py-4 md:py-0">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Logo size="medium" className="mr-3 md:mr-5" variant="white" background="dark" />
            <h1 className="text-lg md:text-xl font-semibold tracking-wide">
              <span className="font-bold tracking-tight">SCHWARZES</span> <span className="font-light tracking-widest">SCHILD</span>
            </h1>
          </button>
        </div>
        
        {/* Desktop Navigation - Primary + Secondary Combined */}
        <div className="hidden md:flex items-center mt-1.5">
          {/* Secondary Navigation */}
          <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto py-3">
            {/* Top line decoration */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            
            {/* Navigation items */}
            <div className="flex justify-between w-full px-4">
              <button onClick={() => navigate("/about")} className="group relative px-2 flex flex-col items-center justify-center h-10 min-w-[60px]">
                <span className="text-gray-300 text-[9px] font-light tracking-wider whitespace-nowrap transition-colors duration-300 group-hover:text-white">ABOUT</span>
              </button>
              
              <button onClick={() => navigate("/dashboard")} className="group relative px-2 flex flex-col items-center justify-center h-10 min-w-[60px]">
                <span className="text-gray-300 text-[9px] font-light tracking-wider whitespace-nowrap transition-colors duration-300 group-hover:text-white">ACCOUNTS</span>
              </button>
              
              <button onClick={() => navigate("/profile")} className="group relative px-2 flex flex-col items-center justify-center h-10 min-w-[60px]">
                <span className="text-gray-300 text-[9px] font-light tracking-wider whitespace-nowrap transition-colors duration-300 group-hover:text-white">PRIVATE</span>
              </button>
              
              <button onClick={() => navigate("/dashboard")} className="group relative px-2 flex flex-col items-center justify-center h-10 min-w-[60px]">
                <span className="text-gray-300 text-[9px] font-light tracking-wider whitespace-nowrap transition-colors duration-300 group-hover:text-white">BUSINESS</span>
              </button>
              
              <button onClick={() => navigate("/dashboard")} className="group relative px-2 flex flex-col items-center justify-center h-10 min-w-[60px]">
                <span className="text-gray-300 text-[9px] font-light tracking-wider whitespace-nowrap transition-colors duration-300 group-hover:text-white">WEALTH</span>
              </button>
              
              <button onClick={() => navigate("/dashboard")} className="group relative px-2 flex flex-col items-center justify-center h-10 min-w-[70px]">
                <span className="text-gray-300 text-[9px] font-light tracking-wider whitespace-nowrap transition-colors duration-300 group-hover:text-white">COMMERCIAL</span>
              </button>
              
              <button onClick={() => navigate("/dashboard")} className="group relative px-2 flex flex-col items-center justify-center h-10 min-w-[70px]">
                <span className="text-gray-300 text-[9px] font-light tracking-wider whitespace-nowrap transition-colors duration-300 group-hover:text-white">EDUCATION</span>
              </button>
              
              <button onClick={() => navigate("/dashboard")} className="group relative px-2 flex flex-col items-center justify-center h-10 min-w-[50px]">
                <span className="text-gray-300 text-[9px] font-light tracking-wider whitespace-nowrap transition-colors duration-300 group-hover:text-white">LOAN</span>
              </button>
              
              <button onClick={() => navigate("/security")} className="group relative px-2 flex flex-col items-center justify-center h-10 min-w-[60px]">
                <span className="text-gray-300 text-[9px] font-light tracking-wider whitespace-nowrap transition-colors duration-300 group-hover:text-white">SECURITY</span>
              </button>
              
              <button onClick={() => navigate("/support")} className="group relative px-2 flex flex-col items-center justify-center h-10 min-w-[60px]">
                <span className="text-gray-300 text-[9px] font-light tracking-wider whitespace-nowrap transition-colors duration-300 group-hover:text-white">SUPPORT</span>
              </button>
              
              <button onClick={() => navigate("/support")} className="group relative px-2 flex flex-col items-center justify-center h-10 min-w-[60px]">
                <span className="text-gray-300 text-[9px] font-light tracking-wider whitespace-nowrap transition-colors duration-300 group-hover:text-white">CONTACT</span>
              </button>
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
            <button
              onClick={() => navigate("/profile")}
              className="w-9 h-9 flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200"
            >
              <UserIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Mobile header - minimal with just icons */}
        <div className="md:hidden flex items-center justify-between w-full h-12">
          {/* Left empty space for balance */}
          <div></div>
          
          {/* Icon group at right */}
          <div className="flex items-center">
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
      </div>
      
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="absolute top-16 left-0 right-0 bg-black z-50 border-t border-gray-800 md:hidden">
          <div className="container mx-auto px-0">
            <div className="bg-black p-5">
              <div className="space-y-4">
                <button onClick={() => {
                  navigate("/about");
                  setShowMobileMenu(false);
                }} 
                   className="block text-[11px] tracking-wide text-white uppercase font-light w-full text-left">
                  About
                </button>
                <button onClick={() => {
                  navigate("/dashboard");
                  setShowMobileMenu(false);
                }} 
                   className="block text-[11px] tracking-wide text-white uppercase font-light w-full text-left">
                  Accounts
                </button>
                <button onClick={() => {
                  navigate("/profile");
                  setShowMobileMenu(false);
                }} 
                   className="block text-[11px] tracking-wide text-white uppercase font-light w-full text-left">
                  Private
                </button>
                <button onClick={() => {
                  navigate("/dashboard");
                  setShowMobileMenu(false);
                }} 
                   className="block text-[11px] tracking-wide text-white uppercase font-light w-full text-left">
                  Business
                </button>
                <button onClick={() => {
                  navigate("/dashboard");
                  setShowMobileMenu(false);
                }} 
                   className="block text-[11px] tracking-wide text-white uppercase font-light w-full text-left">
                  Wealth
                </button>
                <button onClick={() => {
                  navigate("/dashboard");
                  setShowMobileMenu(false);
                }} 
                   className="block text-[11px] tracking-wide text-white uppercase font-light w-full text-left">
                  Commercial
                </button>
                <button onClick={() => {
                  navigate("/dashboard");
                  setShowMobileMenu(false);
                }} 
                   className="block text-[11px] tracking-wide text-white uppercase font-light w-full text-left">
                  Education
                </button>
                <button onClick={() => {
                  navigate("/dashboard");
                  setShowMobileMenu(false);
                }} 
                   className="block text-[11px] tracking-wide text-white uppercase font-light w-full text-left">
                  Loan
                </button>
                <button onClick={() => {
                  navigate("/security");
                  setShowMobileMenu(false);
                }} 
                   className="block text-[11px] tracking-wide text-white uppercase font-light w-full text-left">
                  Security
                </button>
                <button onClick={() => {
                  navigate("/support");
                  setShowMobileMenu(false);
                }} 
                   className="block text-[11px] tracking-wide text-white uppercase font-light w-full text-left">
                  Support
                </button>
                <button onClick={() => {
                  navigate("/support");
                  setShowMobileMenu(false);
                }} 
                   className="block text-[11px] tracking-wide text-white uppercase font-light w-full text-left">
                  Contact
                </button>
                <button onClick={() => {
                  navigate("/profile");
                  setShowMobileMenu(false);
                }} 
                   className="block text-[11px] tracking-wide text-white uppercase font-light w-full text-left">
                  My Profile
                </button>
              </div>
            </div>
            
            <div className="p-3 border-t border-gray-800 flex justify-between items-center">
              <div className="text-[9px] text-gray-500 uppercase tracking-wider">© 2025 Schwarzes Schild</div>
              <button 
                onClick={() => setShowMobileMenu(false)}
                className="text-[10px] uppercase tracking-wider text-white hover:bg-gray-900 px-4 py-1.5"
              >
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

import { LockIcon, ShieldCheckIcon, GlobeIcon } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-6">
        {/* Trust Information */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <LockIcon className="h-4 w-4 mr-2 text-black" />
            <span className="text-xs text-gray-600">Encrypted SSL · PCI-DSS Secured · KYC/AML Ready</span>
          </div>
          
          <div className="flex items-center mb-4 md:mb-0">
            <GlobeIcon className="h-4 w-4 mr-2 text-black" />
            <span className="text-xs text-gray-600">Headquarters: Zurich · Tokyo · Singapore</span>
          </div>
          
          <div className="flex items-center">
            <ShieldCheckIcon className="h-4 w-4 mr-2 text-black" />
            <span className="text-xs text-gray-600">Partnered with: ClearBank, Tink, Chainalysis</span>
          </div>
        </div>
        
        {/* Logo and Brand Information */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <Logo size="medium" variant="black" background="light" className="mb-3" />
            <div className="text-xs font-medium uppercase tracking-wider">
              Where Trust Is Sovereign
            </div>
          </div>
        </div>
        
        {/* Copyright and Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-6">
          <div className="text-xs text-gray-500 mb-2 md:mb-0">
            © 2023-2025 SCHWARZES SCHILD BANK AG. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-xs text-gray-600 hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-600 hover:text-black transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-gray-600 hover:text-black transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
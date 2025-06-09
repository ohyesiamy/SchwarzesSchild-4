import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Footer } from "@/components/layout/footer";
import { UserProfileCard } from "@/components/profile/user-profile-card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

import { MarketSnapshot } from "@/components/dashboard/market-snapshot";
import { ShieldIcon, LogOut } from "lucide-react";
import { useLocation } from "wouter";

export default function ProfilePage() {
  const [, navigate] = useLocation();
  const { logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation active="profile" />
      <MobileNavigation active="settings" /> {/* Using "settings" because Profile is in More section */}
      
      <main className="py-5 px-4 container mx-auto flex-grow mb-20 md:mb-0 max-w-[1440px]">
        {/* Mobile optimized header - visible on mobile only */}
        <div className="flex flex-col mb-4 md:hidden">
          <h1 className="text-sm uppercase tracking-wide font-medium mb-1">Profile</h1>
          <div className="w-6 h-0.5 bg-black"></div>
          <p className="text-[10px] uppercase tracking-wide text-gray-600 mt-2">Account information</p>
        </div>

        {/* Desktop header - hidden on mobile */}
        <div className="hidden md:block mb-6">
          <h1 className="text-base uppercase tracking-wide font-medium mb-1">Account Profile</h1>
          <div className="w-8 h-0.5 bg-black mb-2"></div>
          <p className="text-xs text-gray-600">Manage your account details and banking services</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main profile content - 8 cols width on desktop */}
          <div className="lg:col-span-8 space-y-5">
            {/* Profile Card */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-xs uppercase tracking-wide font-medium border-b border-gray-200 pb-2 mb-4">Personal Information</h3>
              <UserProfileCard />
            </div>
            
            {/* Security Center Quick Access */}
            <div 
              className="border border-black bg-black text-white p-4 flex flex-col md:flex-row md:items-center md:justify-between cursor-pointer"
              onClick={() => navigate("/security")}
            >
              <div className="flex items-center mb-3 md:mb-0">
                <ShieldIcon className="h-4 w-4 mr-3" />
                <div>
                  <div className="text-[10px] uppercase tracking-wide font-medium">Security Center</div>
                  <p className="text-[10px] text-gray-300 mt-0.5">Manage security settings and monitor account activity</p>
                </div>
              </div>
              <div>
                <button className="text-[10px] uppercase tracking-wide font-medium border border-white py-1 px-3 hover:bg-white hover:text-black transition-colors">
                  Access
                </button>
              </div>
            </div>

            {/* Account Actions */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-xs uppercase tracking-wide font-medium border-b border-gray-200 pb-2 mb-4">Account Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/settings")}
                  className="w-full justify-start border-gray-200 hover:border-black text-[10px] uppercase tracking-wide h-9"
                >
                  Account Settings
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/support")}
                  className="w-full justify-start border-gray-200 hover:border-black text-[10px] uppercase tracking-wide h-9"
                >
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="w-full justify-start border-red-200 text-red-600 hover:border-red-500 hover:bg-red-50 text-[10px] uppercase tracking-wide h-9"
                >
                  <LogOut className="h-3 w-3 mr-2" />
                  {logoutMutation.isPending ? "Logging out..." : "Log Out"}
                </Button>
              </div>
            </div>
            
            {/* Available Services */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-xs uppercase tracking-wide font-medium border-b border-gray-200 pb-2 mb-4">Available Services</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ServiceCard 
                  title="Investment Advisory" 
                  description="Personalized investment strategies tailored to your financial goals"
                  status="Available"
                />
                
                <ServiceCard 
                  title="Wealth Management" 
                  description="Comprehensive wealth planning and portfolio management"
                  status="By Invitation"
                />
                
                <ServiceCard 
                  title="International Banking" 
                  description="Access to global markets and multi-currency accounts"
                  status="Available"
                />
                
                <ServiceCard 
                  title="Private Banking" 
                  description="Exclusive banking services with dedicated relationship manager"
                  status="Upgrade Required"
                />
              </div>
            </div>
          </div>
          
          {/* Sidebar - 4 cols width on desktop */}
          <div className="lg:col-span-4 space-y-5">
            {/* Compliance Status Section */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-xs uppercase tracking-wide font-medium border-b border-gray-200 pb-2 mb-4">Compliance Status</h3>
              <div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-[10px] uppercase tracking-wide font-medium">KYC Status</div>
                    <div className="text-[10px] py-0.5 px-1.5 bg-black text-white font-medium">Verified</div>
                  </div>
                  <p className="text-[10px] text-gray-500">Last verified: 15 Jan 2025 • Valid until: 15 Jan 2026</p>
                </div>
                
                <div className="mb-4">
                  <div className="py-1.5 px-3 border border-black mb-1">
                    <div className="text-[10px] uppercase tracking-wide font-medium">Tier 2</div>
                  </div>
                  <p className="text-[10px] text-gray-600">Current Verification Tier</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Enhanced verification with increased transaction limits</p>
                </div>
                
                <div>
                  <div className="text-[10px] uppercase tracking-wide font-medium mb-2">Verified Documents</div>
                  <ul className="space-y-2">
                    <li className="flex items-center border-b border-gray-50 pb-1">
                      <div className="w-1 h-1 bg-black mr-2"></div>
                      <div className="text-[10px]">Passport</div>
                    </li>
                    <li className="flex items-center border-b border-gray-50 pb-1">
                      <div className="w-1 h-1 bg-black mr-2"></div>
                      <div className="text-[10px]">Proof of Address</div>
                    </li>
                    <li className="flex items-center border-b border-gray-50 pb-1">
                      <div className="w-1 h-1 bg-black mr-2"></div>
                      <div className="text-[10px]">Tax Declaration</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Market snapshot */}
            <div className="border border-gray-200 p-4">
              <h3 className="text-xs uppercase tracking-wide font-medium border-b border-gray-200 pb-2 mb-4">Market Snapshot</h3>
              <MarketSnapshot />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Simple service card component
function ServiceCard({ 
  title, 
  description, 
  status 
}: { 
  title: string; 
  description: string; 
  status: "Available" | "By Invitation" | "Upgrade Required" 
}) {
  return (
    <div className="border border-gray-200 p-3">
      <div className="text-[10px] uppercase tracking-wide font-medium mb-1">{title}</div>
      <p className="text-[10px] text-gray-600 mb-3 min-h-[40px]">{description}</p>
      <div className="flex items-center justify-between">
        <div className={`text-[10px] py-0.5 px-1.5 ${
          status === "Available" 
            ? "bg-black text-white" 
            : status === "By Invitation" 
              ? "border border-black text-black" 
              : "border border-gray-200 text-gray-500"
        }`}>
          {status}
        </div>
        
        <button className="text-[10px] uppercase tracking-wide font-medium hover:underline">
          Details
        </button>
      </div>
    </div>
  );
}
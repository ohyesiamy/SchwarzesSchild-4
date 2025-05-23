import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { UserProfileCard } from "@/components/profile/user-profile-card";

import { MarketSnapshot } from "@/components/dashboard/market-snapshot";
import { ShieldIcon } from "lucide-react";
import { useLocation } from "wouter";

export default function ProfilePage() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation active="profile" />
      
      <main className="py-8 px-6 container mx-auto flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main profile content - 2/3 width on desktop */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div>
              <h1 className="text-2xl font-semibold mb-6">Account Profile</h1>
              <UserProfileCard />
            </div>
            
            {/* Security Center Quick Access */}
            <div 
              className="bg-black text-white p-6 flex items-center justify-between cursor-pointer"
              onClick={() => navigate("/security")}
            >
              <div className="flex items-center">
                <ShieldIcon className="h-6 w-6 mr-4" />
                <div>
                  <h2 className="text-lg font-medium">Security Center</h2>
                  <p className="text-sm text-gray-300">Manage your security settings and monitor account activity</p>
                </div>
              </div>
              <div>
                <button className="text-xs uppercase tracking-wider font-medium border border-white py-2 px-3 hover:bg-white hover:text-black transition-colors">
                  VIEW DETAILS
                </button>
              </div>
            </div>
            
            {/* Available Services */}
            <div>
              <h2 className="text-xl font-semibold mb-6">Available Services</h2>
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
          
          {/* Sidebar - 1/3 width on desktop */}
          <div className="col-span-1 space-y-8">
            {/* Compliance Status Section */}
            <div className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-medium">Your Compliance Status</h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">KYC Status</span>
                    <span className="text-xs py-1 px-2 bg-green-100 text-green-800 font-medium">Verified</span>
                  </div>
                  <p className="text-xs text-gray-500">Last verified: 15 Jan 2025 • Valid until: 15 Jan 2026</p>
                </div>
                
                <div className="mb-6">
                  <div className="py-3 px-4 bg-gray-50 border border-gray-200 mb-2">
                    <span className="text-sm font-medium">Tier 2</span>
                  </div>
                  <p className="text-xs text-gray-600">Current Verification Tier</p>
                  <p className="text-xs text-gray-500 mt-1">Enhanced verification with increased transaction limits</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Verified Documents</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-sm">Passport</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-sm">Proof of Address</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-sm">Tax Declaration</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Market snapshot */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Market Snapshot</h2>
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
    <div className="bg-white border border-gray-200 p-6">
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <div className={`text-xs py-1 px-2 ${
          status === "Available" 
            ? "bg-black text-white" 
            : status === "By Invitation" 
              ? "bg-gray-100 text-black" 
              : "bg-gray-100 text-gray-500"
        }`}>
          {status}
        </div>
        
        <button className="text-xs uppercase tracking-wider font-medium">
          LEARN MORE
        </button>
      </div>
    </div>
  );
}
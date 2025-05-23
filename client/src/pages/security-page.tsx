import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Footer } from "@/components/layout/footer";
import { 
  ShieldIcon, 
  LockIcon, 
  AlertTriangleIcon, 
  EyeIcon, 
  PhoneIcon,
  KeyIcon,
  MonitorIcon,
  ClockIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation active="security" />
      <MobileNavigation active="settings" /> {/* Using "settings" because Security is in More section */}
      
      <main className="py-8 px-6 container mx-auto flex-grow mb-20 md:mb-0">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Security Center</h1>
          <p className="text-gray-600">Protecting your financial assets is our highest priority.</p>
        </div>
        
        {/* Security Alert Banner */}
        <div className="bg-black text-white p-6 mb-10 flex items-center">
          <ShieldIcon className="h-8 w-8 mr-4" />
          <div>
            <h2 className="text-lg font-medium mb-1">Your Account Security Status</h2>
            <p className="text-sm text-gray-300">Your account is currently secured with multi-factor authentication. Last login: Today at 10:28 AM.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Password Security */}
          <div className="bg-white border border-gray-200">
            <div className="border-b border-gray-200 p-6">
              <h3 className="text-lg font-medium flex items-center">
                <KeyIcon className="h-5 w-5 mr-2" />
                Password Policy
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-black text-white flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span>Minimum 12 characters length</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-black text-white flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span>Combination of uppercase, lowercase, numbers, and symbols</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-black text-white flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span>Periodic password rotation required (every 90 days)</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-black text-white flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span>No password reuse from the last 24 changes</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button className="w-full bg-black text-white">
                  UPDATE PASSWORD
                </Button>
              </div>
            </div>
          </div>
          
          {/* Session Management */}
          <div className="bg-white border border-gray-200">
            <div className="border-b border-gray-200 p-6">
              <h3 className="text-lg font-medium flex items-center">
                <ClockIcon className="h-5 w-5 mr-2" />
                Session Management
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-black text-white flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span>Automatic logout after 15 minutes of inactivity</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-black text-white flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span>Concurrent sessions are monitored and limited</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-black text-white flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span>IP address verification on login</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-black text-white flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span>Device fingerprinting for suspicious activity detection</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button className="w-full bg-black text-white">
                  TERMINATE ALL SESSIONS
                </Button>
              </div>
            </div>
          </div>
          
          {/* Suspicious Activity */}
          <div className="bg-white border border-gray-200">
            <div className="border-b border-gray-200 p-6">
              <h3 className="text-lg font-medium flex items-center">
                <AlertTriangleIcon className="h-5 w-5 mr-2" />
                Suspicious Activity Monitoring
              </h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">Our systems continuously monitor your account for unusual patterns that may indicate unauthorized access attempts.</p>
              
              <h4 className="font-medium mb-2">Warning Signs:</h4>
              <ul className="space-y-3 text-sm mb-4">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">!</div>
                  <span>Login attempts from unfamiliar locations</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">!</div>
                  <span>Multiple failed login attempts</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">!</div>
                  <span>Unusual transaction patterns or amounts</span>
                </li>
              </ul>
              
              <div className="mt-2">
                <Button className="w-full bg-black text-white">
                  REVIEW SECURITY LOG
                </Button>
              </div>
            </div>
          </div>
          
          {/* Account Protection */}
          <div className="bg-white border border-gray-200">
            <div className="border-b border-gray-200 p-6">
              <h3 className="text-lg font-medium flex items-center">
                <LockIcon className="h-5 w-5 mr-2" />
                Account Protection
              </h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">If you suspect unauthorized access to your account, take immediate action to secure your finances.</p>
              
              <div className="space-y-4 mb-4">
                <Button className="w-full bg-white border border-black text-black hover:bg-gray-100">
                  FREEZE MY ACCOUNT
                </Button>
                
                <Button className="w-full bg-white border border-black text-black hover:bg-gray-100">
                  CONTACT COMPLIANCE
                </Button>
              </div>
              
              <div className="flex items-center mt-6 pt-4 border-t border-gray-200">
                <PhoneIcon className="h-5 w-5 mr-2 text-black" />
                <span className="text-sm font-medium">24/7 Security Hotline: +41 800 555 0000</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Connected Devices */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <MonitorIcon className="h-5 w-5 mr-2" />
            Connected Devices
          </h2>
          
          <div className="bg-white border border-gray-200">
            <div className="divide-y divide-gray-200">
              <div className="p-6 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mr-4">
                    <LaptopIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">MacBook Pro</div>
                    <div className="text-xs text-gray-500">Last active: Today, 15:42</div>
                  </div>
                </div>
                <div className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">
                  Current Device
                </div>
              </div>
              
              <div className="p-6 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center mr-4">
                    <SmartphoneIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">iPhone 15 Pro</div>
                    <div className="text-xs text-gray-500">Last active: Today, 12:15</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  REMOVE
                </Button>
              </div>
              
              <div className="p-6 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center mr-4">
                    <TabletIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">iPad Air</div>
                    <div className="text-xs text-gray-500">Last active: Yesterday, 19:22</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  REMOVE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Needed icons
const LaptopIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
  </svg>
);

const SmartphoneIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

const TabletIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <line x1="12" x2="12.01" y1="18" y2="18" />
  </svg>
);
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
      
      <main className="py-5 px-4 container mx-auto flex-grow mb-20 md:mb-0 max-w-[1440px]">
        {/* Mobile optimized header - visible on mobile only */}
        <div className="flex flex-col mb-4 md:hidden">
          <h1 className="text-sm uppercase tracking-wide font-medium mb-1">Security Center</h1>
          <div className="w-6 h-0.5 bg-black"></div>
          <p className="text-[10px] uppercase tracking-wide text-gray-600 mt-2">Protecting your financial assets</p>
        </div>

        {/* Desktop header - hidden on mobile */}
        <div className="hidden md:block mb-6">
          <h1 className="text-base uppercase tracking-wide font-medium mb-1">Security Center</h1>
          <div className="w-8 h-0.5 bg-black mb-2"></div>
          <p className="text-xs text-gray-600">Protecting your financial assets is our highest priority.</p>
        </div>
        
        {/* Security Alert Banner */}
        <div className="bg-black text-white p-3 md:p-4 mb-5 md:mb-6 flex items-center">
          <ShieldIcon className="h-5 w-5 md:h-6 md:w-6 mr-3 md:mr-4" />
          <div>
            <h2 className="text-xs md:text-sm uppercase tracking-wide font-medium mb-0.5 md:mb-1">Security Status</h2>
            <p className="text-[10px] md:text-xs text-gray-300">Secured with multi-factor authentication. Last login: Today at 10:28 AM.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Password Security */}
          <div className="bg-white border border-gray-200">
            <div className="p-2.5 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xs uppercase tracking-wide font-medium">Password Policy</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">Security requirements for account access</p>
              </div>
              <KeyIcon className="h-4 w-4 text-gray-500" />
            </div>
            <div className="p-3 md:p-4">
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-start">
                  <div className="h-4 w-4 bg-black text-white flex items-center justify-center text-[9px] mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-[11px] md:text-xs">Minimum 12 characters length</span>
                </li>
                <li className="flex items-start">
                  <div className="h-4 w-4 bg-black text-white flex items-center justify-center text-[9px] mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-[11px] md:text-xs">Combination of uppercase, lowercase, numbers, and symbols</span>
                </li>
                <li className="flex items-start">
                  <div className="h-4 w-4 bg-black text-white flex items-center justify-center text-[9px] mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-[11px] md:text-xs">Periodic password rotation required (every 90 days)</span>
                </li>
                <li className="flex items-start">
                  <div className="h-4 w-4 bg-black text-white flex items-center justify-center text-[9px] mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-[11px] md:text-xs">No password reuse from the last 24 changes</span>
                </li>
              </ul>
              <div className="mt-4 md:mt-5">
                <Button className="w-full bg-black text-white rounded-none h-8 text-[10px] uppercase tracking-wide">
                  Update Password
                </Button>
              </div>
            </div>
          </div>
          
          {/* Session Management */}
          <div className="bg-white border border-gray-200">
            <div className="p-2.5 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xs uppercase tracking-wide font-medium">Session Management</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">Active connection monitoring and control</p>
              </div>
              <ClockIcon className="h-4 w-4 text-gray-500" />
            </div>
            <div className="p-3 md:p-4">
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-start">
                  <div className="h-4 w-4 bg-black text-white flex items-center justify-center text-[9px] mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-[11px] md:text-xs">Automatic logout after 15 minutes of inactivity</span>
                </li>
                <li className="flex items-start">
                  <div className="h-4 w-4 bg-black text-white flex items-center justify-center text-[9px] mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-[11px] md:text-xs">Concurrent sessions are monitored and limited</span>
                </li>
                <li className="flex items-start">
                  <div className="h-4 w-4 bg-black text-white flex items-center justify-center text-[9px] mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-[11px] md:text-xs">IP address verification on login</span>
                </li>
                <li className="flex items-start">
                  <div className="h-4 w-4 bg-black text-white flex items-center justify-center text-[9px] mr-2 flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-[11px] md:text-xs">Device fingerprinting for suspicious activity detection</span>
                </li>
              </ul>
              <div className="mt-4 md:mt-5">
                <Button className="w-full bg-black text-white rounded-none h-8 text-[10px] uppercase tracking-wide">
                  Terminate All Sessions
                </Button>
              </div>
            </div>
          </div>
          
          {/* Suspicious Activity */}
          <div className="bg-white border border-gray-200">
            <div className="p-2.5 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xs uppercase tracking-wide font-medium">Activity Monitoring</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">Continuous security surveillance system</p>
              </div>
              <AlertTriangleIcon className="h-4 w-4 text-gray-500" />
            </div>
            <div className="p-3 md:p-4">
              <p className="text-[11px] md:text-xs text-gray-600 mb-3">Our systems continuously monitor your account for unusual patterns that may indicate unauthorized access attempts.</p>
              
              <h4 className="text-[11px] md:text-xs uppercase tracking-wide font-medium mb-2">Warning Signs:</h4>
              <ul className="space-y-2 md:space-y-2.5 mb-3 md:mb-4">
                <li className="flex items-start">
                  <div className="h-4 w-4 border border-black text-black flex items-center justify-center text-[9px] mr-2 flex-shrink-0 mt-0.5">!</div>
                  <span className="text-[11px] md:text-xs">Login attempts from unfamiliar locations</span>
                </li>
                <li className="flex items-start">
                  <div className="h-4 w-4 border border-black text-black flex items-center justify-center text-[9px] mr-2 flex-shrink-0 mt-0.5">!</div>
                  <span className="text-[11px] md:text-xs">Multiple failed login attempts</span>
                </li>
                <li className="flex items-start">
                  <div className="h-4 w-4 border border-black text-black flex items-center justify-center text-[9px] mr-2 flex-shrink-0 mt-0.5">!</div>
                  <span className="text-[11px] md:text-xs">Unusual transaction patterns or amounts</span>
                </li>
              </ul>
              
              <div className="mt-3 md:mt-4">
                <Button className="w-full bg-black text-white rounded-none h-8 text-[10px] uppercase tracking-wide">
                  Review Security Log
                </Button>
              </div>
            </div>
          </div>
          
          {/* Account Protection */}
          <div className="bg-white border border-gray-200">
            <div className="p-2.5 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xs uppercase tracking-wide font-medium">Account Protection</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">Emergency measures for your financial security</p>
              </div>
              <LockIcon className="h-4 w-4 text-gray-500" />
            </div>
            <div className="p-3 md:p-4">
              <p className="text-[11px] md:text-xs text-gray-600 mb-3">If you suspect unauthorized access to your account, take immediate action to secure your finances.</p>
              
              <div className="space-y-3 mb-3">
                <Button className="w-full bg-white border border-black text-black hover:bg-gray-100 rounded-none h-8 text-[10px] uppercase tracking-wide">
                  Freeze My Account
                </Button>
                
                <Button className="w-full bg-white border border-black text-black hover:bg-gray-100 rounded-none h-8 text-[10px] uppercase tracking-wide">
                  Contact Compliance
                </Button>
              </div>
              
              <div className="flex items-center mt-4 pt-3 border-t border-gray-200">
                <PhoneIcon className="h-3.5 w-3.5 mr-2 text-black" />
                <span className="text-[10px] md:text-xs uppercase tracking-wide font-medium">24/7 Security Hotline: +41 800 555 0000</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Connected Devices */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <div className="flex items-center">
              <h2 className="text-xs uppercase tracking-wide font-medium">Connected Devices</h2>
              <MonitorIcon className="h-3.5 w-3.5 ml-2 text-gray-500" />
            </div>
            <Button 
              variant="link" 
              size="sm" 
              className="text-[10px] uppercase tracking-wide font-medium text-black h-auto p-0"
            >
              Manage All
            </Button>
          </div>
          
          <div className="bg-white border border-gray-200">
            <div className="divide-y divide-gray-200">
              <div className="p-3 md:p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-black text-white flex items-center justify-center mr-3">
                    <LaptopIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide">MacBook Pro</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-wide">Last active: Today, 15:42</div>
                  </div>
                </div>
                <div className="text-[9px] bg-black text-white py-0.5 px-1.5">
                  Current
                </div>
              </div>
              
              <div className="p-3 md:p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white border border-black text-black flex items-center justify-center mr-3">
                    <SmartphoneIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide">iPhone 15 Pro</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-wide">Last active: Today, 12:15</div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-[10px] uppercase tracking-wide rounded-none border-black h-6 px-2 py-0"
                >
                  Remove
                </Button>
              </div>
              
              <div className="p-3 md:p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white border border-black text-black flex items-center justify-center mr-3">
                    <TabletIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide">iPad Air</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-wide">Last active: Yesterday, 19:22</div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-[10px] uppercase tracking-wide rounded-none border-black h-6 px-2 py-0"
                >
                  Remove
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
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { LogoVariantDemo } from "@/components/showcase/logo-variant-demo";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const { toast } = useToast();
  
  // Profile settings
  const [fullName, setFullName] = useState("John Smith");
  const [email, setEmail] = useState("client@schwarzesschild.com");
  const [phone, setPhone] = useState("+49 30 1234567");
  
  // Password settings
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Toggle settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);
  const [transactionEmailsEnabled, setTransactionEmailsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile settings have been saved.",
    });
  };
  
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your new password and confirmation match.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Your password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    // Clear password fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation active="settings" />
      <MobileNavigation active="settings" />
      
      <main className="py-5 px-4 container mx-auto flex-grow mb-20 md:mb-0 max-w-[1440px]">
        {/* Mobile optimized header - visible on mobile only */}
        <div className="flex flex-col mb-4 md:hidden">
          <h1 className="text-sm uppercase tracking-wide font-medium mb-1">Settings</h1>
          <div className="w-6 h-0.5 bg-black"></div>
          <p className="text-[10px] uppercase tracking-wide text-gray-600 mt-2">Account preferences</p>
        </div>

        {/* Desktop header - hidden on mobile */}
        <div className="hidden md:block mb-6">
          <h1 className="text-base uppercase tracking-wide font-medium mb-1">Settings</h1>
          <div className="w-8 h-0.5 bg-black mb-2"></div>
          <p className="text-xs text-gray-600">Configure your account preferences and security settings</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main content area - Profile & Security */}
          <div className="lg:col-span-8">
            {/* Profile settings card */}
            <div className="border border-gray-200 p-4 mb-5">
              <h3 className="text-xs uppercase tracking-wide font-medium border-b border-gray-200 pb-2 mb-4">Profile Information</h3>
              <form>
                <div className="mb-3">
                  <label className="block text-[10px] uppercase tracking-wide font-medium mb-1">Full Name</label>
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border border-black rounded-none p-2 h-8 text-[11px]"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-[10px] uppercase tracking-wide font-medium mb-1">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-black rounded-none p-2 h-8 text-[11px]"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-[10px] uppercase tracking-wide font-medium mb-1">Phone Number</label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-black rounded-none p-2 h-8 text-[11px]"
                  />
                </div>
                
                <div className="text-right mt-4">
                  <Button
                    type="button"
                    onClick={handleSaveProfile}
                    className="rounded-none bg-black text-white hover:bg-gray-800 text-[10px] uppercase tracking-wide font-medium h-8 px-4"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Security settings card */}
            <div className="border border-gray-200 p-4 mb-5">
              <h3 className="text-xs uppercase tracking-wide font-medium border-b border-gray-200 pb-2 mb-4">Security Settings</h3>
              <form>
                <div className="mb-3">
                  <label className="block text-[10px] uppercase tracking-wide font-medium mb-1">Current Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full border border-black rounded-none p-2 h-8 text-[11px]"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-[10px] uppercase tracking-wide font-medium mb-1">New Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-black rounded-none p-2 h-8 text-[11px]"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-[10px] uppercase tracking-wide font-medium mb-1">Confirm New Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-black rounded-none p-2 h-8 text-[11px]"
                  />
                </div>
                
                <div className="text-right mb-4">
                  <Button
                    type="button"
                    onClick={handleChangePassword}
                    className="rounded-none bg-black text-white hover:bg-gray-800 text-[10px] uppercase tracking-wide font-medium h-8 px-4"
                  >
                    Change Password
                  </Button>
                </div>
                
                <Separator className="my-4 bg-gray-200" />
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide font-medium">Two-Factor Authentication</div>
                    <div className="text-[10px] text-gray-600 mt-1">Add an extra layer of security</div>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                    className="bg-gray-200 data-[state=checked]:bg-black"
                  />
                </div>
              </form>
            </div>
          </div>
          
          {/* Sidebar - Preferences */}
          <div className="lg:col-span-4">
            <div className="border border-gray-200 p-4 mb-5">
              <h3 className="text-xs uppercase tracking-wide font-medium border-b border-gray-200 pb-2 mb-4">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide font-medium">Push Notifications</div>
                    <div className="text-[10px] text-gray-600 mt-1">Receive transaction alerts</div>
                  </div>
                  <Switch
                    checked={pushNotificationsEnabled}
                    onCheckedChange={setPushNotificationsEnabled}
                    className="bg-gray-200 data-[state=checked]:bg-black"
                  />
                </div>
                
                <Separator className="bg-gray-100" />
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide font-medium">Transaction Emails</div>
                    <div className="text-[10px] text-gray-600 mt-1">Email confirmations</div>
                  </div>
                  <Switch
                    checked={transactionEmailsEnabled}
                    onCheckedChange={setTransactionEmailsEnabled}
                    className="bg-gray-200 data-[state=checked]:bg-black"
                  />
                </div>
                
                <Separator className="bg-gray-100" />
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide font-medium">Marketing Communications</div>
                    <div className="text-[10px] text-gray-600 mt-1">Financial offers and updates</div>
                  </div>
                  <Switch
                    checked={marketingEnabled}
                    onCheckedChange={setMarketingEnabled}
                    className="bg-gray-200 data-[state=checked]:bg-black"
                  />
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 p-4 mb-5">
              <h3 className="text-xs uppercase tracking-wide font-medium border-b border-gray-200 pb-2 mb-3">Contact Support</h3>
              <p className="text-[10px] text-gray-600 mb-3">Need assistance with your account settings?</p>
              <Button 
                className="w-full rounded-none bg-white text-black border border-black hover:bg-gray-100 text-[10px] uppercase tracking-wide font-medium h-8"
              >
                Contact Private Banking Team
              </Button>
            </div>
          </div>
        </div>
        
        {/* Logo Variants Demo Section - Now responsive */}
        <div className="mt-5 mb-8 border border-gray-200 p-4">
          <h3 className="text-xs uppercase tracking-wide font-medium border-b border-gray-200 pb-2 mb-3">Brand Assets</h3>
          <LogoVariantDemo />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

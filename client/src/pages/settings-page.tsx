import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { LogoVariantDemo } from "@/components/showcase/logo-variant-demo";

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
      
      <main className="py-8 px-4 container mx-auto flex-grow">
        <h2 className="text-3xl font-playfair mb-6">Settings</h2>
        
        <div className="border-2 border-black p-6 mb-8">
          <h3 className="text-2xl font-playfair mb-4">Profile Settings</h3>
          <form>
            <div className="mb-4">
              <label className="block mb-2">Full Name</label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border-2 border-black p-3 focus:outline-none"
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-black p-3 focus:outline-none"
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2">Phone Number</label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border-2 border-black p-3 focus:outline-none"
              />
            </div>
            
            <Button
              type="button"
              onClick={handleSaveProfile}
              className="w-full bg-black text-white p-4 text-lg font-playfair mb-4"
            >
              SAVE CHANGES
            </Button>
          </form>
        </div>
        
        <div className="border-2 border-black p-6 mb-8">
          <h3 className="text-2xl font-playfair mb-4">Security</h3>
          <form>
            <div className="mb-4">
              <label className="block mb-2">Current Password</label>
              <Input
                type="password"
                placeholder="••••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border-2 border-black p-3 focus:outline-none"
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">New Password</label>
              <Input
                type="password"
                placeholder="••••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border-2 border-black p-3 focus:outline-none"
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2">Confirm New Password</label>
              <Input
                type="password"
                placeholder="••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-2 border-black p-3 focus:outline-none"
              />
            </div>
            
            <Button
              type="button"
              onClick={handleChangePassword}
              className="w-full bg-black text-white p-4 text-lg font-playfair mb-4"
            >
              CHANGE PASSWORD
            </Button>
            
            <div className="pt-4 border-t-2 border-black">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="font-bold">Two-Factor Authentication</div>
                  <div className="text-sm">Add an extra layer of security to your account</div>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                  className="bg-white border-2 border-black data-[state=checked]:bg-black"
                />
              </div>
            </div>
          </form>
        </div>
        
        <div className="border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Account Preferences</h3>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="font-medium">Push Notifications</div>
                <div className="text-sm text-gray-600">Receive notifications for transactions and updates</div>
              </div>
              <Switch
                checked={pushNotificationsEnabled}
                onCheckedChange={setPushNotificationsEnabled}
                className="data-[state=checked]:bg-black"
              />
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="font-medium">Transaction Emails</div>
                <div className="text-sm text-gray-600">Receive email confirmations for transactions</div>
              </div>
              <Switch
                checked={transactionEmailsEnabled}
                onCheckedChange={setTransactionEmailsEnabled}
                className="data-[state=checked]:bg-black"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Marketing Communications</div>
                <div className="text-sm text-gray-600">Receive offers and updates from Schwarzes Schild</div>
              </div>
              <Switch
                checked={marketingEnabled}
                onCheckedChange={setMarketingEnabled}
                className="data-[state=checked]:bg-black"
              />
            </div>
          </div>
        </div>
        
        {/* Logo Variants Demo Section */}
        <div className="mb-8">
          <LogoVariantDemo />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

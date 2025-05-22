import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export default function ProfilePage() {
  const [, navigate] = useLocation();
  const { logoutMutation } = useAuth();
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="py-8 px-4 container mx-auto flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-playfair">Profile</h2>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="border-2 border-black px-4 py-2 font-playfair"
          >
            {logoutMutation.isPending ? "LOGGING OUT..." : "LOG OUT"}
          </Button>
        </div>
        
        <div className="border-2 border-black p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 flex items-center justify-center border-2 border-black mr-4">
              <span className="font-playfair font-bold text-2xl">JS</span>
            </div>
            <div>
              <div className="text-2xl font-playfair font-bold">John Smith</div>
              <div>client@schwarzesschild.com</div>
            </div>
          </div>
          
          <div className="pt-4 border-t-2 border-black">
            <div className="mb-2">
              <div className="font-bold">Account Number</div>
              <div>SS-2023-1084-9254</div>
            </div>
            <div>
              <div className="font-bold">Member Since</div>
              <div>October 2023</div>
            </div>
          </div>
        </div>
        
        <div>
          <Button
            onClick={() => navigate("/settings")}
            variant="outline"
            className="w-full border-2 border-black p-4 text-lg font-playfair mb-4 text-left flex justify-between items-center"
          >
            <span>Account Settings</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-2 border-black p-4 text-lg font-playfair mb-4 text-left flex justify-between items-center"
          >
            <span>Support</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-2 border-black p-4 text-lg font-playfair mb-4 text-left flex justify-between items-center"
          >
            <span>Privacy Policy</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-2 border-black p-4 text-lg font-playfair text-left flex justify-between items-center"
          >
            <span>Terms of Service</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  );
}

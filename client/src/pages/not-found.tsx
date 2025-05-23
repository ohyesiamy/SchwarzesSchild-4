import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Header } from "@/components/layout/header";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [, navigate] = useLocation();
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <Header />
      
      <div className="flex-grow flex items-center justify-center px-4 mb-20 md:mb-0">
        <Card className="w-full max-w-md mx-4 border-black">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <AlertCircle className="h-12 w-12 text-black mb-4" />
              <h1 className="text-2xl font-bold text-black">Page Not Found</h1>
              <p className="mt-4 text-gray-600">
                We couldn't find the page you were looking for.
              </p>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button 
                onClick={() => navigate("/")}
                className="bg-black text-white hover:bg-gray-900"
              >
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <MobileNavigation />
    </div>
  );
}

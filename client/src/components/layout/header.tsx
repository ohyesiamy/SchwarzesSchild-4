import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function Header() {
  const [, navigate] = useLocation();
  
  return (
    <header className="bg-white border-b-2 border-black">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Logo size="small" className="mr-3" />
          <h1 className="text-2xl font-playfair font-bold">SCHWARZES SCHILD</h1>
        </div>
        <div>
          <Button
            onClick={() => navigate("/profile")}
            variant="outline"
            className="w-10 h-10 flex items-center justify-center border-2 border-black"
          >
            <span className="font-playfair font-bold">JS</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

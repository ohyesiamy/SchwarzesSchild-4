import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function Header() {
  const [, navigate] = useLocation();
  
  return (
    <header className="header bg-white border-b border-black">
      <div className="container mx-auto flex justify-between items-center h-full">
        <div className="flex items-center">
          <Logo size="small" className="mr-6" />
          <h1 className="text-xl font-semibold tracking-wide uppercase">SCHWARZES SCHILD</h1>
        </div>
        <div>
          <Button
            onClick={() => navigate("/profile")}
            variant="outline"
            className="w-10 h-10 flex items-center justify-center border border-black"
          >
            <span className="font-semibold">SS</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

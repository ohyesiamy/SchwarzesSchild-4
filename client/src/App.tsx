import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import DashboardPage from "@/pages/dashboard-page";
import TransactionsPage from "@/pages/transactions-page";
import CardsPage from "@/pages/cards-page";
import ExchangePage from "@/pages/exchange-page";
import SettingsPage from "@/pages/settings-page";
import ProfilePage from "@/pages/profile-page";
import SecurityPage from "@/pages/security-page";
import { ProtectedRoute } from "./lib/protected-route";

// Router function no longer needed as we're using Switch directly in App

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <ProtectedRoute path="/" component={DashboardPage} />
        <ProtectedRoute path="/transactions" component={TransactionsPage} />
        <ProtectedRoute path="/cards" component={CardsPage} />
        <ProtectedRoute path="/exchange" component={ExchangePage} />
        <ProtectedRoute path="/settings" component={SettingsPage} />
        <ProtectedRoute path="/profile" component={ProfilePage} />
        <ProtectedRoute path="/security" component={SecurityPage} />
        <Route component={NotFound} />
      </Switch>
    </TooltipProvider>
  );
}

export default App;

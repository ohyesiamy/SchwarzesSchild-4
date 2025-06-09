import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import DashboardPage from "@/pages/dashboard-page";
import TransactionsPage from "@/pages/transactions-page";
import CardsPage from "@/pages/cards-page";
import ExchangePage from "@/pages/exchange-page";
import SettingsPage from "@/pages/settings-page";
import ProfilePage from "@/pages/profile-page";
import SecurityPage from "@/pages/security-page";
import SupportPage from "@/pages/support-page";
import AdminDashboard from "@/pages/admin/admin-dashboard";
import LandingPage from "@/pages/landing-page";
import { ProtectedRoute } from "./lib/protected-route";

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <AppRouter />
      </TooltipProvider>
    </AuthProvider>
  );
}

function AppRouter() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <Switch>
      {!user ? (
        <>
          <Route path="/" component={LandingPage} />
          <Route path="/auth" component={AuthPage} />
        </>
      ) : (
        <>
          <Route path="/" component={DashboardPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/transactions" component={TransactionsPage} />
          <Route path="/cards" component={CardsPage} />
          <Route path="/exchange" component={ExchangePage} />
          <Route path="/settings" component={SettingsPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/security" component={SecurityPage} />
          <Route path="/support" component={SupportPage} />
          <Route path="/admin" component={AdminDashboard} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;

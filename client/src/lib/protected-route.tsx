import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

// TEMPORARY: Flag to bypass authentication for design preview purposes
const BYPASS_AUTH = true;

// Mock user data for preview purposes
const mockUser = {
  id: 1,
  username: "demo@schwarzesschild.com",
  fullname: "Demo User",
  accountNumber: "SS-2025-7382-4921",
  memberSince: new Date(),
  phone: "+1 234 567 8900"
};

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  // If we're bypassing auth, render the component directly with mock user context
  if (BYPASS_AUTH) {
    // Wrap Component with necessary context
    return (
      <Route path={path}>
        <Component />
      </Route>
    );
  }
  
  try {
    const { user, isLoading } = useAuth();
    if (isLoading) {
      return (
        <Route path={path}>
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-border" />
          </div>
        </Route>
      );
    }

    if (!user) {
      return (
        <Route path={path}>
          <Redirect to="/auth" />
        </Route>
      );
    }

    return <Route path={path} component={Component} />
  } catch (error) {
    // Fallback if auth context is not available
    return (
      <Route path={path}>
        <Redirect to="/auth" />
      </Route>
    );
  }
}

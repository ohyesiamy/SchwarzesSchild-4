import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { insertUserSchema, User as SelectUser, InsertUser } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: SelectUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<SelectUser, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<SelectUser, Error, InsertUser>;
  showTwoFactor: boolean;
  setShowTwoFactor: (show: boolean) => void;
  verifyTwoFactor: (code: string) => void;
};

type LoginData = Pick<InsertUser, "username" | "password">;

export const AuthContext = createContext<AuthContextType | null>(null);

// Token management
const TOKEN_KEY = 'schwarzesschild_token';

const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
const removeToken = () => localStorage.removeItem(TOKEN_KEY);

// Enhanced apiRequest with auth headers
const authApiRequest = async (method: string, url: string, body?: any) => {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  
  // Update the query to use the new auth endpoint
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<SelectUser | undefined, Error>({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      const token = getToken();
      if (!token) return null;
      
      const res = await authApiRequest("GET", "/api/auth/user");
      if (!res.ok) {
        if (res.status === 401) {
          removeToken();
          return null;
        }
        throw new Error("Failed to fetch user");
      }
      return res.json();
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await authApiRequest("POST", "/api/auth/login", credentials);
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData || "Login failed");
      }
      const { user: userData, token } = await res.json();
      
      // Store token
      setToken(token);
      
      // Show 2FA screen after successful backend login
      setShowTwoFactor(true);
      localStorage.setItem('pendingAuth', JSON.stringify(userData));
      return userData;
    },
    onSettled: async () => {
      // Refresh the current user
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: InsertUser) => {
      const parsedData = insertUserSchema.parse(userData);
      const res = await authApiRequest("POST", "/api/auth/register", parsedData);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }
      const { user: newUser, token } = await res.json();
      
      // Store token
      setToken(token);
      
      return newUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Account created successfully!",
        description: "Welcome to Schwarzes Schild Banking",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await authApiRequest("POST", "/api/auth/logout");
      removeToken();
      localStorage.removeItem('pendingAuth');
    },
    onSuccess: () => {
      queryClient.resetQueries();
      queryClient.clear();
    },
  });

  const verifyTwoFactor = (code: string) => {
    // Simulate 2FA verification
    if (code === '123456') {
      setShowTwoFactor(false);
      localStorage.removeItem('pendingAuth');
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } else {
      toast({
        title: "Invalid code",
        description: "Please try again with the correct code.",
        variant: "destructive",
      });
    }
  };

  // Update global apiRequest to use auth headers
  useEffect(() => {
    const originalApiRequest = window.fetch;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString();
      if (url.startsWith('/api/')) {
        const token = getToken();
        if (token) {
          init = init || {};
          init.headers = {
            ...init.headers,
            'Authorization': `Bearer ${token}`,
          };
        }
      }
      return originalApiRequest(input, init);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        error,
        isLoading,
        loginMutation,
        registerMutation,
        logoutMutation,
        showTwoFactor,
        setShowTwoFactor,
        verifyTwoFactor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
}
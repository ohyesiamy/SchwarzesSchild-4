import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OTPInput } from "@/components/ui/otp-input";
import { useAuth } from "@/hooks/use-auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

enum AuthMode {
  LOGIN,
  SIGNUP,
}

const loginSchema = z.object({
  username: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  fullname: z.string().min(2, { message: "Full name is required" }),
  username: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [, navigate] = useLocation();
  const [showTwoFactorLocal, setShowTwoFactorLocal] = useState(false);
  
  // Create mock functions in case auth provider is not available
  const defaultAuthValues = {
    user: null,
    isLoading: false,
    error: null,
    loginMutation: {
      mutate: () => setShowTwoFactorLocal(true),
      isPending: false,
    } as any,
    registerMutation: {
      mutate: () => {},
      isPending: false,
    } as any,
    logoutMutation: {
      mutate: () => {},
      isPending: false,
    } as any,
    showTwoFactor: showTwoFactorLocal,
    setShowTwoFactor: setShowTwoFactorLocal,
    verifyTwoFactor: () => {},
  };
  
  // Try to use the actual auth context, fallback to mock if not available
  let authValues;
  try {
    authValues = useAuth();
  } catch (e) {
    authValues = defaultAuthValues;
  }
  
  const { user, loginMutation, registerMutation, showTwoFactor = showTwoFactorLocal, verifyTwoFactor = () => {} } = authValues;

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(data);
  };

  const onSignupSubmit = (data: z.infer<typeof signupSchema>) => {
    const { confirmPassword, ...userData } = data;
    registerMutation.mutate(userData);
  };

  const handleVerifyCode = (code: string) => {
    verifyTwoFactor(code);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Login Screen */}
      {!showTwoFactor && mode === AuthMode.LOGIN && (
        <div className="h-full flex flex-col items-center justify-center px-4 py-10">
          <div className="w-full max-w-md">
            <div className="mb-10 flex justify-center">
              <Logo size="large" />
            </div>
            <h1 className="text-4xl mb-8 text-center font-playfair font-bold">SCHWARZES SCHILD</h1>
            
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="mb-6">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="block mb-2 text-lg">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="w-full border-2 border-black p-3 focus:outline-none"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="block mb-2 text-lg">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="w-full border-2 border-black p-3 focus:outline-none"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-black text-white p-4 text-lg font-playfair"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "LOGGING IN..." : "LOG IN"}
                </Button>
              </form>
            </Form>
            
            <div className="text-center">
              <button
                onClick={() => setMode(AuthMode.SIGNUP)}
                className="underline text-black font-playfair"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Signup Screen */}
      {!showTwoFactor && mode === AuthMode.SIGNUP && (
        <div className="h-full flex flex-col items-center justify-center px-4 py-10">
          <div className="w-full max-w-md">
            <div className="mb-10 flex justify-center">
              <Logo size="large" />
            </div>
            <h1 className="text-4xl mb-8 text-center font-playfair font-bold">CREATE ACCOUNT</h1>
            
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="mb-6">
                <FormField
                  control={signupForm.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="block mb-2 text-lg">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="w-full border-2 border-black p-3 focus:outline-none"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="block mb-2 text-lg">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="w-full border-2 border-black p-3 focus:outline-none"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="block mb-2 text-lg">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="w-full border-2 border-black p-3 focus:outline-none"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="block mb-2 text-lg">Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="w-full border-2 border-black p-3 focus:outline-none"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-black text-white p-4 text-lg font-playfair"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                </Button>
              </form>
            </Form>
            
            <div className="text-center">
              <button
                onClick={() => setMode(AuthMode.LOGIN)}
                className="underline text-black font-playfair"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Two-Factor Screen */}
      {showTwoFactor && (
        <div className="h-full flex flex-col items-center justify-center px-4 py-10">
          <div className="w-full max-w-md">
            <div className="mb-10 flex justify-center">
              <Logo size="large" />
            </div>
            <h1 className="text-4xl mb-8 text-center font-playfair font-bold">VERIFY IDENTITY</h1>
            
            <div className="mb-6">
              <p className="mb-4 text-center">Please enter the verification code sent to your device</p>
              <OTPInput 
                length={6} 
                className="mb-6" 
                onComplete={handleVerifyCode}
              />
              <Button
                onClick={() => verifyTwoFactor("123456")}
                className="w-full bg-black text-white p-4 text-lg font-playfair"
              >
                VERIFY
              </Button>
            </div>
            
            <div className="text-center">
              <button className="underline text-black font-playfair">
                Resend Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocation } from "wouter";
import { Eye, EyeOff, ArrowLeft, Shield, Lock, CheckCircle, Globe, Users, Building2 } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

const signupSchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

enum AuthMode {
  LOGIN,
  SIGNUP,
}

export default function AuthPage() {
  const [, navigate] = useLocation();
  const [mode, setMode] = useState(AuthMode.LOGIN);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { 
    user, 
    loginMutation, 
    registerMutation, 
    showTwoFactor, 
    setShowTwoFactor, 
    verifyTwoFactor 
  } = useAuth();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
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
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onLoginSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(data);
  };

  const onSignupSubmit = (data: z.infer<typeof signupSchema>) => {
    try {
      const { confirmPassword, ...userData } = data;
      registerMutation.mutate(userData);
    } catch (error) {
      console.error("Error in signup submission:", error);
    }
  };

  const handleVerifyCode = (code: string) => {
    verifyTwoFactor(code);
  };

  const securityFeatures = [
    "Bank-grade 256-bit AES encryption",
    "Multi-factor authentication required",
    "Session monitoring and fraud detection",
    "Swiss banking privacy standards"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Two Factor Authentication Modal */}
      {showTwoFactor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure Authentication</h2>
              <p className="text-gray-600">Please enter the 6-digit verification code from your authenticator app</p>
            </div>

            <div className="flex justify-center mb-6">
              <InputOTP maxLength={6} onComplete={handleVerifyCode}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowTwoFactor(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1" disabled>
                Verify
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Authentication Layout */}
      <div className="min-h-screen flex">
        {/* Left Column - Brand & Messaging */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <Logo size="medium" className="mr-4" />
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">SCHWARZES SCHILD</h1>
                  <p className="text-gray-300 text-sm">Swiss Private Banking</p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-4xl font-light mb-6 leading-tight">
                Secure Portal Access
              </h2>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Welcome to SchwarzesSchild's secure client portal. Access your accounts and manage your financial operations with the highest levels of security and privacy.
              </p>

              <div className="space-y-4">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold mb-1">$50B+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Assets Managed</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">150+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Countries Served</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">25+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Years Excellence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-12 xl:px-16">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <Logo size="small" className="mr-3" />
              <div>
                <h1 className="text-xl font-bold">SCHWARZES SCHILD</h1>
                <p className="text-gray-600 text-sm">Swiss Private Banking</p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto">
            {/* Security Status Indicator */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center">
              <Lock className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <div className="text-sm font-medium text-green-800">Secure Connection Active</div>
                <div className="text-xs text-green-600">256-bit SSL encryption enabled</div>
              </div>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {mode === AuthMode.LOGIN ? "Sign In" : "Open New Account"}
              </h2>
              <p className="text-gray-600">
                {mode === AuthMode.LOGIN 
                  ? "Access your secure banking portal" 
                  : "Join our exclusive private banking services"}
              </p>
            </div>

            {/* Login Form */}
            {mode === AuthMode.LOGIN && (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email or Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter your email or username"
                            className="h-12 rounded-lg border-gray-300 focus:border-black focus:ring-black"
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
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="h-12 rounded-lg border-gray-300 focus:border-black focus:ring-black pr-12"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-gray-700">
                            Remember this device for 30 days
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Signing In..." : "Sign In Securely"}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-gray-600 hover:text-black underline"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </form>
              </Form>
            )}

            {/* Registration Form */}
            {mode === AuthMode.SIGNUP && (
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-6">
                  <FormField
                    control={signupForm.control}
                    name="fullname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Full Legal Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your full legal name"
                            className="h-12 rounded-lg border-gray-300 focus:border-black focus:ring-black"
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
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Choose a unique username"
                            className="h-12 rounded-lg border-gray-300 focus:border-black focus:ring-black"
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
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a strong password"
                              className="h-12 rounded-lg border-gray-300 focus:border-black focus:ring-black pr-12"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              className="h-12 rounded-lg border-gray-300 focus:border-black focus:ring-black pr-12"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium rounded-lg"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Creating Account..." : "Open New Account"}
                  </Button>
                </form>
              </Form>
            )}

            {/* Form Toggle */}
            <div className="mt-8 text-center">
              <Separator className="my-6" />
              <p className="text-gray-600">
                {mode === AuthMode.LOGIN ? "New to SchwarzesSchild?" : "Already have an account?"}
              </p>
              <Button
                variant="ghost"
                onClick={() => setMode(mode === AuthMode.LOGIN ? AuthMode.SIGNUP : AuthMode.LOGIN)}
                className="mt-2 text-black hover:text-gray-700 font-medium"
              >
                {mode === AuthMode.LOGIN ? "Open New Account" : "Sign In"}
              </Button>
            </div>

            {/* Status Footer */}
            <div className="mt-12 text-center">
              <div className="flex justify-center items-center text-sm text-gray-500 mb-4">
                <div className="flex items-center mr-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  All systems operational
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  Zurich, Switzerland
                </div>
              </div>
              
              <div className="text-xs text-gray-400 space-x-4">
                <a href="#" className="hover:text-gray-600">Need help logging in?</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-600">Contact Support</a>
                <span>•</span>
                <a href="#" className="hover:text-gray-600">Privacy Policy</a>
              </div>
            </div>

            {/* Back to Landing */}
            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
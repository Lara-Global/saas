"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import Toaster from "@/components/Toaster";
import HyperText from "@/components/ui/hyper-text";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface LoginResponse {
  id: string;
  token: string;
  role: 'Admin' | 'Employee' | 'Manager' | 'SuperAdmin';
  company: string;
  currency: string;
}

interface LoginError {
  message?: string;
}

const ROLE_REDIRECTS: Record<string, string> = {
  Admin: "/admin",
  Employee: "/employee", 
  Manager: "/manager",
  SuperAdmin: "/super",
} as const;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateInputs = (): boolean => {
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }
    
    if (!password.trim()) {
      toast.error("Password is required");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const storeUserData = (data: LoginResponse): void => {
    const { id, token, role, company, currency } = data;
    
    // Store in localStorage
    localStorage.setItem("userId", id);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("company", company);
    localStorage.setItem("currency", currency);
    
    // Set secure cookie
    const cookieOptions = [
      `token1=${token}`,
      "path=/",
      "max-age=3600",
      "SameSite=Strict",
      ...(process.env.NODE_ENV === 'production' ? ["Secure"] : [])
    ].join("; ");
    
    document.cookie = cookieOptions;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateInputs()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email.trim().toLowerCase(), 
          password 
        }),
        credentials: "include",
      });

      const data: LoginResponse | LoginError = await response.json();

      if (response.ok && 'token' in data) {
        storeUserData(data);
        toast.success("Login successful! Redirecting...");
        
        // Small delay for better UX
        setTimeout(() => {
          const redirectPath = ROLE_REDIRECTS[data.role] || "/dashboard";
          router.push(redirectPath);
        }, 1000);
      } else {
        const errorMessage = 'message' in data ? data.message : "Invalid credentials";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-background shadow-lg rounded-lg p-8 border">
            <div className="text-center mb-8">
              <HyperText 
                className="text-3xl font-bold mb-2" 
                text="Welcome Back" 
              />
              <p className="text-muted-foreground text-sm">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                  className="w-full"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    className="w-full pr-10"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link 
                  href="/auth/password/forgot"
                  className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  Forgot your password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link 
                  href="/auth/register" 
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// ResetPassword.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import Toaster from "@/components/Toaster";
import HyperText from "@/components/ui/hyper-text";

export default function ResetPassword() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null); // Initialize token state

    // Extract the token on the client side
    useEffect(() => {
        const queryToken = new URLSearchParams(window.location.search).get("token");
        if (queryToken) {
            setToken(queryToken);
        } else {
            toast.error("Invalid reset link");
            router.push("/auth/login"); // Redirect if no token
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // Optional: Client-side password validation (e.g., length check)
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || "Password reset successful");
                router.push("/auth/login"); // Redirect to login
            } else {
                toast.error(data.message || "An error occurred");
            }
        } catch (error) {
            console.error("Reset password error:", error);
            toast.error("An error occurred during the request");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <Navbar />
            <Toaster />
            <div className="flex items-center justify-center "> {/* Full height screen centered */}
                <div className="max-w-md mx-auto mt-16 p-8 bg-background shadow-lg rounded-lg">
                  <HyperText className="text-4xl font-bold" text="Reset Password" />
                    <p className="text-muted-foreground text-center mb-8">
                        Enter your new password below.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="password">New Password:</Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="mt-2"
                                disabled={loading} // Disable input while loading
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirmPassword">Confirm Password:</Label>
                            <Input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="mt-2"
                                disabled={loading} // Disable input while loading
                                required
                            />
                        </div>
                        <Button type="submit" variant="default" className="w-full" disabled={loading}>
                            {loading ? "Resetting..." : "Reset Password"}
                        </Button>
                    </form>
                </div>
            </div>
            <br />
            <Footer />
        </div>
    );
}

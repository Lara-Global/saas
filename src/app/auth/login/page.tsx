"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import Toaster from "@/components/Toaster";
import HyperText from "@/components/ui/hyper-text";

export default function HelloWorld() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                const { id, token, role, company, currency } = data;

                // Store data securely
                localStorage.setItem("userId", id);
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                localStorage.setItem("company", company);
                localStorage.setItem("currency", currency);
                document.cookie = `token1=${token}; path=/; max-age=3600; SameSite=Strict`;

                toast.success("Login successful");

                // Redirect based on role
                const roleRedirects: Record<string, string> = {
                    Admin: "/admin",
                    Employee: "/employee",
                    Manager: "/manager",
                    SuperAdmin: "/super",
                };
                router.push(roleRedirects[role]);
            } else {
                toast.error(data.message || "An error occurred");
            }
        } catch {
            toast.error("An error occurred during login");
        }
    };

    return (
        <div>
            <Navbar />
            <Toaster />
            <div className="flex items-center justify-center min-h-screen">
                <div className="max-w-md mx-auto p-8 bg-background shadow-lg rounded-lg">
                    <HyperText className="text-4xl font-bold mb-4 text-center" text="Welcome Back" />
                    <p className="text-muted-foreground text-center mb-8">
                        Enter your credentials below to access your account.
                    </p>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <Label htmlFor="email">Email:</Label>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@domain.com"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password:</Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <Link href="/auth/password/forgot">
                                <Button type="button" variant="link">Forgot password?</Button>
                            </Link>
                        </div>
                        <Button type="submit" variant="default" className="w-full">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

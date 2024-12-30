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
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("userId", data.id);
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("company", data.company);
                localStorage.setItem("currency", data.currency);

                document.cookie = `token1=${data.token}; path=/; max-age=3600; SameSite=Strict`;

                // Show success toast
                toast.success("Login successful");

                // Redirect based on role
                switch (data.role) {
                    case "Admin":
                        return router.push("/admin");
                    case "Employee":
                        return router.push("/employee");
                    case "Manager":
                        return router.push("/manager");
                    case "SuperAdmin":
                        return router.push("/super");
                }
            } else {
                // Show error toast
                toast.error(data.message || "An error occurred");
            }
        } catch (error) {
            // Show error toast for unexpected errors
            toast.error("An error occurred during login");
        }
    };

    return (
        <div>
            <Navbar />
            <Toaster />
            <div className="flex items-center justify-center "> {/* Full height screen centered */}
                <div className="max-w-md mx-auto mt-16 p-8 bg-background shadow-lg rounded-lg">
                    <HyperText
                        className="text-4xl font-bold  "
                        text="Welcome Back"
                    />
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
                                className="mt-2"
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
                                className="mt-2"
                                required
                            />
                        </div>
                        <Link
                            href="/auth/password/forgot"
                            
                        >
                            <Button type="submit" variant="link" >
                                Forgot password?
                            </Button> 
                        </Link>
                        <Button type="submit" variant="default" className="w-full">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
            <br />

            <Footer />
        </div>
    );
}

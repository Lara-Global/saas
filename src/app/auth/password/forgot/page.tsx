// ForgotPassword.js
"use client";

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

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                // Show success toast
                toast.success(data.message || "Check your email for further instructions");
            } else {
                // Show error toast
                toast.error(data.message || "An error occurred");
            }
        } catch (error) {
            toast.error("An error occurred during the request");
        }
    };

    return (
        <div>
            <Navbar />
            <Toaster />
            <div className="flex items-center justify-center">
                <div className="max-w-md mx-auto mt-16 p-8 bg-background shadow-lg rounded-lg">
                    <HyperText
                        className="text-4xl font-bold"
                        text="Forgot Password"
                    />
                    <p className="text-muted-foreground text-center mb-8">
                        Enter your email address below to receive a password reset link.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        <Button type="submit" variant="default" className="w-full">
                            Send Reset Link
                        </Button>
                    </form>
                </div>
            </div><br />
            <Footer />
        </div>
    );
}

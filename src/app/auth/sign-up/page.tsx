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

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    company: companyName || `${name}'s Company`,
                }),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Sign-up successful! Please check your email to verify your account.");
               
            } else {
                toast.error(data.message || "An error occurred");
            }
        } catch (error) {
            toast.error("An error occurred during sign-up");
        }
    };

    return (
        <div>
            <Navbar />
            <Toaster />
            <div className="flex items-center justify-center ">
                <div className="max-w-md mx-auto mt-16 p-8 bg-background shadow-lg rounded-lg">
                    <HyperText className="text-4xl font-bold" text="Create your account" />
                    <p className="text-muted-foreground text-center mb-8">
                        Enter your details to sign up.
                    </p>
                    <form onSubmit={handleSignUp} className="space-y-6">
                        <div>
                            <Label htmlFor="name">Name:</Label>
                            <Input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="mt-2"
                                required
                            />
                        </div>
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
                        <div>
                            <Label htmlFor="confirmPassword">Confirm Password:</Label>
                            <Input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter your password"
                                className="mt-2"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="companyName">Company Name (optional):</Label>
                            <Input
                                type="text"
                                id="companyName"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="Your company name"
                                className="mt-2"
                            />
                        </div>
                        <Button type="submit" variant="default" className="w-full">
                            Sign Up
                        </Button>
                    </form>
                    <p className="text-center mt-4">
                        Already have an account?{" "}
                        <Link href="/auth/login">
                            <Button type="button" variant="link">
                                Login here
                            </Button>
                        </Link>
                    </p>
                </div>
            </div>
            <br />
            <Footer />
        </div>
    );
}

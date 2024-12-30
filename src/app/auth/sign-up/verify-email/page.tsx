"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import Toaster from "@/components/Toaster";

export default function VerifyEmail() {
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null); // Initialize token state

    useEffect(() => {
        const queryToken = new URLSearchParams(window.location.search).get("token");
        if (queryToken) {
            setToken(queryToken);
            verifyEmail(queryToken); // Call verifyEmail with the token
        } else {
            toast.error("Invalid verification link");
            router.push("/auth/login"); // Redirect if no token
        }
    }, [router]);

    const verifyEmail = async (token: string) => {
        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify-email?token=${token}`, {
                method: "GET",  // Change POST to GET
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                setVerified(true);
                toast.success("Email verified successfully!");
                // Redirect to login or another page after successful verification
                setTimeout(() => router.push("/auth/login"), 2000);
            } else {
                setError(data.message || "Invalid or expired token");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false); // Ensure loading is set to false regardless of success or error
        }
    };

    return (
        <div>
            <Navbar />
            <Toaster />
            <div className="flex items-center justify-center min-h-screen">
                <div className="max-w-md mx-auto mt-16 p-8 bg-background shadow-lg rounded-lg">
                    {loading ? (
                        <p className="text-center">Verifying your email...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : verified ? (
                        <p className="text-center text-green-500">Your email has been verified!</p>
                    ) : (
                        <p className="text-center">Please wait while we verify your email...</p>
                    )}
                    <Button onClick={() => router.push("/auth/login")} className="w-full mt-4">
                        Go to Login
                    </Button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

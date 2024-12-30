"use client";

import { useState } from 'react';
import { CoolMode } from "@/components/ui/cool-mode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/Label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import HyperText from "@/components/ui/hyper-text";
import Toaster from "@/components/Toaster";
export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

  

    const handleContact = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Message sent successfully')
              
                setName('');
                setEmail('');
                setMessage('');
            } else {
                toast.error(data.message || "An error occurred");
            }
        } catch (error) {
            toast.error("An error occurred while sending the message");
            
        }
    };

    return (
        <div>
            <Navbar />

            <Toaster />
            <div className="max-w-md mx-auto mt-16 p-8 bg-background shadow-lg rounded-lg">
                <HyperText
                  
                    className="text-4xl font-bold " text="Contact Us"
                />
                <p className="text-muted-foreground text-center mb-8">
                    Send us a message and we’ll get back to you.
                </p>
                <form onSubmit={handleContact} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Name:</Label>
                        <Input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="mt-2"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Company email:</Label>
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
                        <Label htmlFor="message">How can we help?:</Label>
                        <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your Company needs"
                            className="mt-2"
                            required
                        />
                    </div>
                    <CoolMode>
                    <Button type="submit" variant="default" className="w-full">
                        Send Message
                    </Button>
                 </CoolMode>
                    </form>
            </div><br />
            <Footer />
        </div>
    );
}

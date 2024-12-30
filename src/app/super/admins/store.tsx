"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetDescription } from "@/components/ui/sheet";
import { SaveAll } from "lucide-react";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";


const StoreAdmin = () => {
    const router = useRouter();
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const [admin, setAdmin] = useState({
        name: "",
        email: "",
        city: "",
        password: "",
        companyName: "",
        role: "Admin", // Default role
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAdmin((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-admin-company`, admin, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsSheetOpen(false);
            router.refresh(); 
        } catch (error) {
            console.error("Error creating admin", error);
        }
    };

    return (
        <div className="flex flex-col gap-5 w-full">
            <Button asChild variant="link">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger>
                        <div className="flex items-center gap-4 mb-4">
                            <Button
                                variant="link"
                                onClick={() => setIsSheetOpen(true)}
                                className="ml-auto"
                            >
                                <Plus size="1.2em" />
                                <span>New Admin</span>
                            </Button>
                        </div>
                    </SheetTrigger>

                    <SheetContent side="right">
                        <SheetHeader>
                            <SheetTitle>Create Admin</SheetTitle>
                            <SheetDescription>
                                Add a new admin to your store.
                            </SheetDescription>
                        </SheetHeader>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="mb-4">
                                <Label htmlFor="name">Name:</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={admin.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter admin name"
                                    className="mt-1"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="email">Email:</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={admin.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter admin email"
                                    className="mt-1"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="city">City:</Label>
                                <Input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={admin.city}
                                    onChange={handleInputChange}
                                    placeholder="Enter admin city"
                                    className="mt-1"
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="password">Password:</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={admin.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter password"
                                    className="mt-1"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="companyName">Company Name:</Label>
                                <Input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={admin.companyName}
                                    onChange={handleInputChange}
                                    placeholder="Enter company name"
                                    className="mt-1"
                                />
                            </div>

                            <SheetFooter>
                                <Button type="submit" className="w-full">
                                    <SaveAll size="1.2em" className="mr-2" /> Save
                                </Button>
                            </SheetFooter>
                        </form>
                    </SheetContent>
                </Sheet>
            </Button>
        </div>
    );
};

export default StoreAdmin;

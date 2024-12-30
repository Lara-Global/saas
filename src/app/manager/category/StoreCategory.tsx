"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetDescription } from "@/components/ui/sheet"; // Ensure the path is correct
import { SaveAll } from "lucide-react";
import axios from "axios";

import {Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/textarea";
const StoreCategory = () => {
    const router = useRouter();
    const [isSheetOpen, setIsSheetOpen] = useState(false); 
    
    const company = localStorage.getItem('company');
    const [category, setCategory] = useState({
        name: "",
        description: "",
        status: "",
        company: company
    });

    const handleCatChange = (value: string) => {
        setCategory((prevState) => ({
            ...prevState,
            status: value,
        }));
    };
    const [token, setToken] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCategory((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleTexaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setCategory((prevState) => ({
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
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`, category, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
        } catch (error) {
            console.error("Error creating category", error);
        }
        setIsSheetOpen(false);
        router.refresh(); 
    };

    return (
        <div className="flex flex-col gap-5 w-full">
            <Button asChild variant="link">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} >
                    <SheetTrigger>
                        <div className="flex items-center gap-4 mb-4">
                            <Button
                                variant="link"
                                onClick={() => setIsSheetOpen(true)}
                                className="ml-auto"
                            >
                                <Plus size="1.2em" />
                                <span>New Category</span>
                            </Button>
                        </div>

                    </SheetTrigger>

                    <SheetContent side="right">
                        <SheetHeader>
                            <SheetTitle>Create Category</SheetTitle>
                            <SheetDescription>
                                Add a new category to your product list.
                            </SheetDescription>
                        </SheetHeader>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="mb-4">
                                <Label htmlFor="name">Category Name:</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={category.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter category name"
                                    className="mt-1"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="description">Description:</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={category.description}
                                    onChange={handleTexaChange}
                                    placeholder="Enter category description"
                                    className="mt-1"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="status">Status:</Label>
                                <Select onValueChange={handleCatChange} >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        
                                        <SelectItem value="To_buy">
                                            Ready to Sell
                                            </SelectItem>
                                        <SelectItem value="Coming_soon">
                                            Coming Soon
                                         </SelectItem>
                                       
                                       
                                    </SelectContent>

                                </Select>
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

export default StoreCategory;

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetDescription } from "@/components/ui/sheet"; // Ensure the path is correct
import { Save ,Pen } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/textarea";

interface UpdateCategoryProps {
    categoryId: string | null; 
}

const UpdateCategory: React.FC<UpdateCategoryProps> = ({ categoryId }) => {
    const company = localStorage.getItem('company');
    const router = useRouter();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
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

   
    useEffect(() => {
        if (categoryId) {
            const token = localStorage.getItem("token");
            if (token) {
                axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/${categoryId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        setCategory(response.data.category); 
                    })
                    .catch((error) => {
                        console.error("Error fetching category", error);
                    });
            }
        }
    }, [categoryId]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            if (categoryId) {
                // Update category
                await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/${categoryId}`, category, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                // Create new category
                await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`, category, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            setIsSheetOpen(false); 
            router.refresh(); 
        } catch (error) {
            console.error("Error saving category", error);
        }
    };

    return (
        <div className="flex flex-col gap-5 w-full">
            <Button asChild variant="link">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} >
                    <SheetTrigger>
                        <Button variant="default" onClick={() => setIsSheetOpen(true)}>
                            <Pen size="1.2em" className="mr-2" />     {categoryId ? "Update" : "Add New"}
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right">
                        <SheetHeader>
                            <SheetTitle>{categoryId ? "Update Category" : "Create Category"}</SheetTitle>
                            <SheetDescription>
                                {categoryId ? "Update the existing category details." : "Add a new category to your product list."}
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
                                />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="status">Status:</Label>
                                <Select onValueChange={handleCatChange} value={category.status}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="To_buy">Ready to Sell</SelectItem>
                                        <SelectItem value="Coming_soon">Coming soon</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <SheetFooter>
                                <Button type="submit" className="w-full">
                                    <Save  size="1.2em" className="mr-2" /> Save
                                </Button>
                            </SheetFooter>
                        </form>
                    </SheetContent>
                </Sheet>
            </Button>
        </div>
    );
};

export default UpdateCategory;

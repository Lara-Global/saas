"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SaveAll } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { getcategory } from "@/components/api/categoryApi";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
interface Category {
    _id: string;
    name: string;
    description: string;
    status: string;
    __v: number;
}

const StoreProduct = () => {
    const router = useRouter();
    
    const [product, setProduct] = useState({
        nom: "",
        prix: "",
        description: "",
        company: "",
        category: "",
    });

    const [token, setToken] = useState<string | null>(null);
    const [company, setCompany] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]); // Typed categories array


    useEffect(() => {
        // Retrieve token from localStorage on client-side
        const storedToken = localStorage.getItem("token");
        const storedCompany = localStorage.getItem("company");
        setCompany(storedCompany)
        setToken(storedToken);
       
        // Fetch categories
        if (storedToken) {
            const fetchData = async () => {
                const categories = await getcategory(storedToken);
                setCategories(categories)
                setProduct(prevState => ({
                    ...prevState,
                    company: storedCompany || ""
                }));
            }
            fetchData()
        }
        
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCategoryChange = (value: string) => {
        setProduct((prevState) => ({
            ...prevState,
            category: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        axios
            .post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
                product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                router.push("/manager/product");
            })
            .catch((error) => {
                console.error("There was an error creating the product!", error);
            });
    };

    return (
        <Card className="p-6 max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Create Product</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="nom">Title:</Label>
                        <Input
                            type="text"
                            id="nom"
                            name="nom"
                            value={product.nom}
                            onChange={handleInputChange}
                            placeholder="Enter product title"
                            className="mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="prix">Price:</Label>
                        <Input
                            type="number"
                            id="prix"
                            name="prix"
                            value={product.prix}
                            onChange={handleInputChange}
                            placeholder="Enter product price"
                            className="mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="description">Description:</Label>
                        <Textarea
                            
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleTextareaChange}
                            placeholder="Enter product description"
                            className="mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="category">Category:</Label>
                        <Select onValueChange={handleCategoryChange} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category._id} value={category._id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>

                        </Select>
                    </div>

                    <Button type="submit" className="w-full">
                        <SaveAll size="1.2em" className="mr-2" /> Save
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default StoreProduct;

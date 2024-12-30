"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { getcategory } from "@/components/api/categoryApi"; // API call for categories
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
interface Category {
    _id: string;
    name: string;
}

const EditProduct = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // client-side hook
    const company = localStorage.getItem('company');
    const id = searchParams.get('id');

    // State for product details
    const [product, setProduct] = useState({
        nom: "",
        prix: "",
        description: "",
        category: "",
        company: company,
    });

    // State for categories
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // For loading state
    const [token, setToken] = useState<string | null>(null);

    // Fetch categories and product details
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        } else {
            setError("No token found");
            return;
        }

        // Fetch categories
        const fetchCategories = async () => {
            try {
                const categories = await getcategory(storedToken);
                setCategories(categories);
                setLoading(false);
            } catch (error) {
                setError("Error fetching categories");
                setLoading(false);
            }
        };

        fetchCategories();

        // Fetch product details
        if (id && storedToken) {
            axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
                .then((response) => {
                    setProduct(response.data);
                })
                .catch((error) => {
                    setError("Error fetching product details");
                });
        }
    }, [id]);

    // Handle category change
    const handleCategoryChange = (value: string) => {
        setProduct((prevState) => ({
            ...prevState,
            category: value,
        }));
    };
    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission to save changes
    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!token) {
            setError("No token found");
            return;
        }

        try {
            await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`, product, {
                headers: { Authorization: `Bearer ${token}` },
            });
            router.push("/manager/product");
        } catch (error) {
            setError("Error updating product");
        }
    };

    if (loading) return <p>Loading...</p>;

    if (error) return <p>{error}</p>;

    return (
        <Card className="p-6 max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Update Product</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSave}>
                    <div className="mb-4">
                        <Label htmlFor="nom">Title:</Label>
                        <Input
                            type="text"
                            id="nom"
                            name="nom"
                            value={product.nom}
                            onChange={(e) => setProduct({ ...product, nom: e.target.value })}
                            placeholder="Enter product title"
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="prix">Price:</Label>
                        <Input
                            type="number"
                            id="prix"
                            name="prix"
                            value={product.prix}
                            onChange={(e) => setProduct({ ...product, prix: e.target.value })}
                            placeholder="Enter product price"
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="description">Description:</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            placeholder="Enter product description"
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="category">Category:</Label>
                        <Select value={product.category} onValueChange={handleCategoryChange} required>
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
                        Save
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default EditProduct;

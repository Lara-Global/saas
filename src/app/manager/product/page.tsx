"use client";

import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "@/components/api/productApi";
import { getcategory } from "@/components/api/categoryApi"; // API call for categories
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { Trash, PenLine, Plus } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import getCompanyCurrencyFromLocalStorage from "@/components/tokens/company";

type Props = {};
type Payment = {
    _id: string;
    nom: string;
    prix: number;
    description: string;
    category: { _id: string; name: string };
};

const Products: React.FC<Props> = () => {
    const [data, setData] = useState<Payment[]>([]);
    const [filteredData, setFilteredData] = useState<Payment[]>([]);
    const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // For category filtering
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currency, setCurrency] = useState<string>(""); // To store the currency

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // Fetch the company currency on mount
    useEffect(() => {
        const fetchedCurrency = getCompanyCurrencyFromLocalStorage();
        setCurrency(fetchedCurrency || "DH"); // Default to "DH" if no currency is found

        const fetchData = async () => {
            if (!token) {
                setError("No token found");
                return;
            }
            try {
                const products = await getProducts(token);
                const categories = await getcategory(token); // Fetch categories
                setData(products);
                setCategories(categories);
                setFilteredData(products);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const handleRemoveProduct = async () => {
        if (!token || !selectedProductId) {
            setError("No token or product ID found");
            return;
        }
        try {
            await deleteProduct(token, selectedProductId);
            setData(data.filter(product => product._id !== selectedProductId));
            setFilteredData(filteredData.filter(product => product._id !== selectedProductId));
        } catch (error) {
            // Handle error if necessary
        }
        setDialogOpen(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterProducts(value, selectedCategory);
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
        filterProducts(searchTerm, categoryId);
    };

    const filterProducts = (searchTerm: string, categoryId: string | null) => {
        let filtered = data;
        if (searchTerm.trim()) {
            filtered = filtered.filter((product) =>
                product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (categoryId) {
            filtered = filtered.filter(product => product.category._id === categoryId);
        }
        setFilteredData(filtered);
    };

    const confirmRemoveProduct = (productId: string) => {
        setSelectedProductId(productId);
        setDialogOpen(true);
    };

    // Use the currency in the `prix` column
    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: "nom",
            header: "Title",
        },
        {
            accessorKey: "prix",
            header: `Price (${currency})`, // Use dynamic currency in header
            cell: ({ row }) => (
                <span>
                    {row.original.prix} {currency} {/* Display price with currency */}
                </span>
            ),
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "category.name",
            header: "Category", // Display the category name
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-4">
                    <Button variant="default" className="mr-2 flex items-center gap-1">
                        <Link href={`./product/edit?id=${row.original._id}`} className="flex items-center gap-1">
                            <PenLine size="1.2em" />
                            <span>Edit</span>
                        </Link>
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => confirmRemoveProduct(row.original._id)}
                    >
                        <Trash size="1.2em" />
                        <span>Remove</span>
                    </Button>
                </div>
            )
        }
    ];

    if (loading) return <div><Alert className="mt-4" variant="default">
        <AlertTitle>Loading...</AlertTitle>
        <AlertDescription>{loading}</AlertDescription>
    </Alert></div>;

    if (error) return <div><Alert variant="destructive" className="mt-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
    </Alert></div>;

    return (
        <div className="flex flex-col gap-5 w-full">
            <PageTitle title="Products" />

            {/* Search bar, Category filter, and Add New Product button */}
            <div className="flex items-center gap-4 mb-4 w-full">
                {/* Search bar */}
                <Input
                    placeholder="Search product by name or description..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full max-w-md"
                />

                {/* Category filter */}
                <Select value={selectedCategory || ""} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full max-w-xs">
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

                {/* Add New Product button */}
                <Button variant="link" className="ml-auto">
                    <Link href={`./product/store`} className="flex items-center gap-1">
                        <Plus size="1.2em" />
                        <span>New Product</span>
                    </Link>
                </Button>
            </div>

            <DataTable columns={columns} data={filteredData} />

            {/* Confirmation Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Removal</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to remove this product? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="default" onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleRemoveProduct}>
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Products;

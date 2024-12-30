"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import axios from "axios";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type Company = {
    _id?: string; // Make _id optional initially
    name: string;
    address: string;
    currency: string;
    email: string;
    phone: string;
    website?: string;
    logo?: string; // URL or file path for the logo
};

export default function CompanySettingsPage() {
    const [company, setCompany] = useState<Company>({
        name: "",
        address: "",
        currency: "MAD", // Set default currency as MAD
        email: "",
        phone: "",
        website: "",
        logo: "",
    });
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [token, setToken] = useState<string | null>(null);

    // List of available currencies
    const currencies = [
        { code: "USD", name: "US Dollar" },
        { code: "EUR", name: "Euro" },
        { code: "MAD", name: "Moroccan Dirham" },
        { code: "GBP", name: "British Pound" },
        { code: "JPY", name: "Japanese Yen" },
        { code: "CAD", name: "Canadian Dollar" },
        { code: "AUD", name: "Australian Dollar" },
        // Add more currencies as needed
    ];

    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem("token"));
            fetchCompanyDetails();
        }
    }, []);

    const fetchCompanyDetails = async () => {
        try {
            if (typeof window !== "undefined") {
                const adminId = localStorage.getItem("userId");
                const token = localStorage.getItem("token");

                if (!adminId || !token) {
                    setMessage("Admin ID or token is missing.");
                    return;
                }

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies/by-admin/${adminId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setCompany(response.data);
            }
        } catch (error) {
            console.error("Error fetching company details:", error);
            setMessage("Failed to load company details.");
        }
    };

    const handleCompanyUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", company.name);
            formData.append("address", company.address);
            formData.append("email", company.email);
            formData.append("phone", company.phone);
            formData.append("currency", company.currency); // Include currency in form data
            if (company.website) formData.append("website", company.website);
            if (logoFile) formData.append("logo", logoFile);

            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies/${company._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setMessage("Company updated successfully!");
            setLogoFile(null);
        } catch (error) {
            console.error("Error updating company:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md p-8 border border-gray-200 shadow-lg rounded-lg">
                <PageTitle title="Company Settings" />
                <form className="space-y-6" onSubmit={handleCompanyUpdate}>
                    <div>
                        <Label htmlFor="name">Company Name</Label>
                        <Input
                            id="name"
                            type="text"
                            value={company.name}
                            onChange={(e) => setCompany({ ...company, name: e.target.value })}
                            required
                            className="mt-1 w-full text-sm py-2 px-3 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            type="text"
                            value={company.address}
                            onChange={(e) => setCompany({ ...company, address: e.target.value })}
                            required
                            className="mt-1 w-full text-sm py-2 px-3 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={company.email}
                            onChange={(e) => setCompany({ ...company, email: e.target.value })}
                            required
                            className="mt-1 w-full text-sm py-2 px-3 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            type="text"
                            value={company.phone}
                            onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                            required
                            className="mt-1 w-full text-sm py-2 px-3 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <Label htmlFor="currency">Currency</Label>
                        <select
                            id="currency"
                            value={company.currency}
                            onChange={(e) => setCompany({ ...company, currency: e.target.value })}
                            className="mt-1 w-full text-sm py-2 px-3 border border-gray-300 rounded-md"
                            required
                        >
                            {currencies.map((currency) => (
                                <option key={currency.code} value={currency.code}>
                                    {currency.name} ({currency.code})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                            id="website"
                            type="text"
                            value={company.website || ""}
                            onChange={(e) => setCompany({ ...company, website: e.target.value })}
                            className="mt-1 w-full text-sm py-2 px-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    {message && (
                        <Alert className="mt-4" variant="default">
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>{message}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" variant="default" className="w-full py-2">
                        Update Company
                    </Button>
                </form>
            </div>
        </div>
    );
}

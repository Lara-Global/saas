"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SaveAll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Store = () => {

    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        email: "",
        city: "",
        password: "",
        role: "User",
        company: ""
    });

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Retrieve token and company from localStorage when component mounts
        const storedToken = localStorage.getItem('token');
        const storedCompany = localStorage.getItem('company');

        setToken(storedToken);
        setUser(prevState => ({
            ...prevState,
            company: storedCompany || "" 
        }));
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRoleChange = (value: string) => {
        setUser((prevState) => ({
            ...prevState,
            role: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (token) {
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store-user`, user, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                router.push("/admin/users");
            } catch (error) {
                console.error("There was an error creating the user!", error);
            
            }
        } else {
            console.error("No token found");
            // Handle token error, show notification, or redirect
        }
    };

    return (
        <Card className="p-6 max-w-lg mx-auto">
            <CardHeader>
                <CardTitle>Create User</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="name">Name:</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            placeholder="Enter name"
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
                            value={user.email}
                            onChange={handleInputChange}
                            placeholder="Enter email"
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
                            value={user.city}
                            onChange={handleInputChange}
                            placeholder="Enter city"
                            className="mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password">Password:</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                            className="mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="role">Role:</Label>
                        <Select  onValueChange={handleRoleChange}>
                            <SelectTrigger id="role">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Manager">Manager</SelectItem>
                                <SelectItem value="Employee">Employee</SelectItem>
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

export default Store;

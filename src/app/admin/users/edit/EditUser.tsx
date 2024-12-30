"use client";

import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { SaveAll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Edit = () => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState({
        name: "",
        email: "",
        city: "",
        role: "User", // Default role
    });
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        // Retrieve token from localStorage on client-side
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);

        if (id && storedToken) {
            axios
                .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/find-user/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`,
                    },
                })
                .then((response) => {
                    setUser(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                });
        }
    }, [id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleRoleChange = (value: string) => {
        setUser((prevUser) => ({
            ...prevUser,
            role: value,
        }));
    };

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();

        if (token) {
            axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-user/${id}`, user, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(() => {
                    router.push("/admin/users");
                })
                .catch((error) => {
                    console.error("Error updating user:", error);
                    // Handle error, show notification, or set error state
                });
        } else {
            console.error("No token found");
            // Handle token error, show notification, or redirect
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Card className="p-6 max-w-lg mx-auto">
                <CardHeader>
                    <CardTitle>Update User</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave}>
                        <div className="mb-4">
                            <Label htmlFor="name">Username:</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={user.name}
                                onChange={handleInputChange}
                                placeholder="Enter username"
                                className="mt-1"
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
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="role">Role:</Label>
                            <Select value={user.role} onValueChange={handleRoleChange}>
                                <SelectTrigger
                                    id="role"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Employee">Employee</SelectItem>
                                    <SelectItem value="Manager">Manager</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="w-full">
                            <SaveAll size="1.2em" className="mr-2" /> Save
                        </Button>
                    </form>
                </CardContent>
            </Card>

        </Suspense >
    );

};

export default Edit;

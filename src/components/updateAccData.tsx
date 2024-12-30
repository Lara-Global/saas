
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { toast } from "sonner";
export default function TabsDemo() {
    const [user, setUser] = useState({ name: "", email: "", city: "" });
    const [token, setToken] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    const [routerReady, setRouterReady] = useState(false); 
    const [isMounted, setIsMounted] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setRouterReady(true); // Ensure router is available client-side
    }, []);

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const userId = localStorage.getItem("userId");

            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-password`,
                {
                    userId,
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(response.data.message);
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "An error occurred while updating the password."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (routerReady) {
            // Retrieve token and user ID from localStorage
            const storedToken = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            setToken(storedToken);
            setId(userId);

            if (userId && storedToken) {
                // Fetch user data
                axios
                    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/find-user/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`,
                        },
                    })
                    .then((response) => {
                        setUser(response.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching user:", error);
                    });
            }
        }
    }, [routerReady]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();

        if (token && id) {
            axios
                .put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-user/${id}`, user, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    toast.success(" your info update succesful");
                })
                .catch((error) => {
                    toast.error("Error updating user:", error);
                });
        } else {
            toast.error("No token or user ID found");
        }
    };

    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>Update your account details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={user.name}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={user.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                name="city"
                                value={user.city}
                                onChange={handleInputChange}
                                placeholder="Enter your city"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSave}>Save changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>

            {/* Password tab */}
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                            Change your password here. After saving, you ll be logged out.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handlePasswordUpdate}>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Current password</Label>
                                <Input
                                    id="current"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input
                                    id="new"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="confirm">Confirm new password</Label>
                                <Input
                                    id="confirm"
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Updating..." : "Save password"}
                            </Button>
                        </CardFooter>
                    </form>

                  
                </Card>
            </TabsContent>
        </Tabs>
    );
}

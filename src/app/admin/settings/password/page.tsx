"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import axios from "axios";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
type Props = {};

export default function SettingsPage({ }: Props) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Fetch token from localStorage on client-side
        setToken(localStorage.getItem('token'));
    }, []);

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setMessage("New passwords do not match.");
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-password`, {
                userId,
                currentPassword,
                newPassword,
            }, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            setMessage(response.data.message);
        } catch (error) {
            setMessage("An error occurred while updating the password.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8 ">
            <div className="w-full max-w-md p-8  border border-gray-200 shadow-lg rounded-lg">
                <PageTitle title="Settings" />

                <form className="space-y-6" onSubmit={handlePasswordUpdate}>
                    <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                            id="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="mt-1 w-full text-sm py-2 px-3 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="mt-1 w-full text-sm py-2 px-3 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                        <Input
                            id="confirmNewPassword"
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            required
                            className="mt-1 w-full text-sm py-2 px-3 border border-gray-300 rounded-md"
                        />
                    </div>
                    {message && (
                        <Alert className="mt-4" variant="default">
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>{message}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" className="w-full py-2">Update Password</Button>
                </form>
            </div>
        </div>
    );
}

"use client";

import { Trash, PenLine, Search } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { getContacts, deleteContact } from "@/components/api/adminMessages"; // Import your API functions

type Props = {};

type Contact = {
    _id: string;
    name: string;
    email: string;
    message: string;
};

const ContactsPage: React.FC<Props> = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [selectedContactId, setSelectedContactId] = useState<string | null>(null); // State to track the selected contact for deletion
    const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError("No token found");
                return;
            }
            try {
                const contactsF = await getContacts(token);
                setContacts(contactsF);
                setFilteredContacts(contactsF);
                
            } catch (error) {

                console.error("Error fetching contacts:", error);
                setError("Failed to fetch contacts");
            }

        
            
        }
        fetchData()
    }, []);

    const handleRemoveContact = async () => {
        const token = localStorage.getItem('token');
        if (!token || !selectedContactId) {
            setError("No token or contact ID found");
            return;
        }

        try {
            // Use the deleteContact API method to remove a contact
            await deleteContact(token, selectedContactId);
            setContacts(contacts.filter(contact => contact._id !== selectedContactId));
            setFilteredContacts(filteredContacts.filter(contact => contact._id !== selectedContactId));
            setDialogOpen(false);
        } catch (error) {
            console.error("Error removing contact:", error);
            setError("Failed to remove contact");
        }
    };

    const confirmRemoveContact = (contactId: string) => {
        setSelectedContactId(contactId); // Store the selected contact ID
        setDialogOpen(true); // Open the confirmation dialog
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setFilteredContacts(contacts);
        } else {
            const filtered = contacts.filter((contact) =>
                contact.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredContacts(filtered);
        }
    };

    const columns: ColumnDef<Contact>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="flex gap-2 items-center">
                    <img
                        className="h-10 w-10"
                        src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue("name")}`}
                        alt="contact-image"
                    />
                    <p>{row.getValue("name")}</p>
                </div>
            )
        },
        {
            accessorKey: "email",
            header: "Email"
        },
        {
            accessorKey: "message",
            header: "Message"
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-4">
                    <Button variant="destructive" className="flex items-center gap-1" onClick={() => confirmRemoveContact(row.original._id)}>
                        <Trash size="1.2em" />
                        <span>Remove</span>
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="flex flex-col gap-5 w-full">
            <PageTitle title="Contacts" />

            {/* Search Bar */}
            <div className="flex items-center gap-2 mb-4">
                <Input
                    placeholder="Search contact by name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full max-w-md"
                />
                <Search size="1.5em" />
            </div>

            {error && (
                <Alert className="mt-4" variant="default">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <DataTable columns={columns} data={filteredContacts} />

            {/* Confirmation Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Removal</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to remove this contact? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="default" onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleRemoveContact}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ContactsPage;

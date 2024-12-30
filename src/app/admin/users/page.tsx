"use client";

import { Trash, PenLine, UserPlus, Search } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import axios from 'axios';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";

type Props = {};

type User = {
  _id: string;
  name: string;
  email: string;
  city: string;
  role: string;
};

const UsersPage: React.FC<Props> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // State to track the selected user for deletion
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility

  useEffect(() => {
    const token = localStorage.getItem('token');
    const company = localStorage.getItem('company');
    
    if (!token) {
      setError("No token found");
      return;
    }

    axios
      .get<User[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/company/${company}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
      });
  }, []);

  const handleRemoveUser = async () => {
    const token = localStorage.getItem('token');
    if (!token || !selectedUserId) {
      setError("No token or user ID found");
      return;
    }

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/destroy-user/${selectedUserId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user._id !== selectedUserId));
      setFilteredUsers(filteredUsers.filter(user => user._id !== selectedUserId));
      setDialogOpen(false);
    } catch (error) {
      console.error("Error removing user:", error);
      setError("Failed to remove user");
    }
  };

  const confirmRemoveUser = (userId: string) => {
    setSelectedUserId(userId); // Store the selected user ID
    setDialogOpen(true); // Open the confirmation dialog
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <img
            className="h-10 w-10"
            src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${row.getValue("name")}`}
            alt="user-image"
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
      accessorKey: "city",
      header: "City"
    },
    {
      accessorKey: "role",
      header: "Role"
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <Button variant="default" className="mr-2 flex items-center gap-1">
            <Link href={`/admin/users/edit?id=${row.original._id}`} className="flex items-center gap-1">
              <PenLine size="1.2em" />
              <span>Edit</span>
            </Link>
          </Button>

          <Button
            variant="destructive"
            className="flex items-center gap-1"
            onClick={() => confirmRemoveUser(row.original._id)}
          >
            <Trash size="1.2em" />
            <span>Remove</span>
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Users" />

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="Search user by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full max-w-md"
        />
        <Search size="1.5em" />
      </div>

      <Button variant="link">
        <Link href={`/admin/users/store`} className="flex items-center gap-1">
          <UserPlus size="1.2em" />
          <span>Add User</span>
        </Link>
      </Button>

      {error && (
        <Alert className="mt-4" variant="default">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <DataTable columns={columns} data={filteredUsers} />

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="default" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRemoveUser}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;

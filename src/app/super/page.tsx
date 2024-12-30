"use client";

import React, { useEffect, useState } from "react";
import { getAdmins, deleteAdmin } from "@/components/api/adminsPack"; // Import API functions
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import StoreAdmin from "./admins/store";

type Props = {};
type Admin = {
  _id: string;
  name: string;
  city: string; 
  email: string; 
};

const Admins: React.FC<Props> = () => {
  const [data, setData] = useState<Admin[]>([]);
  const [filteredData, setFilteredData] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("No token found");
        return;
      }
      try {
        const admins = await getAdmins(token); // Fetch admins instead of products
        setData(admins);
        setFilteredData(admins);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError( "Failed to fetch admins");
      }
    };

    fetchData();
  }, [token]);

  const handleRemoveAdmin = async () => {
    if (!token || !selectedAdminId) {
      setError("No token or admin ID found");
      return;
    }
    try {
      await deleteAdmin(token, selectedAdminId); 
      setData(data.filter(admin => admin._id !== selectedAdminId));
      setFilteredData(filteredData.filter(admin => admin._id !== selectedAdminId));
    } catch (error) {
      setError("Failed to remove admin");
    }
    setDialogOpen(false);
  };

  const confirmRemoveAdmin = (adminId: string) => {
    setSelectedAdminId(adminId);
    setDialogOpen(true);
  };

  const columns: ColumnDef<Admin>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "email",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-4">
          <Button
            variant="destructive"
            onClick={() => confirmRemoveAdmin(row.original._id)}
          >
            <Trash size="1.2em" />
            
          </Button>
        </div>
      )
    }
  ];

  if (loading) return (
    <div>
      <Alert className="mt-4" variant="default">
        <AlertTitle>Loading...</AlertTitle>
        <AlertDescription>Loading admins...</AlertDescription>
      </Alert>
    </div>
  );

  if (error) return (
    <div>
      <Alert variant="destructive" className="mt-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    </div>
  );

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Admins" />
      <StoreAdmin />
      <DataTable columns={columns} data={filteredData} />

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this admin? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="default" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRemoveAdmin}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admins;

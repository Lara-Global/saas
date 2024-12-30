"use client";

import React, { useEffect, useState } from "react";
import { getcategory, deleteProduct } from "@/components/api/categoryApi"; // Import API functions
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { Trash, PenLine } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import StoreCategory from "./category/StoreCategory";
import UpdateCategory from "./category/SetCategory";

type Props = {};
type Payment = {
  _id: string;
  nom: string;
  description: string;
  status: string;
};

const Products: React.FC<Props> = () => {
  const [data, setData] = useState<Payment[]>([]);
  const [filteredData, setFilteredData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("No token found");
        return;
      }
      try {
        const products = await getcategory(token); 
        setData(products);
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

    }
    setDialogOpen(false);
  };


  const confirmRemoveProduct = (productId: string) => {
    setSelectedProductId(productId);
    setDialogOpen(true);
  };

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "name",
      header: "Type",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (row.original.status === "To_buy" ? "Ready to Sell" : row.original.status),
    }
,
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-4">
          
          <UpdateCategory categoryId={row.original._id} />

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
      <PageTitle title="Category" />



      
      <StoreCategory/>
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

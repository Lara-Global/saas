"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import { Trash, FolderOpenDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import FilterInvoice from "@/components/FilterInvoice";
import InvoiceSummary from "@/components/InvoiceSummary";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import ExportToExcel from "@/components/ExportToExcel";
import ExportToPDF from "@/components/ExportToPDF";

import getCompanyCurrencyFromLocalStorage from "@/components/tokens/company";

type User = {
  _id: string;
  name: string;
  email: string;
};

type Invoice = {
  _id: string;
  userId: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User | null;
};

const Invoices = () => {

  const [currency, setCurrency] = useState<string>('DH');
  const [data, setData] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<Invoice[]>([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null); // Track the selected invoice
  const [dialogOpen, setDialogOpen] = useState(false); // Control dialog visibility

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const storedCurrency = getCompanyCurrencyFromLocalStorage();
    if (storedCurrency) {
      setCurrency(storedCurrency);
    };
  }, []);

  const handleRemoveOrder = async () => {
    if (!selectedInvoiceId) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoices/${selectedInvoiceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setData(data.filter(order => order._id !== selectedInvoiceId));
      setFilteredData(filteredData.filter(order => order._id !== selectedInvoiceId));
      setDialogOpen(false); // Close the dialog after deletion
    } catch (error) {
      console.error("Error removing order:", error);
    }
  };

  const confirmRemoveOrder = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId); // Store the selected invoice ID
    setDialogOpen(true); // Open the confirmation dialog
  };

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: "user",
      header: "User",
      cell: ({ row }) => {
        const user = row.getValue("user") as User | null;
        return user ? `${user.name} (${user.email})` : "Unknown User";
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div
            className={cn(
              "font-medium w-fit px-4 py-2 rounded-lg transition-colors duration-200",
              {
                // Canceled status
                "bg-red-200 text-red-800 dark:bg-red-600 dark:text-red-200":
                  status === "canceled",
              
                "bg-orange-200 text-orange-800 dark:bg-orange-500 dark:text-orange-100":
                  status === "expiry",
                "bg-blue-400  text-blue-800 dark:bg-orange-500 dark:text-white":
                  status === "consomated",
                
                "bg-green-200 text-green-800 dark:bg-green-500 dark:text-green-100":
                  status === "validated",
              }
            )}
          >
            {status}
          </div>

        );
      }
    },
    {
      accessorKey: "createdAt",
      header: "Date Created",
      cell: ({ row }) => new Date(row.getValue("createdAt") as string).toLocaleDateString()
    },
    {
      accessorKey: "totalPrice", 
      header: `Total Price (${currency})`, 
      cell: ({ row }) => `${row.original.totalPrice} ${currency}`, 
    }
,
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="default" className="mr-2 flex items-center gap-1">
            <Link href={`/admin/invoice/details?id=${row.original._id}`} className="flex items-center gap-1">
              <FolderOpenDot size="1.2em" />
              <span>Open</span>
            </Link>
          </Button>

          <button
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-400 text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            onClick={() => confirmRemoveOrder(row.original._id)}
          >
            <Trash size="1.2em" />
            <span>Remove</span>
          </button>
        </div>
      )
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }
      const company = localStorage.getItem('company');

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoices/company/${company}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const mappedData = response.data.invoices.map((invoice: any) => ({
          _id: invoice._id,
          userId: invoice.userId,
          totalPrice: invoice.totalPrice,
          status: invoice.status,
          createdAt: invoice.createdAt,
          updatedAt: invoice.updatedAt,
          user: invoice.user
        }));
        setData(mappedData);
        setFilteredData(mappedData);
      } catch (error) {
        setError("Failed to fetch invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleFilter = (status: string, startDate: string, endDate: string) => {
    let filtered = data;

    if (status) {
      filtered = filtered.filter((invoice) => invoice.status === status);
    }

    if (startDate) {
      filtered = filtered.filter((invoice) => new Date(invoice.createdAt) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter((invoice) => new Date(invoice.createdAt) <= new Date(endDate));
    }

    setFilteredData(filtered);
  };

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
      <PageTitle title="Invoices" />

      <div className="flex justify-between items-center w-full">
        {/* Filter on the left */}
        <div>
          <FilterInvoice onFilter={handleFilter} />
        </div>

        {/* Export buttons on the right */}
        <div className="flex gap-4">
          <ExportToExcel data={filteredData} />
          <ExportToPDF data={filteredData} />
        </div>
      </div>
      <DataTable columns={columns} data={filteredData} />
      <InvoiceSummary invoices={filteredData} />

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this invoice? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="default" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRemoveOrder}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Invoices;

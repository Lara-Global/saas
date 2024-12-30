/** @format */
"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import { Lock } from "lucide-react";

interface Setting {
  category: string;
  value: string | number | boolean | JSX.Element;
}

const columns: ColumnDef<Setting>[] = [
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => {
      const { category } = row.original;
      if (category === "Password") {
        return (
          <Button variant="default" className="mr-2 flex items-center gap-1">
            <Link href="/admin/settings/password" className="flex items-center gap-1">
              
              <span>Update Password</span>
            </Link>
          </Button>
        );
      } else if (category === "Company") {
        return (
          <Button variant="default" className="mr-2 flex items-center gap-1">
            <Link href="/admin/settings/company" className="flex items-center gap-1">
              <span>Update Company</span>
            </Link>
          </Button>
        );
      } else {
        return row.original.value;
      }
    },
  },
];

// Function to handle file input
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function SettingsPage() {
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);

  useEffect(() => {
    // Load the stored logo only on the client side
    if (typeof window !== "undefined") {
      const storedLogo = localStorage.getItem("companyLogo");
      if (storedLogo) {
        setCompanyLogo(storedLogo);
      }
    }
  }, []);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      try {
        const base64Logo = await toBase64(file);
        setCompanyLogo(base64Logo);
        localStorage.setItem("companyLogo", base64Logo);
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    } else {
      alert("Please select a valid image file.");
    }
  };

  const data: Setting[] = [
    {
      category: "Password",
      value: "", // This value will be overridden by the cell rendering logic
    },
    {
      category: "Company",
      value: "", // This value will be overridden by the cell rendering logic
    },
    {
      category: "Logo",
      value: (
        <div>
          
          {companyLogo && (
            <img
              src={companyLogo}
              alt="Logo Preview"
              className="mt-2 h-24 w-auto"
            />
          )}
          <input
            id="logo"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleLogoChange}
            className="mt-1 w-full text-sm py-2 px-3 border border-gray-300 rounded-md"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Settings" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}

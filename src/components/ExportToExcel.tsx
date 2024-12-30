"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Loader from "@/components/ui/Loader";
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
type Item = {
    name: string;
    quantity: number;
    price: number;
};

type Invoice = {
    _id: string;
    userId: string;
    totalPrice: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    user: {
        name: string;
        email: string;
    } | null;
 
};

type ExportToExcelProps = {
    data: Invoice[]; // Expecting an array of invoices
};

const ExportToExcel: React.FC<ExportToExcelProps> = ({ data }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleExport = () => {
        setLoading(true);

        try {
            // Prepare data for export
            const exportData = data.flatMap(invoice => [
                {
                    Invoice_ID: invoice._id,
                    User_Name: invoice.user?.name || 'Unknown User',
                    User_Email: invoice.user?.email || 'N/A',
                    Status: invoice.status,
                    'Date Created': new Date(invoice.createdAt).toLocaleDateString(),
                    'Total Price (DH)': invoice.totalPrice,
                },
             
                
                {}, // Another empty row for separation
            ]);

            const worksheet = XLSX.utils.json_to_sheet(exportData, { skipHeader: true });
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoice Details');

            XLSX.writeFile(workbook, `invoices_export.xlsx`);
        } catch (exportError) {
            setError('Failed to export data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-4">
                <Loader />
                <span className="ml-2">Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    return (
        <Button onClick={handleExport} variant="default">
            <FaFileExcel style={{ marginRight: '8px' }} /> 
        </Button>
    );
};

export default ExportToExcel;

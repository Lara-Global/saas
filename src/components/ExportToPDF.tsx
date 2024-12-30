"use client";

import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; 
import { Button } from "@/components/ui/button"; 
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';

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
type ExportToPDFProps = {
    data: Invoice[];
};

const ExportToPDF: React.FC<ExportToPDFProps> = ({ data }) => {
    const handleExport = () => {
        const pdf = new jsPDF();

        const tableColumn = ["User", "Status", "Date Created", "Total Price (DH)"];
        const tableRows = data.map(invoice => [
            `${invoice.user?.name} (${invoice.user?.email})`,
            invoice.status,
            new Date(invoice.createdAt).toLocaleDateString(),
            invoice.totalPrice
        ]);

        pdf.autoTable(tableColumn, tableRows, { startY: 20 });
        pdf.text("Invoices", 14, 15);
        pdf.save('invoices.pdf');
    };

    return (
        <Button onClick={handleExport} variant="default">
            <FaFilePdf style={{ marginRight: '8px' }} /> 
        </Button>
    );
};

export default ExportToPDF;

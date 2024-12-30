"use client";

import React, { useState } from "react";
import PageTitle from "@/components/PageTitle";
import QRCodeScanner from "@/components/QRCodeScanner";
import { scanInvoice } from "@/components/api/scanInvoice";
import InvoiceDetails from "@/components/scanInvoiceDetaile";
import axios from "axios";

type Props = {};

const ScanPage = ({ }: Props) => {
    const [scanId, setScanId] = useState<string>(""); 
    const [statusInvoice, setStatusInvoice] = useState<any>(null); 
    const [invoiceDetails, setInvoiceDetails] = useState<any>(null); 
    const [error, setError] = useState<string | null>(null); 
    const [loading, setLoading] = useState<boolean>(false); 

    // Function to handle the scan result
    const handleScan = async (result: string) => {
        setScanId(result);
        await handleScanInvoice(result);
        await fetchInvoiceDetails(result);
    };

    // Function to scan the invoice
    const handleScanInvoice = async (invoiceId: string) => {
        try {
            const response = await scanInvoice(invoiceId);
            console.log("Scan Result:", response);
            setStatusInvoice(response.status); 
        } catch (error) {
            console.error("Failed to scan invoice:", error);
        }
    };

    // Function to fetch invoice details
    const fetchInvoiceDetails = async (invoiceId: string) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (!token) {
            setError('No token found');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoices/${invoiceId}/details`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            const invoiceData = response.data;
            setInvoiceDetails({
                items: invoiceData.items,
                totalPrice: invoiceData.totalPrice,
                createdAt: invoiceData.createdAt,
            });
        } catch (error) {
            console.error('Failed to fetch invoice details:', error);
            setError('Failed to fetch invoice details');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-5 w-full">
            <PageTitle title="Scan QR Code" />

            {/* QR Scanner */}
            <div className="flex items-center justify-center">
                <QRCodeScanner onScan={handleScan} disabled={!!scanId} resultStatus={statusInvoice} />
            </div>
            {/* Display Invoice Details only when status is validated */}
            {statusInvoice === "consomated" && invoiceDetails && (
                <InvoiceDetails
                    items={invoiceDetails.items}
                    totalPrice={invoiceDetails.totalPrice}
                    createdAt={invoiceDetails.createdAt}
                />
            )}
            
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default ScanPage;

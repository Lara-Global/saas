"use client"; // Keep this at the top

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InvoiceDetail, { InvoiceDetailItem } from '@/components/InvoiceDetail';
import { useSearchParams } from 'next/navigation';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';


import getCompanyCurrencyFromLocalStorage from "@/components/tokens/company";

const InvoiceDetailPage: React.FC = () => {
    const [items, setItems] = useState<InvoiceDetailItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [invoiceId, setInvoiceId] = useState<string>('');
    const [creationDate, setCreationDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currency, setCurrency] = useState<string>('DH');
    const searchParams = useSearchParams();

    useEffect(() => {
        const storedCurrency = getCompanyCurrencyFromLocalStorage();
        if (storedCurrency) {
            setCurrency(storedCurrency);
        };
        const fetchInvoiceDetails = async () => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const id = searchParams.get('id');
                if (!id) {
                    setError('No invoice ID found in URL');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoices/${id}/details`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                const invoiceData = response.data;

                setItems(invoiceData.items);
                setTotalAmount(invoiceData.totalPrice);
                setInvoiceId(id);
                setCreationDate(invoiceData.createdAt);
            } catch (error) {
                setError('Failed to fetch invoice details');
            } finally {
                setLoading(false);
            }
        };

        fetchInvoiceDetails();
    }, [searchParams]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div>
                <Alert className="mt-4" variant="default">
                    <AlertTitle>Loading...</AlertTitle>
                    <AlertDescription>Loading invoice details, please wait...</AlertDescription>
                </Alert>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Alert variant="destructive" className="mt-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (

        <div className="p-6">
            <InvoiceDetail
                invoiceId={invoiceId}
                creationDate={creationDate}
                items={items}
                currency={currency}
                totalAmount={totalAmount}
                onPrint={handlePrint}
            />

        </div>
    );
};

export default InvoiceDetailPage;

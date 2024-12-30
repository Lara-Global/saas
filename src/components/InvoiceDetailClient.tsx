import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getcompany } from "@/components/api/companyApi"; // Ensure import path is correct
import getCompanyCurrencyFromLocalStorage from "@/components/tokens/company";
import { QRCodeSVG } from "qrcode.react"; 


export type Company = {
    name: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    logo: string;
};

export type InvoiceDetailItem = {
    id: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
};

export type InvoiceDetailProps = {

    invoiceId: string | null; // Allow invoiceId to be null
    creationDate: string;
    items: InvoiceDetailItem[];
    totalAmount: number;
    onAfterPrint: () => void;
};


const InvoiceDetail = ({ invoiceId, creationDate, items, totalAmount, onAfterPrint }: InvoiceDetailProps) => {
    const [currency, setCurrency] = useState<string>(""); // To store the currency
    const [company, setCompany] = useState<Company | null>(null); // Company data state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompany = async () => {
            setCurrency(getCompanyCurrencyFromLocalStorage() || "DH"); // Default to "DH" if no currency is found
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No token found");
                }

                const companyData = await getcompany(token); // Fetch company data
                setCompany(companyData); // Set company data
            } catch (error) {
                console.error("Error fetching company:", error);
                setError("Failed to load company data");
            } finally {
                setLoading(false);
            }
        };

        fetchCompany(); // Call fetch function on component mount
    }, []);

    // Effect to handle document title and printing
    useEffect(() => {
        const originalTitle = document.title;
        const currentDate = new Date().toLocaleDateString();

        if (company) {
            document.title = `${company.name} - Invoice (${currentDate})`;
        }

        const printAndCleanUp = () => {
            window.print();
            onAfterPrint();
            document.title = originalTitle; // Reset the document title
        };

        if (!loading && !error) {
            printAndCleanUp(); // Print when data is ready
        }
    }, [company, onAfterPrint, loading, error]);

    // Loading and error states
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    // Ensure company is not null before rendering
    if (!company) {
        return <p>No company information available.</p>;
    }

    return (
        <div className={cn("print-area max-w-xs mx-auto p-4 bg-white shadow-md rounded-lg font-mono")}>
            {/* Header Section */}
            <div className="flex justify-between mb-4">
                <div className="text-left">
                    <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
                    <p className="text-sm text-gray-500">Date: {new Date(creationDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                    <p className="font-bold">{company.name}</p>
                    <p>{company.address}</p>
                    <p>{company.phone}</p>
                    <p>{company.email}</p>
                </div>
            </div>

           

            {/* Items Section */}
            <table className="w-full text-left text-sm">
                <thead>
                    <tr>
                        <th className="py-1">Item</th>
                        <th className="py-1 text-right">Qty</th>
                        <th className="py-1 text-right">Price</th>
                        <th className="py-1 text-right">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td className="py-1">{item.productName}</td>
                            <td className="py-1 text-right">{item.quantity}</td>
                            <td className="py-1 text-right">{item.price.toFixed(2)} {currency}</td>
                            <td className="py-1 text-right">{(item.quantity * item.price).toFixed(2)} {currency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Total Section */}
            <div className="flex justify-between text-lg font-bold mt-4">
                <span>TOTAL</span>
                <span>{totalAmount.toFixed(2)} {currency}</span>
            </div>
            <br />
            {/* QR Code and Footer Section */}
            <div className="flex justify-between items-center my-4">
               
                {/* Footer Section */}
                <div className="text-center ml-4">
                    <div className="border-t border-dashed border-gray-300 my-4"></div>
                    <p>***THANK YOU***</p>
                    <div className="text-xs text-gray-500 mt-2">
                        <p>Thank you for supporting local business!</p>
                        <p>{company.name} | Ph: {company.phone} | Email: {company.email}</p>
                    </div>
                </div>
                <hr />
                {/* QR Code Section */}
                <div className="flex-shrink-0">
                    {invoiceId ? (
                        <QRCodeSVG value={invoiceId} size={128} /> // Generate QR code based on the invoice ID
                    ) : (
                        <p>No Invoice ID available</p> // Optional message if invoiceId is null
                    )} {/* Generate QR code based on the invoice ID */}
                </div>

            </div>

        </div>
    );
};

export default InvoiceDetail;

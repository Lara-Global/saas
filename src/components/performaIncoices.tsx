import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

export type Company = {
    name: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    logo?: string; // Add logo field to the company type
    signature?: string; // Add signature field to the company type
};

export type ProformaInvoiceItem = {
    id: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
};

export type ProformaInvoiceProps = {
    invoiceId: string;
    currency: string;
    creationDate: string;
    items: ProformaInvoiceItem[];
    totalAmount: number;
    onPrint: () => void;
    translations: {
        invoiceTitle: string;
        invoiceNumber: string;
        invoiceDate: string;
        qty: string;
        description: string;
        price: string;
        total: string;
        totalAmount: string;
        printInvoice: string;
        footerMessage: string;
        thankYouMessage: string;
    };
};

export default function ProformaInvoice({
    invoiceId,
    creationDate,
    items,
    currency,
    totalAmount,
    onPrint,
    translations,
}: ProformaInvoiceProps) {
    const [company, setCompany] = useState<Company>({
        name: "",
        address: "",
        email: "",
        phone: "",
        website: "",
        logo: "",
        signature: "",
    });

    const [message, setMessage] = useState<string | null>(null);

    const fetchCompanyDetails = async () => {
        try {
            const adminId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");

            if (!adminId || !token) {
                setMessage("Admin ID or token is missing.");
                return;
            }

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies/by-admin/${adminId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const logo = localStorage.getItem("companyLogo");
            const signature = localStorage.getItem("companySignature");

            setCompany({
                ...response.data,
                logo: logo || "", // Retrieve logo from local storage
                signature: signature || "", // Retrieve signature from local storage
            });
        } catch (error) {
            console.error("Error fetching company details:", error);
            setMessage("Failed to load company details.");
        }
    };

    useEffect(() => {
        fetchCompanyDetails();
    }, []);

    return (
        <div className="print-area2 max-w-4xl mx-auto p-8 rounded-lg shadow-sm border border-purple-600 relative ">
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex justify-between items-start">
                    {/* Company Details */}
                    <div>

                        <h2 className="text-2xl font-bold text-gray-800">{translations.invoiceTitle}</h2>
                        <p className="text-sm text-gray-600">
                            {translations.invoiceNumber}:{" "}
                            <span className="font-medium text-gray-800">{invoiceId}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                            {translations.invoiceDate}:{" "}
                            <span className="font-medium text-gray-800">
                                {new Date(creationDate).toLocaleDateString()}
                            </span>
                        </p>
                     
                    </div>

                    {/* Invoice Details */}
                    <div className="text-right">

                        {company.logo && (
                            <div className="mb-4">
                                <img
                                    src={company.logo}
                                    alt="Company Logo"
                                    className="w-32 h-32 object-contain rounded-lg"
                                />
                            </div>
                        )}
                        
                        
                    </div>
                </div>
                

            </div>

            {/* Items Table */}
            <div className="mb-8">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 border border-gray-200">
                                {translations.qty}
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 border border-gray-200">
                                {translations.description}
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 border border-gray-200">
                                {translations.price} 
                            </th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 border border-gray-200">
                                {translations.total} 
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700 border border-gray-200">
                                    {item.quantity}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-700 border border-gray-200">
                                    {item.productName}
                                </td>
                                <td className="py-3 px-4 text-sm text-right text-gray-700 border border-gray-200">
                                    {item.price.toFixed(2)} {currency}
                                </td>
                                <td className="py-3 px-4 text-sm text-right text-gray-700 border border-gray-200">
                                    {item.total.toFixed(2)} {currency}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Total Amount Section */}
            <div className="flex justify-end mb-8">
                <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">
                        {translations.totalAmount}: {totalAmount.toFixed(2)} {currency}
                    </p>
                </div>
            </div>

            {/* Print Button */}
            <div className="text-center print-hide mb-8">
                <Button
                    variant="outline"
                    onClick={onPrint}
                    className="px-6 py-3 font-semibold rounded-lg print-hide "
                >
                    {translations.printInvoice}
                </Button>
            </div>

            {/* Footer Section */}
          

           

            {/* Signature at the bottom right */}
            {company.signature && (
                <div className="absolute bottom-0 right-0 mb-4 mr-4">
                    <img
                        src={company.signature}
                        alt="Signature"
                        className="w-32 h-16 object-contain"
                    />
                </div>
            )}
        </div>
    );
}

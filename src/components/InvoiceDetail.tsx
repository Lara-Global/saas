import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";

export type InvoiceDetailItem = {
    id: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
};

export type InvoiceDetailProps = {
    invoiceId: string;
    currency:string;
    creationDate: string;
    items: InvoiceDetailItem[];
    totalAmount: number;
    onPrint: () => void;
};

export type Company = {
    name: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    logo: string;
};

export default function InvoiceDetail({ invoiceId, creationDate, items, currency, totalAmount, onPrint }: InvoiceDetailProps) {
    const [company, setCompany] = useState<Company>({
        name: "",
        address: "",
        email: "",
        phone: "",
        website: "",
        logo: "",
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

            setCompany(response.data);
        } catch (error) {
            console.error("Error fetching company details:", error);
            setMessage("Failed to load company details.");
        }
    };

    useEffect(() => {
        fetchCompanyDetails();
    }, []);
    const companyLogo = localStorage.getItem("companyLogo") || company.logo;

    return (
        <div className={cn("print-area max-w-4xl mx-auto p-10   border border-purple-600 rounded-lg shadow-lg")}>
            <div className="flex justify-between items-center mb-10">
                
                <div>
                    <h1 className="text-5xl font-extrabold tracking-wider ">INVOICE</h1>
                    <p className="text-base text-gray-500 dark:text-gray-600 mt-2">Number : {invoiceId}</p>
                    <p className="text-base text-gray-500 dark:text-gray-600">Date: {new Date(creationDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                    {companyLogo && (
                        <img
                            src={companyLogo}
                            alt={`${company.name} logo`}
                            className="w-24 h-24 object-contain mb-4 mx-auto"
                        />
                    )}


                    <p className="text-lg font-semibold text-purple-700 ">{company.name}</p>
                    <p className="text-base text-gray-500 dark:text-gray-600">{company.address}</p>
                    <p className="text-base text-gray-500 dark:text-gray-600">{company.email}</p>
                    <p className="text-base text-gray-500 dark:text-gray-600">{company.phone}</p>
                    <p className="text-base text-gray-500 dark:text-gray-600">{company.website}</p>
                </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-10 border-collapse">
                <thead>
                    <tr className="bg-gray-50 dark:bg-gray-200 border-b border-purple-600">
                        <th className="py-3 px-4 text-left text-gray-600 dark:text-gray-200 font-medium">Qty</th>
                        <th className="py-3 px-4 text-left text-gray-600 dark:text-gray-200 font-medium">Description</th>
                        <th className="py-3 px-4 text-right text-gray-600 dark:text-gray-200 font-medium">Price</th>
                        <th className="py-3 px-4 text-right text-gray-600 dark:text-gray-200 font-medium">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="border-b dark:border-gray-600  font-semibold text-gray-600  last:border-none">
                            <td className="py-3 px-4">{item.quantity}</td>
                            <td className="py-3 px-4">{item.productName}</td>
                            <td className="py-3 px-4 text-right">{item.price.toFixed(2)} {currency}</td>
                            <td className="py-3 px-4 text-right">{item.total.toFixed(2)} {currency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals Section */}
            <div className="text-right mb-10">
                <p className="text-2xl font-semibold ">
                    <span>Total:</span> <span>{totalAmount.toFixed(2)} {currency}</span>
                </p>
            </div>

            {/* Buttons Section */}
            <div className="flex justify-center print-hide">
                <Button onClick={onPrint} variant="default" className="px-4 py-2">
                    Print Invoice
                </Button>
            </div>


            {/* Footer Section */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-10">
                Thank you for your business!<br />
                {company.name} | Ph: {company.phone} | Website: {company.website}
            </p>
        </div>

    );
}

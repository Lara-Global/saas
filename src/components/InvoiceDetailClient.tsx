import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getcompany } from "@/components/api/companyApi";
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
    invoiceId: string | null;
    creationDate: string;
    items: InvoiceDetailItem[];
    totalAmount: number;
    onAfterPrint: () => void;
};

const InvoiceDetail = ({ invoiceId, creationDate, items, totalAmount, onAfterPrint }: InvoiceDetailProps) => {
    const [currency, setCurrency] = useState<string>("");
    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompany = async () => {
            setCurrency(getCompanyCurrencyFromLocalStorage() || "DH");
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("No token found");
                }

                const companyData = await getcompany(token);
                setCompany(companyData);
            } catch (error) {
                console.error("Error fetching company:", error);
                setError("Failed to load company data");
            } finally {
                setLoading(false);
            }
        };

        fetchCompany();
    }, []);

    useEffect(() => {
        const originalTitle = document.title;
        const currentDate = new Date().toLocaleDateString();

        if (company) {
            document.title = `${company.name} - Invoice (${currentDate})`;
        }

        const printAndCleanUp = () => {
            window.print();
            onAfterPrint();
            document.title = originalTitle;
        };

        if (!loading && !error) {
            printAndCleanUp();
        }
    }, [company, onAfterPrint, loading, error]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    <p className="font-medium">Error: {error}</p>
                </div>
            </div>
        );
    }

    if (!company) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">No company information available.</p>
            </div>
        );
    }

    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    return (
        <div className={cn("print-area max-w-2xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden")}>
            {/* Header with Gradient Background */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">INVOICE</h1>
                        <div className="mt-2 space-y-1">
                            <p className="text-blue-100">Invoice ID: #{invoiceId || 'N/A'}</p>
                            <p className="text-blue-100">Date: {new Date(creationDate).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                            <h2 className="text-xl font-bold mb-2">{company.name}</h2>
                            <div className="text-sm space-y-1 text-blue-100">
                                <p>{company.address}</p>
                                <p>📞 {company.phone}</p>
                                <p>✉️ {company.email}</p>
                                {company.website && <p>🌐 {company.website}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoice Content */}
            <div className="p-8">
                {/* Items Table with Modern Design */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                        Invoice Details
                    </h3>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Item</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Qty</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Unit Price</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {items.map((item, index) => (
                                    <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {item.productName}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 text-center">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {item.quantity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 text-right font-mono">
                                            {item.price.toFixed(2)} {currency}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right font-mono">
                                            {(item.quantity * item.price).toFixed(2)} {currency}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Payment Summary */}
                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="font-semibold text-gray-800 mb-4">Payment Summary</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="font-mono">{subtotal.toFixed(2)} {currency}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Tax:</span>
                                    <span className="font-mono">0.00 {currency}</span>
                                </div>
                                <div className="border-t border-gray-300 pt-3">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span className="text-gray-900">TOTAL:</span>
                                        <span className="text-blue-600 font-mono">{totalAmount.toFixed(2)} {currency}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="flex justify-center">
                        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center shadow-sm">
                            <h4 className="font-semibold text-gray-800 mb-4">Quick Access</h4>
                            {invoiceId ? (
                                <div className="space-y-2">
                                    <QRCodeSVG 
                                        value={invoiceId} 
                                        size={120}
                                        bgColor="#ffffff"
                                        fgColor="#1f2937"
                                        level="M"
                                        includeMargin={true}
                                    />
                                    <p className="text-xs text-gray-500">Scan for invoice details</p>
                                </div>
                            ) : (
                                <div className="text-gray-400 py-8">
                                    <p>No Invoice ID available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="border-t-2 border-dashed border-gray-300 pt-6">
                    <div className="text-center space-y-4">
                        <div className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                            <h3 className="text-2xl font-bold">THANK YOU!</h3>
                        </div>
                        <p className="text-gray-600 text-sm">
                            We appreciate your business and look forward to serving you again.
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                            <p className="font-medium mb-2">Contact Information</p>
                            <div className="flex flex-wrap justify-center gap-4 text-xs">
                                <span>📍 {company.address}</span>
                                <span>📞 {company.phone}</span>
                                <span>✉️ {company.email}</span>
                            </div>
                            {company.website && (
                                <p className="mt-2 text-blue-600">🌐 {company.website}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetail;

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";

export type ReceiptItem = {
    id: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
};

export type ReceiptProps = {
    receiptId: string;
    creationDate: string;
    items: ReceiptItem[];
    totalAmount: number;
    company: {
        name: string;
        address: string;
        email: string;
        phone: string;
        website: string;
        logo: string;
    };
};

const Receipt: React.FC<ReceiptProps> = ({ receiptId, creationDate, items, totalAmount, company }) => {
    return (
        <div className={cn("print-area max-w-xs mx-auto p-4 bg-white shadow-md rounded-lg font-mono")}>
            {/* Header Section */}
            <div className="flex justify-between mb-4">
                <div className="text-left">
                    <h1 className="text-3xl font-bold text-gray-800">RECEIPT</h1>
                    <p className="text-sm text-gray-500">Date: {new Date(creationDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                    {company.logo && (
                        <img
                            src={company.logo}
                            alt={`${company.name} logo`}
                            className="w-16 h-16 object-contain mb-2 mx-auto"
                        />
                    )}
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
                            <td className="py-1 text-right">{item.price.toFixed(2)}</td>
                            <td className="py-1 text-right">{(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Total Section */}
            <div className="flex justify-between text-lg font-bold mt-4">
                <span>TOTAL</span>
                <span>{totalAmount.toFixed(2)}</span>
            </div>

            {/* QR Code and Footer Section */}
            <div className="flex justify-between items-center my-4">
                <div className="text-center ml-4">
                    <div className="border-t border-dashed border-gray-300 my-4"></div>
                    <p>***THANK YOU***</p>
                    <div className="text-xs text-gray-500 mt-2">
                        <p>Thank you for supporting local business!</p>
                        <p>{company.name} | Ph: {company.phone} | Email: {company.email}</p>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <QRCodeSVG value={receiptId} size={128} />
                </div>
            </div>
        </div>
    );
};

export default Receipt;

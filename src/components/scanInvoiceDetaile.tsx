import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/formatCurrency"; 
import { getCurrencyFromLocalStorage } from "@/utils/currency"; 

type InvoiceDetailsProps = {
    items: { productName: string; quantity: number; price: number }[];
    totalPrice: number;
    createdAt: string;
};

const InvoiceDetails = ({ items, totalPrice, createdAt }: InvoiceDetailsProps) => {
    const [currency, setCurrency] = useState<string>("USD");

    useEffect(() => {
        const storedCurrency = getCurrencyFromLocalStorage();
        setCurrency(storedCurrency);
    }, []);

    return (
        <Card className="p-6 shadow-md w-full max-w-xl mx-auto  rounded-lg">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Invoice Details</CardTitle>
                <p className="text-sm text-gray-500">Created on: {new Date(createdAt).toLocaleString()}</p>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium">Items</h4>
                    <Badge className="text-sm">Total Items: {items.length}</Badge>
                </div>

                <ul className="space-y-2">
                    {items.map((item, index) => (
                        <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
                            <span className="font-medium">{item.productName}</span>
                            <span className="text-gray-600">
                                {item.quantity} x {formatCurrency(item.price, currency)}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Price:</span>
                    <span className="text-lg font-bold text-green-600">{formatCurrency(totalPrice, currency)}</span>
                </div>
            </CardContent>

           
        </Card>
    );
};

export default InvoiceDetails;

import React,{useState,useEffect} from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component from shadcn
import { cn } from "@/lib/utils";

import getCompanyCurrencyFromLocalStorage from "@/components/tokens/company";

export type ReceiptItem = {
    id: string;
    quantity: number;
    price: number;
    total: number;
    productName: string;
};

export type ReceiptProps = {
    items: ReceiptItem[];
    totalAmount: number;
    onPrint: () => void;
    onCancel: () => void;
};

export default function Receipt({ items, totalAmount, onPrint, onCancel }: ReceiptProps) {

    const [currency, setCurrency] = useState<string>(""); // To store the currency
    useEffect(() => {
        const fetchedCurrency = getCompanyCurrencyFromLocalStorage();
        setCurrency(fetchedCurrency || "DH"); // Default to "DH" if no currency is found
    }, []);

    return (
        <div className={cn("w-full caption-bottom text-sm border p-4 rounded-md shadow-lg")}>
            <h1 className="text-center text-lg font-bold mb-4">CASH RECEIPT</h1>
            <ul className="divide-y divide-gray-200 mb-4">
                {items.map((item) => (
                    <li key={item.id} className="flex justify-between py-2">
                        <div>
                            <p className="text-sm font-semibold">{item.productName}</p>
                            <p className="text-xs text-gray-500">
                                Qty: {item.quantity} x {item.price.toFixed(2)} {currency}
                            </p>
                        </div>
                        <p className="text-sm font-semibold">{item.total.toFixed(2)} {currency}</p>
                    </li>
                ))}
            </ul>
            <div className="border-t pt-2 mb-4">
                <p className="flex justify-between text-lg font-semibold">
                    Total: <span>{totalAmount.toFixed(2)} {currency}</span>
                </p>
            </div>
            <div className="flex justify-between">
                <Button onClick={onCancel} variant="destructive" className="mr-2">
                    Cancel Invoice
                </Button>
                <Button onClick={onPrint} variant="outline" className="mr-2">
                    Print Invoice
                </Button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">THANK YOU!!!</p>
        </div>
    );
}

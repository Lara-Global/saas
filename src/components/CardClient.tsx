/** @format */

import React, { useState,useEffect } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // Import the Button component

import getCompanyCurrencyFromLocalStorage from "@/components/tokens/company";
export type CardProps = {
  label: string;
  icon: LucideIcon;
  prix: string;
  description: string;
  onAddToCart?: () => void; // Optional prop for handling "Add to Cart" action
};

export default function Card({ label, icon: Icon, prix, description, onAddToCart }: CardProps) {

  const [currency, setCurrency] = useState<string>(""); // To store the currency
  useEffect(() => {
    const fetchedCurrency = getCompanyCurrencyFromLocalStorage();
    setCurrency(fetchedCurrency || "DH"); // Default to "DH" if no currency is found
  }, []);
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        {/* Label */}
        <p className="text-sm">{label}</p>
        {/* Icon */}
        <Icon className="h-4 w-4 text-gray-400" />
      </section>
      <section className="flex flex-col gap-1">
        {/* Price */}
        <h2 className="text-2xl font-semibold">{prix}  {currency}</h2>
        {/* description */}
        <p className="text-xs text-gray-500">{description}</p>
      </section>
      {/* Add to Cart Button */}
      <section className="flex justify-center mt-4">
        <Button variant="outline" size="default" className="w-full" onClick={onAddToCart}>
          Add to Cart
        </Button>
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
}

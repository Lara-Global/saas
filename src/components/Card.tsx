/** @format */

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CardProps = {
    label: string;
    icon: LucideIcon;
    amount: string;
    description: string;
};

export default function Card(props: CardProps) {
    return (
        <CardWrapper>
            <section className="flex justify-between gap-2">
                {/* Label */}
                <p className="text-sm text-muted-foreground">{props.label}</p>
                {/* Icon */}
                <props.icon className="h-4 w-4 text-gray-400 dark:text-gray-400" />
            </section>
            <section className="flex flex-col gap-1">
                <h2 className="text-2xl text-muted-foreground">{props.amount}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">{props.description}</p>
            </section>
        </CardWrapper>
    );
}

export function CardWrapper(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cn(
                "flex w-full flex-col gap-3 rounded-xl border p-5 rounded-lg border bg-card text-card-foreground shadow-sm", // Corrected dark mode styles
                props.className
            )}
        />
    );
}

import React from "react";
import { cn } from "@/lib/utils"; // Assuming you're using a utility function for conditional class names

export const Label = ({
    children,
    className,
    ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => {
    return (
        <label
            className={cn(
                "block font-medium text-sm",
               
                className // Allow for additional classes to be passed in
            )}
            {...props}
        >
            {children}
        </label>
    );
};

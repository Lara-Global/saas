import React from 'react';
import { cn } from '@/lib/utils'; // This utility merges class names

type TextProps = React.HTMLAttributes<HTMLSpanElement> & {
    variant?: 'default' | 'muted' | 'highlight' | 'error'; // You can define variants if needed
};

export const Text: React.FC<TextProps> = ({ children, variant = 'default', className, ...props }) => {
    const baseClasses = cn(
        'text-base', // You can set the base font size here
        variant === 'muted' && 'text-gray-500',
        variant === 'highlight' && 'text-blue-600 font-semibold',
        variant === 'error' && 'text-red-600',
        className // Allows overriding or extending styles
    );

    return (
        <span className={baseClasses} {...props}>
            {children}
        </span>
    );
};

// utils/currency.ts
export const getCurrencyFromLocalStorage = (): string => {
    if (typeof window !== "undefined") {
        const currency = localStorage.getItem('currency');
        return currency || 'USD'; // Default to USD if not found
    }
    return 'USD'; // Default for server-side rendering
};

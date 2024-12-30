import axios from "axios";

const gettokenFromLocalStorage = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem('token');
    }
    return null;
};

export const scanInvoice = async (invoiceId: string) => {
    const token = gettokenFromLocalStorage();

    if (!token) {
        throw new Error("No token found in local storage.");
    }

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/scan-invoice`,
            { id: invoiceId }, // Sending the invoice ID in the body
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', // Specify content type
                },
            }
        );
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error scanning invoice:", error);
        throw new Error("Failed to scan invoice");
    }
};

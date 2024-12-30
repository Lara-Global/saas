import axios from "axios";

export const getContacts = async (token: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contacts`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching contacts:", error);
        throw new Error("Failed to fetch contacts");
    }
};

export const deleteContact = async (token: string, id: string) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contacts/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error removing Contact:", error);
        throw new Error("Failed to remove Contact");
    }
};
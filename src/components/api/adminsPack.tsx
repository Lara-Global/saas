import axios from "axios";

export const getAdmins = async (token: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admins-super`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data.admins; // Return the data from the response
    } catch (error) {
        console.error("Error fetching admins:", error);
        throw new Error("Failed to fetch admins");
    }
};

export const deleteAdmin = async (token: string, adminID: string) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin-super/${adminID}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error removing Admin:", error);
        throw new Error("Failed to remove Admin");
    }
};
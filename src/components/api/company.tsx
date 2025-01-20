import axios from "axios";

const getCompanyFromLocalStorage = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem('company');
    }
    return null;
};

export const getcompany = async (token: string) => {
    const company = getCompanyFromLocalStorage();

    if (!company) {
        throw new Error("No company found in local storage.");
    }

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies/${company}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching company:", error); 
        throw new Error("Failed to fetch company");
    }
};

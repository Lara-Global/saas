import { useState } from "react";
import axios from "axios";
import { ReceiptItem } from "@/components/Receipt";

interface Product {
    _id: string;
    nom: string;
    prix: number;
    description: string;
}

interface CartManagerProps {
    onCartUpdate: (cart: ReceiptItem[]) => void;
}

const CartManager = ({ onCartUpdate }: CartManagerProps) => {
    const [cart, setCart] = useState<ReceiptItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddToCart = (product: Product) => {
        console.log("Product received in handleAddToCart:", product);

        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const existingItemIndex = updatedCart.findIndex(item => item.id === product._id);

            if (existingItemIndex !== -1) {
                updatedCart[existingItemIndex].quantity += 1;
                updatedCart[existingItemIndex].total = updatedCart[existingItemIndex].quantity * product.prix;
            } else {
                const newItem: ReceiptItem = {
                    id: product._id,
                    productName: product.nom,
                    quantity: 1,
                    price: product.prix,
                    total: product.prix,
                };

                if (!newItem.id) {
                    console.error("Product ID is missing:", product);
                }

                updatedCart.push(newItem);
            }

            onCartUpdate(updatedCart);
            return updatedCart;
        });
    };

    const handlePrint = async () => {
        setLoading(true);
        setError(null);

        try {
            const userId = localStorage.getItem('userId');

            const company = localStorage.getItem('company');
            const token = localStorage.getItem('token');

            if (!userId || !token) {
                throw new Error("User ID or token not found. Please log in.");
            }

            const items = cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
            }));

            const payload = {
                userId,
                company,
                items,
            };

            console.log("Sending data to API:", payload);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoices/validate`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            console.log("Invoice validated successfully.");
           
            return response;
        } catch (error) {
            console.error("Failed to validate invoice:", error);
            setError("Failed to validate the invoice. Please try again.");
            throw error; // Rethrow error to be handled by calling function
        } finally {
            setLoading(false);
        }
    };
    const clearCart = () => {
        onCartUpdate([]);
        setCart([]);
    };

    const handleCancel = async () => {
        setLoading(true);
        setError(null);

      
        try {
            const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            const company = localStorage.getItem('company');
            if (!userId || !token) {
                throw new Error("User ID or token not found. Please log in.");
            }

            const items = cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
            }));

            const payload = {
                userId,
                company,
                items,
            };

            console.log("Sending data to API:", payload);

            await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/invoices/cancel`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            console.log("Invoice canceled successfully.");
            setCart([]);
            onCartUpdate([]);
        } catch (error: any) {
            console.error("Failed to cancel invoice:", error);
            setError(error.response?.data?.message || "Failed to cancel the invoice. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        handleAddToCart,
        handlePrint,
        handleCancel,
        clearCart,
        loading,
        error,
    };
};

export default CartManager;

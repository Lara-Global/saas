/** @format */
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import PageTitle from "@/components/PageTitle";
import { Wallet2 } from "lucide-react";
import Card from "@/components/CardClient";
import Receipt, { ReceiptItem } from "@/components/Receipt";
import CartManager from "@/components/CartManager";
import InvoiceDetail from "@/components/InvoiceDetailClient";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { getcategory } from "@/components/api/categoryApi";

interface Product {
  _id: string;
  nom: string;
  prix: number;
  description: string;
  category: string; // Reference to the category ID
}

interface Category {
  _id: string;
  name: string;
  status: string; // Assuming categories have a status field
}

interface ProductResponse {
  category: Category;
  products: Product[]; // Define products as an array
}

const Home = ()=> {

  const [invoiceIdF, setInvoiceId] = useState(null); // State variable to store the invoice ID
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [cart, setCart] = useState<ReceiptItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [printTriggered, setPrintTriggered] = useState<boolean>(false);

  // Fetch categories and products from the API
  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch categories with status 'To_buy'
        const categoryResponse = await getcategory(token);
        const validCategories = categoryResponse.filter((cat: Category) => cat.status === "To_buy");
        setCategories(validCategories);

        // Fetch products associated with the selected category
        if (selectedCategory) {
          const productResponse = await axios.get<ProductResponse>(`/api/category/${selectedCategory}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          // Set the products from the response
          if (Array.isArray(productResponse.data.products)) {
            setProducts(productResponse.data.products);
          } else {
            setError("Unexpected response format for products.");
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesAndProducts();
  }, [selectedCategory]); // Dependency on selectedCategory

  // Use CartManager as a hook or component
  const { handleAddToCart, handlePrint, handleCancel, clearCart } = CartManager({
    onCartUpdate: (updatedCart: ReceiptItem[]) => {
      setCart(updatedCart);
    },
  });

  if (loading) return (
    <div>
      <Alert className="mt-4" variant="default">
        <AlertTitle>Loading...</AlertTitle>
        <AlertDescription>{loading}</AlertDescription>
      </Alert>
    </div>
  );
  if (error) return (
    <div>
      <Alert variant="destructive" className="mt-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    </div>
  );

  const triggerPrint = async () => {
    try {
      const responseData = await handlePrint();
      // Access the invoice ID from the response data
      const newInvoiceId = responseData.data.validatedInvoice._id;
      setInvoiceId(newInvoiceId);

      console.log("Stored Invoice ID:", invoiceIdF);
      setPrintTriggered(true);
    } catch (error) {
      console.error("Failed to handle print:", error);
    }
  };


  const handleAfterPrint = () => {
    clearCart();
    setPrintTriggered(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Our Shop" />

      {/* Category Selector */}
      <div className="w-full sm:w-1/2 md:w-1/3 mb-4">
        <Select onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category._id}> {/* Use category ID for the API call */}
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Product List */}
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <Card
            key={product._id}
            prix={`${product.prix}`}
            description={product.description}
            icon={Wallet2}
            label={product.nom}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </section>

      {/* Receipt */}
      {cart.length > 0 && (
        <Receipt
          items={cart}
          totalAmount={cart.reduce((sum, item) => sum + item.total, 0)}
          onPrint={triggerPrint}
          onCancel={handleCancel}
        />
      )}

      {/* Invoice Detail after print */}
      {printTriggered && (
        <InvoiceDetail
          invoiceId={invoiceIdF}
          creationDate={new Date().toISOString()}
          items={cart}
          totalAmount={cart.reduce((sum, item) => sum + item.total, 0)}
          onAfterPrint={handleAfterPrint}
        />
      )}
    </div>
  );
};

export default Home;

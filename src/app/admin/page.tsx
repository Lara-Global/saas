/** @format */
"use client";

import { useState, useEffect } from "react";
import { DollarSign, Users, CreditCard, CakeSlice } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import Card1, { CardWrapper, CardProps } from "@/components/Card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
;
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import LineChart from "@/components/LineChart";
import ChartB from "@/components/LineChartInteractive";
import getCompanyCurrencyFromLocalStorage from "@/components/tokens/company";
const Home = () => {
  const [totalRevenue, setTotalRevenue] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<number | null>(null);
  const [totalInvoices, setTotalInvoices] = useState<number | null>(null);
  const [canceledInvoices, setTCanceledInvoices] = useState<number | null>(null);
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [userSalesData, setUserSalesData] = useState<SalesProps[]>([]);
  const [barChartData, setBarChartData] = useState<{ name: string; total: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currency, setCurrency] = useState<string>('DH');
  useEffect(() => {
    const storedCurrency = getCompanyCurrencyFromLocalStorage();
    if (storedCurrency) {
      setCurrency(storedCurrency);
    }
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const company = localStorage.getItem("company");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard-stats/company/${company}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        // Update state with data from the API
        setTotalRevenue(data.totalRevenue);
        setSubscriptions(data.subscriptions);
        setTotalInvoices(data.totalInvoices);
        setTotalProducts(data.totalProducts);
        setUserSalesData(data.userSalesData);
        setBarChartData(data.barChartData);
        setTCanceledInvoices(data.canceledInvoices)
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cardData: CardProps[] = [
    {
      label: "Total Revenue", amount: (totalRevenue !== undefined && totalRevenue !== null)
        ? `${totalRevenue} ${currency}`
        : "Loading...",

      description: "From Validated Invoices",
      icon: DollarSign,
    },
    {
      label: "Staff Members",
      amount: subscriptions !== null ? `+${subscriptions}` : "Loading...",
      description: "From Last Month",
      icon: Users,
    },
    {
      label: "Total validated Invoices",
      amount: totalInvoices !== null ? `${totalInvoices}` : "Loading...",
      description: "+19% from last month",
      icon: CreditCard,
    },
    {
      label: "Products",
      amount: totalProducts !== null ? `+${totalProducts}` : "Loading...",
      description: " ",
      icon: CakeSlice,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card1 key={i} amount={d.amount} description={d.description} icon={d.icon} label={d.label} />
        ))}
      </section>
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>  Overview</CardTitle>

          </CardHeader>


          <CardContent>
            <LineChart data={barChartData} />
          </CardContent>
          <br />
          <hr />

          <br />
          <CardContent>
            <BarChart data={barChartData} currency={currency} />
          </CardContent>

        </Card>

        <CardWrapper className="flex justify-between gap-4">
          <section>
            <CardTitle>  Recent Sales</CardTitle>

          </section>
          {userSalesData.map((d, i) => (
            <SalesCard key={i} email={d.email} name={d.name} saleAmount={d.saleAmount} currency={currency} />
          ))}
        </CardWrapper>
      </section>
      <ChartB
        data={{
          totalRevenue: totalRevenue ?? "0",
          subscriptions: subscriptions ?? 0,
          totalInvoices: totalInvoices ?? 0,
          canceledInvoices: canceledInvoices ?? 0,
          totalProducts: totalProducts ?? 0,
          userSalesData,
          barChartData,
          currency,
        }}
      />

    </div>
  );
};

export default Home;

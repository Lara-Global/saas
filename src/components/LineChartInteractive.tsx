"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

type ChartProps = {
    data: {
        currency: string;
        totalRevenue: string;
        subscriptions: number;
        totalInvoices: number;
        canceledInvoices: number;
        totalProducts: number;
        userSalesData: {
            name: string;
            email: string;
            saleAmount: string;
        }[];
        barChartData: {
            name: string;
            total: number;
        }[];
    };
};

type ChartConfig = {
    views?: {
        label: string;
    };
    desktop?: {
        label: string;
        color: string;
    };
    mobile?: {
        label: string;
        color: string;
    };
};

const ChartB: React.FC<ChartProps> = ({ data }) => {
    const [activeChart, setActiveChart] = React.useState<"totalInvoices" | "canceledInvoices">("totalInvoices");

    const total = React.useMemo(
        () => ({
            totalInvoices: data.totalInvoices,
            canceledInvoices: data.canceledInvoices,
        }),
        [data]
    );

    // Define the chart configuration
    const chartConfig = {
        views: {
            label: "Page Views",
        },
        desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
        },
        mobile: {
            label: "Mobile",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig;

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Chart Interactive</CardTitle>
                    <CardDescription>
                        Showing total sales for each month
                    </CardDescription>
                </div>
                <div className="flex">
                    {["totalInvoices", "canceledInvoices"].map((key) => {
                        return (
                            <button
                                key={key}
                                data-active={activeChart === key}
                                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(key as "totalInvoices" | "canceledInvoices")}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {key === "totalInvoices" ? "Total Invoices" : "Canceled Invoices"}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[key as keyof typeof total].toLocaleString()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <LineChart
                        data={data.barChartData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.desktop.color} />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `${value} ${data.currency}`} /> {/* Add DH to Y-axis */}
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    labelFormatter={(value) => `Month: ${value} `}
                                    nameKey="total"
                                    
                                />
                            }
                        />
                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke={chartConfig.desktop.color}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default ChartB;

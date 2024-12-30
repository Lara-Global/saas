/** @format */
"use client";

import { useEffect, useState } from "react";
import getCompanyCurrencyFromLocalStorage from "./tokens/company";
import {
    CartesianGrid,
    LabelList,
    Line,
    LineChart,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export const description = "A line chart with a label";

type LigneChartData = {
    name: string;
    total: number;
};

type BarChartProps = {
    data: LigneChartData[];
};

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

const LigneChart: React.FC<BarChartProps> = ({ data }) => {
    const [currency, setCurrency] = useState<string>('DH'); 
    useEffect(() => {
        const storedCurrency = getCompanyCurrencyFromLocalStorage();
        if (storedCurrency) {
            setCurrency(storedCurrency);
        }
    }, []);

    return (
        <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                        dataKey={"name"}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis tickFormatter={(value) => `${value} ${currency}`} />
                    <RechartsTooltip
                        formatter={(value: number) => `${value} ${currency}`}
                    />
                    <Line
                        dataKey="total"
                        type="natural"
                        stroke="var(--color-desktop)"
                        strokeWidth={2}
                        dot={{
                            fill: "var(--color-desktop)",
                        }}
                        activeDot={{
                            r: 6,
                        }}
                    >
                        <LabelList
                            position="top"
                            offset={12}
                            className="fill-foreground"
                            fontSize={12}
                        />
                    </Line>
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

export default LigneChart;

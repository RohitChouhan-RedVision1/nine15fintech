"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "An area chart with gradient fill";

const chartConfig = {
    amount: {
        label: "Amount",
        color: "#00aeef",
    },
    currentvalue: {
        label: "Current Value",
        color: "hsl(var(--chart-3))",
    },
};

// Function to filter data based on the given range
const filterDataByRange = (sipData) => {
    // Check if sipData is valid
    if (!sipData || !Array.isArray(sipData)) return [];


    return sipData.map((item) => (
        {
            date: item.date || new Date().toISOString(), // Use current date if navDate is not defined
            amount: item.currentValue || 0, // Default to 0 if amount is undefined
        }
    ));
};

export function SchemePerformanceChart({ piedata, startDate, endDate, title }) {
    const [chartData, setChartData] = React.useState([]);
    const [valuation, setValuation] = React.useState([]);

    React.useEffect(() => {
        setChartData(filterDataByRange(piedata.graphData));
        setValuation(piedata);
    }, [piedata]);

    return (
        <Card>
            <CardHeader>
                <div className="grid grid-cols-7 gap-x-3 mb-5">
                    <div className="py-2 px-3 border border-stone-600 shadow shadow-emerald-100 rounded-sm text-center">
                        <h1 className="font-semibold text-gray-800 text-sm">Amount Invested</h1>
                        <h1 className="font-medium text-gray-900 text-sm">{valuation?.investedAmount}</h1>
                    </div>
                    <div className="py-2 px-3 border border-stone-600 shadow shadow-emerald-100 rounded-sm text-center">
                        <h1 className="font-semibold text-gray-800 text-sm">Buy Units</h1>
                        <h1 className="font-medium text-gray-900 text-sm">{valuation?.buyUnit}</h1>
                    </div>
                    <div className="py-2 px-3 border border-stone-600 shadow shadow-emerald-100 rounded-sm text-center">
                        <h1 className="font-semibold text-gray-800 text-sm">Profit/Loss</h1>
                        <h1 className="font-medium text-gray-900 text-sm">{Math.floor(valuation?.maturityValue - valuation?.investedAmount)}</h1>
                    </div>
                    <div className="py-2 px-3 border border-stone-600 shadow shadow-emerald-100 rounded-sm text-center">
                        <h1 className="font-semibold text-gray-800 text-sm">Maturity Rate</h1>
                        <h1 className="font-medium text-gray-900 text-sm">{valuation?.RateAtMaturity}</h1>
                    </div>
                    <div className="py-2 px-3 border border-stone-600 shadow shadow-emerald-100 rounded-sm text-center">
                        <h1 className="font-semibold text-gray-800 text-sm">Maturity Value</h1>
                        <h1 className="font-medium text-gray-900 text-sm">{valuation?.maturityValue}</h1>
                    </div>
                    <div className="py-2 px-3 border border-stone-600 shadow shadow-emerald-100 rounded-sm text-center">
                        <h1 className="font-semibold text-gray-800 text-sm">Absolute Return(%)</h1>
                        <h1 className="font-medium text-gray-900 text-sm">{valuation?.absoluteReturns}</h1>
                    </div>
                    <div className="py-2 px-3 border border-stone-600 shadow shadow-emerald-100 rounded-sm text-center">
                        <h1 className="font-semibold text-gray-800 text-sm">XIRR (%)</h1>
                        <h1 className="font-medium text-gray-900 text-sm">{valuation?.xirrRate}</h1>
                    </div>
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {startDate} to {endDate} (Current Value As on {endDate})
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-80 w-full">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date" // Use the correct key for date
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) =>
                                new Date(value).toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                })
                            }
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickCount={8}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillAmount" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-amount)"
                                    stopOpacity={1}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-amount)"
                                    stopOpacity={0.6}
                                />
                            </linearGradient>
                            <linearGradient id="fillCurrentvalue" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-currentvalue)"
                                    stopOpacity={1}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-currentvalue)"
                                    stopOpacity={0.6}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="amount"
                            type="natural"
                            fill="url(#fillAmount)"
                            fillOpacity={0.7}
                            stroke="var(--color-amount)"
                            stackId="a"
                        />
                        <Area
                            dataKey="currentvalue"
                            type="natural"
                            fill="url(#fillCurrentvalue)"
                            fillOpacity={0.7}
                            stroke="var(--color-currentvalue)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by {valuation?.absoluteReturns}%<TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            {startDate} - {endDate}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}

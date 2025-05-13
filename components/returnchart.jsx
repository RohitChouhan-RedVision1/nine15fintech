"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export const description = "A simple area chart";

// Function to filter data based on the given range
const filterDataByRange = (data, range) => {
    const now = new Date();
    const filterDate = (dateStr) => new Date(dateStr) >= range;

    // Check if range is null, which indicates that we want all data
    if (!range) {
        return data.labels
            .map((label, index) => ({
                date: label,
                value: data.datasets[0].data[index],
            }))
            .filter(item => item.value && !isNaN(item.value));
    }

    return data.labels
        .map((label, index) => ({
            date: label,
            value: data.datasets[0].data[index],
        }))
        .filter(item => item.value && !isNaN(item.value) && filterDate(item.date));
};

export function ReturnChart({ data }) {
    const [chartData, setChartData] = useState(filterDataByRange(data, new Date(new Date().setFullYear(new Date().getFullYear() - 1))));

    const handleFilter = (range) => {
        setChartData(filterDataByRange(data, range));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Performance Chart</CardTitle>
                <CardDescription>Showing NAV trends over time</CardDescription>
            </CardHeader>
            <CardContent>
            <ResponsiveContainer width="100%" height={300}>
  <AreaChart
    data={chartData}
    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis
      dataKey="date"
      tickLine={false}
      axisLine={false}
      tickMargin={8}
      tickFormatter={(value) => value && value.slice(0, 10)}
    />
    <Tooltip cursor={false} />
    <Area
      type="monotone"
      dataKey="value"
      stroke="#8884d8"
      fill="#8884d8"
      fillOpacity={0.4}
    />
  </AreaChart>
</ResponsiveContainer>
            </CardContent>
            <CardFooter>
                <div className="flex mb-4 overflow-x-auto">
                    <Button variant="outline" onClick={() => handleFilter(new Date(new Date().setDate(new Date().getDate() - 7)))} className="mr-2">1 W</Button>
                    <Button variant="outline" onClick={() => handleFilter(new Date(new Date().setMonth(new Date().getMonth() - 1)))} className="mr-2">1 M</Button>
                    <Button variant="outline" onClick={() => handleFilter(new Date(new Date().setMonth(new Date().getMonth() - 6)))} className="mr-2">6 M</Button>
                    <Button variant="outline" onClick={() => handleFilter(new Date(new Date().setFullYear(new Date().getFullYear() - 1)))} className="mr-2">1 Y</Button>
                    <Button variant="outline" onClick={() => handleFilter(new Date(new Date().setFullYear(new Date().getFullYear() - 3)))} className="mr-2">3 Y</Button>
                    <Button variant="outline" onClick={() => handleFilter(new Date(new Date().setFullYear(new Date().getFullYear() - 5)))} className="mr-2">5 Y</Button>
                    <Button variant="outline" onClick={() => handleFilter(null)} className="mr-2">Max</Button> {/* Pass null for max */}
                </div>
            </CardFooter>

        </Card>
    );
}
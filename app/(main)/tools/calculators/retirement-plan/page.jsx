"use client";

import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { SippieChart } from "@/components/charts/sippiechart"; // Ensure you have the chart component
import { CalculatorReturnChart } from "@/components/charts/calculatorReturnChart"; // Ensure you have the chart component
import { calculators } from "@/data/calculators";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RetirementCalculator() {
    const router = useRouter();
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [lifeExpectancy, setLifeExpectancy] = useState(85);
    const [requirement, setRequirement] = useState(40000); // Current Monthly Expenses
    const [expectedReturnPreRetirement, setExpectedReturnPreRetirement] = useState(14); // in percentage
    const [expectedReturnPostRetirement, setExpectedReturnPostRetirement] = useState(7); // in percentage
    const [inflationRate, setInflationRate] = useState(7); // in percentage
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState(null);

    const calculateRetirement = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API}/api/calculators/retirement-plan?currentAge=${currentAge}&retirementAge=${retirementAge}&expectedReturnPreRetirement=${expectedReturnPreRetirement}&expectedReturnPostRetirement=${expectedReturnPostRetirement}&inflationRate=${inflationRate}&monthlyexpense=${requirement}&lifeExpectancy=${lifeExpectancy}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
        if (res.status === 200) {
            const data = res.data
            const retirementCorpus = data.retirementCorpus;
            const futureMonthlyExpense = data.futureMonthlyExpense;
            const lumpsumInvestment = data.lumpsumFutureValue;
            const sipInvestment = data.sipFutureValue;
            const yearlyData = data.yearlyData;
            setResult({
                retirementCorpus: Math.round(retirementCorpus),
                futureValue: Math.round(futureMonthlyExpense),
                lumpsumInvestment: Math.round(lumpsumInvestment),
                sipInvestment: Math.round(sipInvestment),
                totalInvestment: Math.round(requirement),
            });
            setChartData(yearlyData);
        }
    };

    useEffect(() => {
        calculateRetirement();
    }, [currentAge, retirementAge, requirement, expectedReturnPreRetirement, expectedReturnPostRetirement, inflationRate, lifeExpectancy]);
    const handleCalculatorChange = (e) => {
        const selectedRoute = e.target.value;
        if (selectedRoute) {
            router.push(selectedRoute); // Navigate to selected route
        }
    };

    return (
        <div  className="max-w-screen-xl mx-auto py-[30px] lg:py-[60px]">
        <div className="">
            <div className="mb-5 flex justify-between">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/tools/calculators">Calculators</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Retirement Planning Calculator</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex justify-between gap-4">
                    <h2>Explore other calculators</h2>
                    <select
                        className="w-full border border-gray-500 rounded-lg p-2"
                        onChange={handleCalculatorChange}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select
                        </option>
                        {calculators.map((calc) => (
                            <option key={calc.title} value={calc.route}>
                                {calc.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Retirement Planning Calculator
                        </h1>
                    </div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
                        <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                            <div className="sip-calculator container mx-auto p-3 sticky top-0 z-10">
                                <div className="input-fields mt-5 mb-10">
                                    <div>
                                        <div className='flex justify-between'>
                                            <h1>Current Age</h1>
                                            <div>
                                                <input
                                                    type="text"
                                                    value={currentAge}
                                                    onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
                                                    className='font-semibold text-green-700 w-10 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="20"
                                            max="80"
                                            step="1"
                                            value={currentAge}
                                            onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Retirement Age</h1>
                                            <input
                                                type="text"
                                                value={retirementAge}
                                                onChange={(e) => setRetirementAge(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="30"
                                            max="100"
                                            step="1"
                                            value={retirementAge}
                                            onChange={(e) => setRetirementAge(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>

                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Life Expectancy</h1>
                                            <input
                                                type="text"
                                                value={lifeExpectancy}
                                                onChange={(e) => setLifeExpectancy(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="60"
                                            max="100"
                                            step="1"
                                            value={lifeExpectancy}
                                            onChange={(e) => setLifeExpectancy(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>

                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Current Monthly Expenses</h1>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="text"
                                                    value={requirement}
                                                    onChange={(e) => setRequirement(parseFloat(e.target.value))}
                                                    className="font-semibold text-green-700 w-14 border-none"
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="1000"
                                            max="100000"
                                            step="1000"
                                            value={requirement}
                                            onChange={(e) => setRequirement(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>

                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Inflation Rate (%)</h1>
                                            <input
                                                type="text"
                                                value={inflationRate}
                                                onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="0"
                                            max="30"
                                            step="1"
                                            value={inflationRate}
                                            onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>

                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Expected Return Pre-Retirement (%)</h1>
                                            <input
                                                type="text"
                                                value={expectedReturnPreRetirement}
                                                onChange={(e) => setExpectedReturnPreRetirement(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={expectedReturnPreRetirement}
                                            onChange={(e) => setExpectedReturnPreRetirement(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Expected Return Post-Retirement (%)</h1>
                                            <input
                                                type="text"
                                                value={expectedReturnPostRetirement}
                                                onChange={(e) => setExpectedReturnPostRetirement(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={expectedReturnPostRetirement}
                                            onChange={(e) => setExpectedReturnPostRetirement(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>

                                    {/* Display Results */}
                                    {result && (
                                        <div className="mt-5">
                                            <div className='flex justify-between px-5 mb-3'>
                                                <p>Future Monthly Expenses</p>
                                                <p className='font-bold text-lg'>₹{result?.futureValue?.toLocaleString()}</p>
                                            </div>
                                            <hr className='mb-3' />
                                            <div className='flex justify-between px-5 mb-3'>
                                                <p>Required Corpus At Retirement</p>
                                                <p className='font-bold text-lg'>₹{result?.retirementCorpus?.toLocaleString()}</p>
                                            </div>
                                            <hr className='mb-3' />
                                            <div className='flex justify-between px-5 mb-3'>
                                                <p>Planning Through SIP</p>
                                                <p className='font-bold text-lg'>₹{result?.sipInvestment?.toLocaleString()}</p>
                                            </div>
                                            <hr className='mb-3' />
                                            <div className='flex justify-between px-5 mb-3'>
                                                <p>Planning Through Lump Sum</p>
                                                <p className='font-bold text-lg'>₹{result?.lumpsumInvestment?.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 space-y-5'>
                            <SippieChart
                                piedata={result}
                                title={'Future & Current Monthly Expenses Breakup'}
                                customLabels={{
                                    invested: "Future Monthly Expenses",
                                    return: "Current Monthly Expenses",
                                }}
                                className="h-full"
                            />
                            <CalculatorReturnChart data={chartData}
                                title="SIP"
                                className="h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
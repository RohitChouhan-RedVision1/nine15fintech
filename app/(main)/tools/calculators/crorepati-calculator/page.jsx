"use client";
import React, { useEffect, useState } from "react";
import "chart.js/auto";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { SippieChart } from "@/components/charts/sippiechart";
import { CalculatorReturnChart } from "@/components/charts/calculatorReturnChart";
import axios from "axios";
import { useRouter } from "next/navigation";
import { calculators } from "@/data/calculators";

export default function CrorepatiPlanningCalculator() {
    const router = useRouter();
    const [currentAge, setCurrentAge] = useState(10); // Current age of the child
    const [crorepatiStartAge, setCrorepatiStartAge] = useState(18); // Age at which Crorepati starts
    const [targetWealth, setTargetWealth] = useState(50000000); // Target wealth in INR
    const [currentSavings, setCurrentSavings] = useState(100000); // Current savings
    const [expectedReturn, setExpectedReturn] = useState(7); // Expected annual return in %
    const [inflationRate, setInflationRate] = useState(5); // Inflation rate in %

    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);



    useEffect(() => {
        const calculateCrorepatiPlan = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API}/api/calculators/crorepati-calculator?currentAge=${currentAge}&crorepatiAge=${crorepatiStartAge}&targetedWealth=${targetWealth}&currentSavings=${currentSavings}&expectedReturn=${expectedReturn}&inflationRate=${inflationRate}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
                if (res.status === 200) {
                    const data = res.data
                    console.log(data)
                    const futureTargetWealth = data.futureTargetWealth;
                    const savingsGrowth = data.savingsGrowth;
                    const finalTargetWealth = data.finalTargetWealth;
                    const sipInvestmentRequired = data.sipInvestmentRequired;
                    const totalSIPInvestment = data.totalSIPInvestment;
                    const sipGrowth = data.sipGrowth;
                    const sipFutureValue = data.sipFutureValue;
                    const yearlyData = data.yearlyData;
                    setResult({
                        futureTargetWealth: Math.round(futureTargetWealth),
                        growthOfSavings: Math.round(savingsGrowth),
                        finalTargetWealth: Math.round(finalTargetWealth),
                        sipInvestmentRequired: Math.round(sipInvestmentRequired),
                        totalSIPInvestment: Math.round(totalSIPInvestment),
                        sipGrowth: Math.round(sipGrowth),
                        sipFutureValue: Math.round(sipFutureValue),
                    });
                    setChartData(yearlyData);
                }
            }
            catch (error) {
                console.log(error)
            }

        };
        calculateCrorepatiPlan();
    }, [currentAge, crorepatiStartAge, targetWealth, currentSavings, expectedReturn, inflationRate]);
    const handleCalculatorChange = (e) => {
        const selectedRoute = e.target.value;
        if (selectedRoute) {
            router.push(selectedRoute); // Navigate to selected route
        }
    };

    return (
        <div  className="max-w-screen-xl mx-auto py-[30px] lg:py-[60px]">
        <div className="">
            <div className="mb-5 flex flex-col md:flex-row gap-5 justify-between">
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
                            <BreadcrumbPage>Crorepati Planning Calculator</BreadcrumbPage>
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
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Crorepati Planning Calculator
                    </h1>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
                    <div className='col-span-1'>
                        <div className='border border-gray-200 rounded-2xl bg-white p-5'>
                            <div className="sip-calculator container mx-auto p-3">
                                <div className="input-fields mt-5 mb-10">
                                    {/* Target Wealth */}
                                    <div>
                                        <div className='flex justify-between mt-5'>
                                            <h1>Target Wealth (INR)?</h1>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="text"
                                                    value={targetWealth.toLocaleString()}
                                                    onChange={(e) => setTargetWealth(parseFloat(e.target.value.replace(/,/g, '')))}
                                                    className='font-semibold text-green-700 w-28 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="1000000"
                                            max="1000000000"
                                            step="100000"
                                            value={targetWealth}
                                            onChange={(e) => setTargetWealth(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    {/* Current Age */}
                                    <div className='items-center mt-5 mb-5'>
                                        <div className='flex justify-between'>
                                            <h1>Current Age</h1>
                                            <input
                                                type="text"
                                                value={currentAge}
                                                onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="80"
                                            step="1"
                                            value={currentAge}
                                            onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    {/* Crorepati Start Age */}
                                    <div className='items-center mt-5 mb-5'>
                                        <div className='flex justify-between'>
                                            <h1>Age at the Time of Crorepati</h1>
                                            <input
                                                type="text"
                                                value={crorepatiStartAge}
                                                onChange={(e) => setCrorepatiStartAge(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="10"
                                            max="100"
                                            step="1"
                                            value={crorepatiStartAge}
                                            onChange={(e) => setCrorepatiStartAge(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    {/* Rate of Return */}
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Rate of Return (%)</h1>
                                            <input
                                                type="text"
                                                value={expectedReturn}
                                                onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={expectedReturn}
                                            onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    {/* Inflation Rate */}
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
                                            min="1"
                                            max="20"
                                            step="1"
                                            value={inflationRate}
                                            onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    <div className='items-center mt-5'>
                                        {/* Current Savings */}
                                        <div className='flex justify-between'>
                                            <h1>Current Savings (INR)?</h1>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="text"
                                                    value={currentSavings.toLocaleString()}
                                                    onChange={(e) => setCurrentSavings(parseFloat(e.target.value.replace(/,/g, '')))}
                                                    className='font-semibold text-green-700 w-28 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="1000000"
                                            max="1000000000"
                                            step="100000"
                                            value={targetWealth}
                                            onChange={(e) => setTargetWealth(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='border border-gray-200 rounded-2xl bg-white p-5'>
                            {result && (
                                <div>
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>Your Targeted Wealth (Inflation Adjusted)</p>
                                        <p className='font-bold text-lg'>₹ {result.futureTargetWealth.toLocaleString()}</p>
                                    </div>
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>Growth of Savings</p>
                                        <p className='font-bold text-lg'>₹ {result.growthOfSavings.toLocaleString()}</p>
                                    </div>
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>Monthly SIP Amount Required</p>
                                        <p className='font-bold text-lg'>₹ {result.sipInvestmentRequired.toLocaleString()}</p>
                                    </div>
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>Amount Invested through SIP in {crorepatiStartAge - currentAge} years</p>
                                        <p className='font-bold text-lg'>₹ {result.totalSIPInvestment.toLocaleString()}</p>
                                    </div>
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>SIP Growth</p>
                                        <p className='font-bold text-lg'>₹ {result.sipGrowth.toLocaleString()}</p>
                                    </div>
                                    <div className='flex justify-between px-5 mb-3'>
                                        <p>Future Value of SIP</p>
                                        <p className='font-bold text-lg'>₹ {result.sipFutureValue.toLocaleString()}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <SippieChart
                            piedata={{
                                totalInvestment: result?.sipFutureValue,
                                futureValue: result?.totalSIPInvestment
                            }}
                            title={'Education Planning Projection'}
                            customLabels={{
                                invested: "Current Expenses",
                                return: "Future Expenses",
                            }}
                            className="mb-4"
                        />
                        <CalculatorReturnChart data={chartData} />
                    </div>
                </div>
            </div>
        </div >
        </div>
    );
}

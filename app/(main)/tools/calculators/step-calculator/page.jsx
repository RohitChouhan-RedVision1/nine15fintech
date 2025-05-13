"use client";
import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Input } from "@/components/ui/input";
import { SippieChart } from "@/components/charts/sippiechart";
import { CalculatorReturnChart } from "@/components/charts/calculatorReturnChart";
import axios from "axios";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { calculators } from "@/data/calculators";

export default function Page() {
    

    const [isAuthorised, setIsAuthorised] = useState(false);
    const [loading, setLoading] = useState(true);
    const [monthlyInvestment, setMonthlyInvestment] = useState(1000);
    const [investmentDuration, setInvestmentDuration] = useState(5); // Duration in years
    const [expectedReturn, setExpectedReturn] = useState(5);
    const [stepUpPercentage, setStepUpPercentage] = useState(5); // Step-up percentage
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);

    const handleCalculatorChange = (e) => {
        const selectedRoute = e.target.value;
        if (selectedRoute) {
            router.push(selectedRoute); // Navigate to selected route
        }
    };

    const calculateStepUpSip = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API}/api/calculators/stepup-calculator?monthlyInvestment=${monthlyInvestment}&investmentDuration=${investmentDuration}&expectedReturn=${expectedReturn}&annualStepupPercentage=${stepUpPercentage}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
            if (res.status === 200) {
                console.log(res)
                const data = res.data
                const totalInvestment = data.totalInvestment;
                const futureValue = data.futureValue;
                const yearlyData = data.yearlyData;
                setResult({
                    totalInvestment: Math.round(totalInvestment),
                    futureValue: Math.round(futureValue),
                    wealthGained: Math.round(futureValue - totalInvestment),
                });
                setIsAuthorised(true);
                setChartData(yearlyData);
            }
        }
        catch (error) {
            setIsAuthorised(false);
            console.log(error)
        } finally {
            setLoading(false)
        }
    };
    // Update the calculation when any of the investment values change
    useEffect(() => {
        calculateStepUpSip();
    }, [monthlyInvestment, investmentDuration, expectedReturn, stepUpPercentage]);

    const setDuration = (years) => {
        const parsedYears = parseFloat(years);
        if (!isNaN(parsedYears)) {
            setInvestmentDuration(parsedYears);
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto py-[30px] lg:py-[60px]">
            <div className=" ">
            <div className="mb-5 flex flex-col md:flex-row gap-5 justify-between">
                            <Breadcrumb>

                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/tools/calculators">Tools</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/tools/calculators">Calculators</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Step up Calculator</BreadcrumbPage>
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
                    {isAuthorised ? (
                        <div>
                            <div className="mb-10">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                                    Step-Up SIP Calculator
                                </h1>
                            </div>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
                                <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                                    <div className="sip-calculator container mx-auto p-3 sticky top-0 z-10">
                                        <div className="input-fields mt-5 mb-10">
                                            <div>
                                                <div className='flex justify-between'>
                                                    <h1>Monthly investment</h1>
                                                    <div>
                                                        <span className='font-semibold text-green-700'>₹</span>
                                                        <input
                                                            type="text"
                                                            value={monthlyInvestment}
                                                            onChange={(e) => setMonthlyInvestment(parseFloat(e.target.value))}
                                                            className='font-semibold text-green-700 w-14 border-none'
                                                        />
                                                    </div>
                                                </div>
                                                <Input
                                                    type="range"
                                                    min="500"
                                                    max="50000"
                                                    step="500"
                                                    value={monthlyInvestment}
                                                    onChange={(e) => setMonthlyInvestment(parseFloat(e.target.value))}
                                                    className="w-full text-gray-400"
                                                />
                                            </div>
                                            <div className='items-center mt-5'>
                                                <div className='flex justify-between'>
                                                    <h1>Time period (Years)</h1>
                                                    <input
                                                        type="text"
                                                        value={investmentDuration}
                                                        onChange={(e) => setDuration(e.target.value)}
                                                        className="font-semibold text-green-700 w-5 border-none"
                                                    />
                                                </div>
                                                <Input
                                                    type="range"
                                                    min="1"
                                                    max="40"
                                                    step="1"
                                                    value={investmentDuration}
                                                    onChange={(e) => setDuration(e.target.value)}
                                                    className="w-full text-gray-400"
                                                />
                                            </div>

                                            <div className='items-center mt-5'>
                                                <div className='flex justify-between'>
                                                    <h1>Expected Return (%)</h1>
                                                    <input
                                                        type="text"
                                                        value={expectedReturn}
                                                        onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                                                        className="font-semibold text-green-700 w-5 border-none"
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

                                            {/* Step-up percentage field */}
                                            <div className='items-center mt-5'>
                                                <div className='flex justify-between'>
                                                    <h1>Step-up Rate (%)</h1>
                                                    <input
                                                        type="text"
                                                        value={stepUpPercentage}
                                                        onChange={(e) => setStepUpPercentage(parseFloat(e.target.value))}
                                                        className="font-semibold text-green-700 w-5 border-none"
                                                    />
                                                </div>
                                                <Input
                                                    type="range"
                                                    min="1"
                                                    max="30"
                                                    step="1"
                                                    value={stepUpPercentage}
                                                    onChange={(e) => setStepUpPercentage(parseFloat(e.target.value))}
                                                    className="w-full text-gray-400"
                                                />
                                            </div>
                                        </div>

                                        {result && (
                                            <div className="mt-5">
                                                <div className='flex justify-between px-5 mb-3'>
                                                    <p>Invested Amount</p>
                                                    <p className='font-bold text-lg'>₹{result?.totalInvestment?.toLocaleString()}</p>
                                                </div>
                                                <hr className='mb-3' />
                                                <div className='flex justify-between px-5 mb-3'>
                                                    <p>Growth</p>
                                                    <p className='font-bold text-lg'>₹{result?.wealthGained?.toLocaleString()}</p>
                                                </div>
                                                <hr className='mb-3' />
                                                <div className='flex justify-between px-5 mb-3'>
                                                    <p>Total Future Value</p>
                                                    <p className='font-bold text-lg'>₹{result?.futureValue?.toLocaleString()}</p>
                                                </div>
                                                <hr />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='col-span-1'>
                                    <SippieChart
                                        piedata={result}
                                        title={'Current & Future Cost Of House Breakup'}
                                        customLabels={{
                                            invested: "Invested Amount",
                                            return: "Growth",
                                        }}
                                    />
                                    <div>
                                        <CalculatorReturnChart data={chartData} title={"Step-Up Calculator"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <h3 className="font-bold text-red-600 text-4xl mb-3">Error 403</h3>
                            <p className="font-medium text-xl">Your not Authorised</p>
                        </div>
                    )}
                </div>
      
        </div>
        </div>
    );
}
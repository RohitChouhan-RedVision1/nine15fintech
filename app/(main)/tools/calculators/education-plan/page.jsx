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
import { calculators } from "@/data/calculators";
import { useRouter } from "next/navigation";

export default function EducationPlanningCalculator() {
    const router = useRouter();
    const [currentAge, setCurrentAge] = useState(10); // Current age of the child
    const [educationStartAge, setEducationStartAge] = useState(18); // Age at which education starts
    const [totalInvestment, setTotalInvestment] = useState(500000); // Current education cost
    const [expectedReturn, setExpectedReturn] = useState(7); // Expected annual return in %
    const [inflationRate, setInflationRate] = useState(5); // Inflation rate in %

    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);

   

    useEffect(() => {
        const calculateEducationPlan = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API}/api/calculators/education-calculator?currentAge=${currentAge}&educationAge=${educationStartAge}&totalInvestment=${totalInvestment}&expectedReturn=${expectedReturn}&inflationRate=${inflationRate}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
                if (res.status === 200) {
                    const data = res.data
                    const lumpsumInvestment = data.lumpsumInvestment;
                    const futureEducationCost = data.futureEducationCost;
                    const sipInvestment = data.sipInvestment;
                    const yearlyData = data.yearlyData;
                    setResult({
                        totalInvestment,
                        futureValue: Math.round(futureEducationCost),
                        lumpsumInvestment: Math.round(lumpsumInvestment),
                        sipInvestment: Math.round(sipInvestment),
                    });
                    setChartData(yearlyData);
                }
            }
            catch (error) {
                console.log(error)
            }
        };
        calculateEducationPlan();
    }, [currentAge, educationStartAge, totalInvestment, expectedReturn, inflationRate]);
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
            <div className="">
                        <h1 className="text-2xl md:text-3xl font-bold uppercase">
                            Education Planning Calculator
                        </h1>
                    </div>
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
                    
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
                        <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                            <div className="sip-calculator container mx-auto p-3 sticky top-0 z-10">
                                <div className="input-fields mt-5 mb-10">
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
                                            max="30"
                                            step="1"
                                            value={currentAge}
                                            onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    {/* Education Start Age */}
                                    <div className='items-center mt-5 mb-5'>
                                        <div className='flex justify-between'>
                                            <h1>Age at the Start of Education</h1>
                                            <input
                                                type="text"
                                                value={educationStartAge}
                                                onChange={(e) => setEducationStartAge(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="10"
                                            max="50"
                                            step="1"
                                            value={educationStartAge}
                                            onChange={(e) => setEducationStartAge(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    {/* Current Education Cost */}
                                    <div>
                                        <div className='flex justify-between'>
                                            <h1>Current Education Expenses</h1>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="text"
                                                    value={totalInvestment}
                                                    onChange={(e) => setTotalInvestment(parseFloat(e.target.value))}
                                                    className='font-semibold text-green-700 w-24 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="100000"
                                            max="10000000"
                                            step="1000"
                                            value={totalInvestment}
                                            onChange={(e) => setTotalInvestment(parseFloat(e.target.value))}
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
                                            max="30"
                                            step="1"
                                            value={inflationRate}
                                            onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                </div>

                                {result && (
                                    <div className="mt-5">
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Current Education Expenses</p>
                                            <p className='font-bold text-lg'>₹{result?.totalInvestment?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Future Education Expenses</p>
                                            <p className='font-bold text-lg'>₹{result?.futureValue?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Planning Through Lumpsum</p>
                                            <p className='font-bold text-lg'>₹{result?.lumpsumInvestment?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Planning Through SIP</p>
                                            <p className='font-bold text-lg'>₹{result?.sipInvestment?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className="mb-3">
                                <SippieChart
                                    piedata={result}
                                    title={'Education Planning Projection'}
                                    customLabels={{
                                        invested: "Current Expenses",
                                        return: "Future Expenses",
                                    }}
                                />
                            </div>
                            <CalculatorReturnChart
                                title={"Education Plan"}
                                data={chartData}
                                chartType='line'
                                customLabels={{
                                    xLabel: "Age",
                                    yLabel: "Amount",
                                }}
                                chartTitle="Education Planning Projection"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

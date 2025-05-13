"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { SippieChart } from "@/components/charts/sippiechart";
import { CalculatorReturnChart } from "@/components/charts/calculatorReturnChart";
import axios from "axios";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { calculators } from "@/data/calculators";


export default function Page() {
    const [isAuthorised, setIsAuthorised] = useState(false);
    const [loading, setLoading] = useState(true);
    const [investedAmount, setInvestedAmount] = useState(10000); // Initial investment in source fund
    const [withdrawalAmount, setWithdrawalAmount] = useState(500); // Amount to transfer to destination fund
    const [transferPeriod, setTransferPeriod] = useState(5); // Transfer period in years
    const [expectedReturnSource, setExpectedReturnSource] = useState(5); // Expected return from source fund
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);

    const calculateSTP = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API}/api/calculators/swp-calculator?investedAmount=${investedAmount}&withdrawalAmount=${withdrawalAmount}&timePeriod=${transferPeriod}&expectedReturn=${expectedReturnSource}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
            if (res.status === 200) {
                const data = res.data
                const totalInvestment = data.totalInvestment;
                const totalWithdrawn = data.totalWithdrawn;
                const totalGrowth = data.totalGrowth;
                const currentValue = data.currentValue;
                const yearlyData = data.yearlyData;
                setChartData(yearlyData);
                setResult({
                    investedAmount: totalInvestment,
                    balanceInSourceFund: Math.round(totalWithdrawn), // Remaining amount in the source fund
                    amountTransferredToDestinationFund: totalGrowth, // Total amount transferred to the destination fund
                    resultantAmount: Math.round(currentValue), // Final amount in the destination fund after growth
                });
            }
            setIsAuthorised(true);
        }
        catch (error) {
            console.log(error)
            setIsAuthorised(false);
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        calculateSTP();
    }, [investedAmount, withdrawalAmount, transferPeriod, expectedReturnSource]);

    const handleCalculatorChange = (e) => {
        const selectedRoute = e.target.value;
        if (selectedRoute) {
            router.push(selectedRoute); // Navigate to selected route
        }
    };
    return (
        <div className="max-w-screen-xl mx-auto py-[30px] lg:py-[60px]">
            <div className="">
            <div className="mb-5 flex flex-col md:flex-row gap-5 justify-between">
            <h1 className="text-2xl md:text-3xl font-bold uppercase">
                                SWP Calculator
                            </h1>
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
                            
                        </div>
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
                            <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                                <div className="input-fields mt-5 mb-10">
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <h1>Lumpsum Invested Amount</h1>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="text"
                                                    value={investedAmount}
                                                    onChange={(e) => setInvestedAmount(parseFloat(e.target.value))}
                                                    className='font-semibold text-green-700 w-24 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="10000"
                                            max="10000000"
                                            step="500"
                                            value={investedAmount}
                                            onChange={(e) => setInvestedAmount(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between mt-5'>
                                            <h1>SWP Withdrawal Amount</h1>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="text"
                                                    value={withdrawalAmount}
                                                    onChange={(e) => setWithdrawalAmount(parseFloat(e.target.value))}
                                                    className='font-semibold text-green-700 w-24 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
                                            type="range"
                                            min="500"
                                            max="1000000"
                                            step="500"
                                            value={withdrawalAmount}
                                            onChange={(e) => setWithdrawalAmount(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between mt-5'>
                                            <h1>For a period of (years)</h1>
                                            <input
                                                type="text"
                                                value={transferPeriod}
                                                onChange={(e) => setTransferPeriod(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={transferPeriod}
                                            onChange={(e) => setTransferPeriod(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between mt-5'>
                                            <h1>Expected Rate of Return (%)</h1>
                                            <input
                                                type="text"
                                                value={expectedReturnSource}
                                                onChange={(e) => setExpectedReturnSource(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
                                            type="range"
                                            min="1"
                                            max="30"
                                            step="1"
                                            value={expectedReturnSource}
                                            onChange={(e) => setExpectedReturnSource(parseFloat(e.target.value))}
                                            className="w-full text-gray-400"
                                        />
                                    </div>
                                </div>

                                {result && (
                                    <div className="mt-5">
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Total Investment</p>
                                            <p className='font-bold text-lg'>₹{result?.investedAmount?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Total Withdrawal</p>
                                            <p className='font-bold text-lg'>₹{result?.balanceInSourceFund?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Total Growth</p>
                                            <p className='font-bold text-lg'>₹{result?.amountTransferredToDestinationFund?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Current Value</p>
                                            <p className='font-bold text-lg'>₹{result?.resultantAmount?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='col-span-1'>
                                <SippieChart
                                    piedata={{
                                        totalInvestment: result?.investedAmount,
                                        futureValue: result?.resultantAmount
                                    }}
                                    title={'SWP Calculator'}
                                    customLabels={{
                                        invested: "Household Expenses",
                                        return: "Loan Repayment",
                                    }}
                                />
                                <CalculatorReturnChart data={chartData} title={"SWP Calculator"} />
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
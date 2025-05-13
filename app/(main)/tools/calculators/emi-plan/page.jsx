"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { SippieChart } from "@/components/charts/sippiechart";
import { CalculatorReturnChart } from "@/components/charts/calculatorReturnChart";
import { EmipieChart } from "@/components/charts/emipiechart";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import axios from "axios";
import { calculators } from "@/data/calculators";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [loanAmount, setLoanAmount] = useState(100000); // Principal loan amount
    const [loanTenure, setLoanTenure] = useState(5); // Loan tenure in years
    const [interestRate, setInterestRate] = useState(7); // Annual interest rate
    const [emi, setEmi] = useState(null);
    const [totalAmountPayable, setTotalAmountPayable] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);



    useEffect(() => {
        const calculateEmi = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API}/api/calculators/emi-calculator?loanAmount=${loanAmount}&loanTenure=${loanTenure}&interestRate=${interestRate}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
                if (res.status === 200) {
                    const data = res.data
                    const principal = data.principal;
                    const totalInterestPaid = data.totalInterestPaid;
                    const yearlyData = data.yearlyData;
                    const emiCalculated = data.emiCalculated;
                    const totalPayment = data.totalPayment;
                    setResult({
                        principalamount: Math.round(principal),
                        intrestamount: Math.round(totalInterestPaid),
                    });
                    setChartData(yearlyData);
                    setEmi(Math.round(emiCalculated));
                    setTotalAmountPayable(Math.round(totalPayment));
                    setTotalInterest(Math.round(totalInterestPaid));
                }
            }
            catch (error) {
                console.log(error)
            }

        };
        calculateEmi();
    }, [loanAmount, loanTenure, interestRate]);
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
                            <BreadcrumbLink href="/tools/calculators">Tools</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/tools/calculators">Calculators</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>EMI Calculator</BreadcrumbPage>
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
            <div className="mb-10">
                <h1 className=" text-3xl md:text-4xl font-bold text-gray-800">
                    EMI Calculator
                </h1>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
                <div className="col-span-1 border border-gray-200 rounded-2xl bg-white p-5">
                    <div className="input-fields mt-5 mb-10">
                        <div className="mb-5">
                            <div className="flex justify-between">
                                <h1>Loan Amount (₹)</h1>
                                <input
                                    type="text"
                                    value={loanAmount.toLocaleString()}
                                    onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                                    className="font-semibold text-green-700 w-24 border-none"
                                />
                            </div>
                            <Input
                                type="range"
                                min="100000"
                                max="100000000"
                                step="1000"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                                className="w-full text-gray-400"
                            />
                        </div>
                        <div className="mb-5">
                            <div className="flex justify-between">
                                <h1>Loan Tenure (Years)</h1>
                                <input
                                    type="text"
                                    value={loanTenure}
                                    onChange={(e) => setLoanTenure(parseFloat(e.target.value))}
                                    className="font-semibold text-green-700 w-10 border-none"
                                />
                            </div>
                            <Input
                                type="range"
                                min="1"
                                max="40"
                                step="1"
                                value={loanTenure}
                                onChange={(e) => setLoanTenure(parseFloat(e.target.value))}
                                className="w-full text-gray-400"
                            />
                        </div>
                        <div className="mb-5">
                            <div className="flex justify-between">
                                <h1>Interest Rate (%)</h1>
                                <input
                                    type="text"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                    className="font-semibold text-green-700 w-10 border-none"
                                />
                            </div>
                            <Input
                                type="range"
                                min="1"
                                max="30"
                                step="0.1"
                                value={interestRate}
                                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                className="w-full text-gray-400"
                            />
                        </div>
                    </div>

                    {emi && (
                        <div className="mt-40 bg-gray-50 p-5 rounded-lg shadow">
                            <div className="">
                                <div className="mb-4 text-center flex justify-between">
                                    <h2 className="text-2xl font-bold text-gray-700">Loan EMI</h2>
                                    <p className="text-xl font-extrabold text-[#00aeef]">₹{emi.toLocaleString()}</p>
                                </div>
                                <div className="mb-4 text-center flex justify-between">
                                    <p className="text-lg text-gray-600">Principal Loan Amount</p>
                                    <p className="text-xl font-bold text-gray-800">₹{loanAmount.toLocaleString()}</p>
                                </div>
                                <div className="mb-4 text-center flex justify-between">
                                    <p className="text-lg text-gray-600">Total Interest Payable</p>
                                    <p className="text-xl font-bold text-gray-800">₹{totalInterest.toLocaleString()}</p>
                                </div>
                                <div className="mb-4 text-center flex justify-between">
                                    <p className="text-lg text-gray-600">Total Payment (Principal + Interest)</p>
                                    <p className="text-xl font-bold text-gray-800">₹{totalAmountPayable.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-span-1">
                    <EmipieChart
                        piedata={result}
                        title={"EMI Breakdown"}
                    />
                    <div className="mt-5">
                        <CalculatorReturnChart data={chartData} title={'EMI Breakdown'} />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
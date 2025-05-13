"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { SippieChart } from "@/components/charts/sippiechart";
import { CalculatorReturnChart } from "@/components/charts/calculatorReturnChart";
import axios from "axios";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { calculators } from "@/data/calculators";

export default function Page() {
  const [isAuthorised, setIsAuthorised] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sourceFundAmount, setSourceFundAmount] = useState(10000); // Initial investment in source fund
  const [transferToFundAmount, setTransferToFundAmount] = useState(500); // Amount to transfer to destination fund
  const [transferPeriod, setTransferPeriod] = useState(5); // Transfer period in years
  const [expectedReturnSource, setExpectedReturnSource] = useState(5); // Expected return from source fund
  const [expectedReturnDestination, setExpectedReturnDestination] = useState(5); // Expected return from destination fund
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);

  const calculateSTP = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_API}/api/calculators/stp-calculator?sourceFundAmount=${sourceFundAmount}&transferToFundAmount=${transferToFundAmount}&transferPeriod=${transferPeriod}&expectedReturnSource=${expectedReturnSource}&expectedReturnDestination=${expectedReturnDestination}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (res.status === 200) {
        const data = res.data;
        const investedAmount = data.investedAmount;
        const futureValueSourceFund = data.futureValueSourceFund;
        const totalTransferred = data.totalTransferred;
        const resultantAmount = data.resultantAmount;
        const yearlyData = data.yearlyData;
        setResult({
          investedAmount,
          balanceInSourceFund: Math.round(futureValueSourceFund), // Remaining amount in the source fund
          amountTransferredToDestinationFund: totalTransferred, // Total amount transferred to the destination fund
          resultantAmount: Math.round(resultantAmount), // Final amount in the destination fund after growth
        });
        setIsAuthorised(true);
        setChartData(yearlyData);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorised(false);
    } finally {
      setLoading(false);
    }
  };

  // Update the calculation when any of the values change
  useEffect(() => {
    calculateSTP();
  }, [
    sourceFundAmount,
    transferToFundAmount,
    transferPeriod,
    expectedReturnSource,
    expectedReturnDestination,
  ]);

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
                <BreadcrumbLink href="/tools/calculators">
                  Calculators
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Stp Calculator</BreadcrumbPage>
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
                  STP Calculator
                </h1>
              </div>
              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
                <div className="col-span-1 border border-gray-200 rounded-2xl bg-white p-5">
                  <div className="input-fields mt-5 mb-10">
                    <div className="items-center mt-5">
                      <div className="flex justify-between">
                        <h1>I want to invest in Source Fund</h1>
                        <div>
                          <span className="font-semibold text-green-700">
                            ₹
                          </span>
                          <input
                            type="text"
                            value={sourceFundAmount}
                            onChange={(e) =>
                              setSourceFundAmount(parseFloat(e.target.value))
                            }
                            className="font-semibold text-green-700 w-24 border-none"
                          />
                        </div>
                      </div>
                      <Input
                        type="range"
                        min="10000"
                        max="10000000"
                        step="500"
                        value={sourceFundAmount}
                        onChange={(e) =>
                          setSourceFundAmount(parseFloat(e.target.value))
                        }
                        className="w-full text-gray-400"
                      />
                    </div>
                    <div className="items-center mt-5">
                      <div className="flex justify-between mt-5">
                        <h1>I want to transfer to Destination Fund</h1>
                        <div>
                          <span className="font-semibold text-green-700">
                            ₹
                          </span>
                          <input
                            type="text"
                            value={transferToFundAmount}
                            onChange={(e) =>
                              setTransferToFundAmount(
                                parseFloat(e.target.value)
                              )
                            }
                            className="font-semibold text-green-700 w-24 border-none"
                          />
                        </div>
                      </div>
                      <Input
                        type="range"
                        min="500"
                        max="1000000"
                        step="500"
                        value={transferToFundAmount}
                        onChange={(e) =>
                          setTransferToFundAmount(parseFloat(e.target.value))
                        }
                        className="w-full text-gray-400"
                      />
                    </div>
                    <div className="items-center mt-5">
                      <div className="flex justify-between mt-5">
                        <h1>For a period of (years)</h1>
                        <input
                          type="text"
                          value={transferPeriod}
                          onChange={(e) =>
                            setTransferPeriod(parseFloat(e.target.value))
                          }
                          className="font-semibold text-green-700 w-10 border-none"
                        />
                      </div>
                      <Input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={transferPeriod}
                        onChange={(e) =>
                          setTransferPeriod(parseFloat(e.target.value))
                        }
                        className="w-full text-gray-400"
                      />
                    </div>
                    <div className="items-center mt-5">
                      <div className="flex justify-between mt-5">
                        <h1>Expected Rate of Return from Source Fund (%)</h1>
                        <input
                          type="text"
                          value={expectedReturnSource}
                          onChange={(e) =>
                            setExpectedReturnSource(parseFloat(e.target.value))
                          }
                          className="font-semibold text-green-700 w-10 border-none"
                        />
                      </div>
                      <Input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={expectedReturnSource}
                        onChange={(e) =>
                          setExpectedReturnSource(parseFloat(e.target.value))
                        }
                        className="w-full text-gray-400"
                      />
                    </div>
                    <div className="items-center mt-5">
                      <div className="flex justify-between mt-5">
                        <h1>
                          Expected Rate of Return from Destination Fund (%)
                        </h1>
                        <input
                          type="text"
                          value={expectedReturnDestination}
                          onChange={(e) =>
                            setExpectedReturnDestination(
                              parseFloat(e.target.value)
                            )
                          }
                          className="font-semibold text-green-700 w-10 border-none"
                        />
                      </div>
                      <Input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={expectedReturnDestination}
                        onChange={(e) =>
                          setExpectedReturnDestination(
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full text-gray-400"
                      />
                    </div>
                  </div>

                  {result && (
                    <div className="mt-5">
                      <div className="flex justify-between px-5 mb-3">
                        <p>Invested Amount</p>
                        <p className="font-bold text-lg">
                          ₹{result?.investedAmount?.toLocaleString()}
                        </p>
                      </div>
                      <hr className="mb-3" />
                      <div className="flex justify-between px-5 mb-3">
                        <p>Balance Amount in Source Fund</p>
                        <p className="font-bold text-lg">
                          ₹{result?.balanceInSourceFund?.toLocaleString()}
                        </p>
                      </div>
                      <hr className="mb-3" />
                      <div className="flex justify-between px-5 mb-3">
                        <p>Amount Transferred to Destination Fund</p>
                        <p className="font-bold text-lg">
                          ₹
                          {result?.amountTransferredToDestinationFund?.toLocaleString()}
                        </p>
                      </div>
                      <hr className="mb-3" />
                      <div className="flex justify-between px-5 mb-3">
                        <p>Resultant Amount</p>
                        <p className="font-bold text-lg">
                          ₹{result?.resultantAmount?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-span-1">
                  <SippieChart
                    piedata={{
                      totalInvestment: result?.investedAmount,
                      futureValue: result?.resultantAmount,
                    }}
                    title={"STP Calculator"}
                    customLabels={{
                      invested: "Household Expenses",
                      return: "Loan Repayment",
                    }}
                  />
                  <CalculatorReturnChart
                    data={chartData}
                    title={"STP Calculator"}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h3 className="font-bold text-red-600 text-4xl mb-3">
                Error 403
              </h3>
              <p className="font-medium text-xl">Your not Authorised</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

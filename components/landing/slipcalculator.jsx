"use client"
import React, { useState } from 'react';
import { Progress } from '../ui/progress';

const SlipCalculator = () => {
    const [monthlyAmount, setMonthlyAmount] = useState(1000);
    const [numberOfYears, setNumberOfYears] = useState(2);
    const [expectedReturn, setExpectedReturn] = useState(9);

    const maxMonthlyAmount = 20000;
    const minMonthlyAmount = 1000;
    const monthlyIncrement = 1000;

    const maxYears = 30;
    const minYears = 2;

    const maxReturn = 15;
    const minReturn = 9;

    const handleProgressClick = (e, type) => {
        const progressBar = e.currentTarget;
        const { offsetWidth, offsetLeft } = progressBar;
        const clickPosition = e.clientX - offsetLeft;

        if (type === "monthly") {
            const newAmount = Math.round((clickPosition / offsetWidth) * (maxMonthlyAmount - minMonthlyAmount)) + minMonthlyAmount;
            const adjustedAmount = Math.round(newAmount / monthlyIncrement) * monthlyIncrement; // Round to nearest 1000
            setMonthlyAmount(Math.min(adjustedAmount, maxMonthlyAmount)); // Ensure it doesn't exceed max
        } else if (type === "years") {
            const newYears = Math.round((clickPosition / offsetWidth) * (maxYears - minYears)) + minYears;
            setNumberOfYears(Math.min(Math.max(newYears, minYears), maxYears)); // Ensure it stays within bounds
        }
        else if (type === "returns") {
            const newReturn = Math.round((clickPosition / offsetWidth) * (maxReturn - minReturn)) + minReturn;
            setExpectedReturn(Math.min(Math.max(newReturn, minReturn), maxReturn)); // Ensure it stays within bounds
        }
    };

    const monthlyProgressValue = ((monthlyAmount - minMonthlyAmount) / (maxMonthlyAmount - minMonthlyAmount)) * 100;
    const yearsProgressValue = ((numberOfYears - minYears) / (maxYears - minYears)) * 100;
    const returnProgressValue = ((expectedReturn - minReturn) / (maxReturn - minReturn)) * 100;

    return (
        <section className="lg:px-40 md:px-20 px-6 my-36">
            <div className='my-5 text-center'>
                <h3 className={`text-red-700 py-1 uppercase text-sm`}>
                    <span className="border-b border-red-700 font-light">SIP Calculator</span>
                </h3>
                <h1 className={`mb-4 text-2xl font-bold tracking-tight leading-none text-black md:text-4xl lg:text-5xl my-2`}>
                    Power of Systematic Investment Plan
                </h1>
            </div>
            <div className='max-w-4xl mx-auto my-20'>
                <div className='grid grid-cols-4 justify-center items-center mb-6 gap-5'>
                    <h1 className='col-span-1 font-semibold text-xl text-end'>Monthly Amount</h1>
                    <div className='col-span-2' onClick={(e) => handleProgressClick(e, "monthly")} style={{ cursor: 'pointer' }}>
                        <Progress value={monthlyProgressValue} />
                    </div>
                    <h1 className='col-span-1 font-semibold text-xl'>{monthlyAmount}</h1>
                </div>
                <div className='grid grid-cols-4 justify-center items-center mb-6 gap-5'>
                    <h1 className='col-span-1 font-semibold text-xl text-end'>No. of Years</h1>
                    <div className='col-span-2' onClick={(e) => handleProgressClick(e, "years")} style={{ cursor: 'pointer' }}>
                        <Progress value={yearsProgressValue} />
                    </div>
                    <h1 className='col-span-1 font-semibold text-xl'>{numberOfYears}</h1>
                </div>
                <div className='grid grid-cols-4 justify-center items-center gap-5'>
                    <h1 className='col-span-1 font-semibold text-xl text-end'>Expected Return</h1>
                    <div className='col-span-2 flex justify-center items-center' onClick={(e) => handleProgressClick(e, "returns")} style={{ cursor: 'pointer' }}>
                        <Progress value={returnProgressValue} />
                    </div>
                    <h1 className='col-span-1 font-semibold text-xl'>{expectedReturn}%</h1>
                </div>
            </div>
        </section>
    );
};

export default SlipCalculator;
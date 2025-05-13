import React from 'react'

export default function SectionHeading({ title, description }) {
    return (
        <div className="max-w-6xl mx-auto text-center mb-10">
            <h6 className="text-xl font-bold uppercase mb-3">{title}</h6>
            <p className="text-gray-500 max-w-2xl mx-auto text-4xl">
                {description}
            </p>
            <div className="flex justify-center items-center mb-5">
                <div className="relative h-[5px] w-[90px] bg-[var(--rv-bg-secondary)] bg-opacity-80 rounded-full mt-5 ">
                    {/* <div className='before:w-10 before:h-10 bg-black'></div> */}
                    <div className="absolute left-0 -top-1 w-3 h-3 rounded-full animate-moveBg bg-[var(--rv-bg-third)]"></div>
                </div>
            </div>
        </div>
    )
}

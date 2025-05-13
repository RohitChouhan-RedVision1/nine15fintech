import React from 'react'

function SectionHeading({ maintitle, title, subtitle }) {
    return (
        <div className="mb-16 text-center">
            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">
                {title}
            </span>
            <h2 className="my-4 font-bold text-3xl sm:text-4xl">
                <span>{firstPart} </span>
                <span className="text-purple-600">{secondPart}</span>
            </h2>
        </div>
    )
}

export default SectionHeading;
